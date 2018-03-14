/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import * as seed from './config/seed';
import * as productionSeed from './config/productionseed';
import socketioModule from 'socket.io';
import socketioConfig from './config/socketio';
import expressConfig from './config/express';
import routes from './routes';
import schedule from './schedule';

// Setup server
var app = express();
var fs = require('fs');
var morgan = require('morgan');
var MobileDetect = require('mobile-detect');

morgan.token('isMobile', function (req, res) {
  var md = new MobileDetect(req.headers['user-agent']);
  if ( md.mobile() ) {
    return "REQUEST FROM " + md.mobile();
  } else {
    return "REQUEST FROM desktop device.";
  }
});
// morgan(':isMobile :method :url :status :res[content-length] - :response-time ms');
// morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' ')
// });

var finalhandler = require('finalhandler');
var logger = morgan('combined');

var path = require('path');

// // Set up custom format logs
// morgan(function (tokens, req, res) {
//   // Parse api, check if its a user submission, parse user data too (sender username and type of request)
//   // Add a flag
//   // When a person sends a request, there should be a check to ensure it came from the browser
//   // Need to possibly create header flags for detecting
//   // console.log("DISPLAYING USER AGENT INFO\n");
//   // console.log(req.get('User-Agent'));
//
//   var md = new MobileDetect(req.headers['user-agent']);
//   if ( md.mobile() ) {
//     console.log("REQUEST FROM " + md.mobile());
//   } else {
//     console.log("REQUEST FROM desktop device.");
//   }
//
//   // return [
//   //
//   //   tokens.method(req, res),
//   //   tokens.url(req, res),
//   //   tokens.status(req, res),
//   //   tokens.res(req, res, 'content-length'), '-',
//   //   tokens['response-time'](req, res), 'ms',
//   //
//   //   JSON.stringify(ua, null, '  ')
//   // ].join(' ')
//   return md.mobile();
// });

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
app.use(morgan(':isMobile :method :url :status :res[content-length] - :response-time ms', {stream: accessLogStream}));

var server = http.createServer(app);
var socketio = socketioModule(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
socketioConfig(socketio);
expressConfig(app);
routes(app);
schedule.start(config);


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options, () => {
  console.log("Mongoose connected");
  beginSeeding();
});
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
function beginSeeding() {
  if (config.seedDB) {
    seed.seed().then(() => {
      console.log("Seed was successful");
      setImmediate(startServer);
    })
    .catch((err) => {
      console.log("Seed failure!", err);
    });
  }else if (config.env === "production") {
    productionSeed.seed().then(()=>{
      console.log("Production seed successful");
      setImmediate(startServer);
    })
    .catch((err)=>{
      console.log("Seed failure!", err);
    })
  }else{
    setImmediate(startServer);
  }
}

function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    app.emit('listening');
    app.isListening = true;
  });
}

// Expose app
exports = module.exports = app;

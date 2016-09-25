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
    }).catch((err) => {
      console.log("Seed failure!", err);
    });
  }else if (config.env === "production") {
    productionSeed.seed().then(()=>{
      console.log("Production seed successful");
      setImmediate(startServer);
    }).catch((err)=>{
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

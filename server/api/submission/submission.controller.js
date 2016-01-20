/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/submissions              ->  index
 * POST    /api/submissions              ->  create
 * GET     /api/submissions/:id          ->  show
 * PUT     /api/submissions/:id          ->  update
 * DELETE  /api/submissions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Submission = require('./submission.model');
var Event = require('../sectionevent/sectionevent.model');
var multiparty = require('multiparty');
var User = require('../user/user.model');
var fs = require('fs');
var mkdirp = require('mkdirp');
var config = require('../../config/environment');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var path = require('path');
import async from 'async';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

function saveSubmissionImage(files, fields, cb){
  var imagePaths = [],
      asyncTasks = [];
  if (!files){return imagePaths;}
  files.files.forEach(function(file) {
    var name = file.name;
    var path = config.imageUploadPath + 'eventImages/' + fields.userId + '/' + fields.eventId;
    var destPath = path + '/' + name;
    imagePaths.push("/api/submissions/image?imgPath=" + destPath);
    asyncTasks.push( (callback) => {fs.exists(path, (exists) => {
      mkdirp(path, function (err) {
        if (err) console.error(err)
        var is = fs.createReadStream(file.path);
        var os = fs.createWriteStream(destPath);
        is.pipe(os);
        callback();
      });
    })});
  });
  async.parallel(asyncTasks, (error, results) => {
    // TODO: Handle Error
    cb(imagePaths);
  });
}

// Gets a list of Submissions
exports.index = function(req, res) {
  if (req.query.onlyStudent){
    var search = { $or: [
      { submitter: mongoose.Types.ObjectId(req.query.onlyStudent)} ,
      { authors: {$in: [mongoose.Types.ObjectId(req.query.onlyStudent)]} }
    ]};
    if(req.query.onlySectionEvent){
      search.onlySectionEvent = mongoose.Types.ObjectId(req.query.onlySectionEvent);
    }
    var dbquery = Submission.find(search)
      .populate('submitter')
      .populate('authors')
      .populate('sectionEvent');

    dbquery.execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }else{
    Submission.findAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

exports.image = function(req, res){
  var imgPath = path.join(__dirname, "../../../", req.query.imgPath);
  res.sendFile(imgPath);
};

// Gets a single Submission from the DB
exports.show = function(req, res) {
  Submission.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Submission in the DB
exports.create = function(req, res) {
  // TODO: add back after auth
  // if (req.user._id)
  //   {
  //     req.body.userId = req.user._id;
  //   }
  saveSubmissionImage(req.files, req.body, (imagePaths)=>{
    var submit = {
      images : imagePaths,
      submitter : req.body.userId,
      authors : req.body.authors,
      sectionEvent : req.body.eventId,
      location : {
        geo: {
          coordinates : req.body.coordinates
        }
      },
      time: Date.now(),
      content: req.body.content
    };

    Submission.create(submit, (err, submission) => {
      if (err) return handleError(res);
      return res.json(submission);
    })
  });
};

// Updates an existing Submission in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Submission.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Submission from the DB
exports.destroy = function(req, res) {
  Submission.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

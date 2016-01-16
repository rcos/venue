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

function saveSubmissionImage(files, fields){
  var imagePaths = [];
  if (!files){return imagePaths;}
  Object.keys(files).forEach(function(name) {
    var file = files[name][0];
    var name = file.path.substring(file.path.lastIndexOf('/')).substring(1);
    var path = config.imageUploadPath  + fields.userId + '/' + fields.eventId;
    imagePaths.push(path);
    var destPath = path + '/' + name;
    if(!fs.existsSync(path)){
      mkdirp.sync(path);
    }
    var is = fs.createReadStream(file.path);
    var os = fs.createWriteStream(destPath);
    is.pipe(os);
    is.on('end', function() {
        fs.unlinkSync(file.path);
    });
  });
  return imagePaths;
}

// Gets a list of Submissions
exports.index = function(req, res) {
  Submission.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
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
  var form = new multiparty.Form();
  form.on('error', function(err) {
    handleError(res)(err);
  });

  return form.parse(req, (err, fields, files) => {
    var imagePaths = saveSubmissionImage(files, fields);
    if (!fields || fields === undefined){
      return handleError(res)("No form data found");
    }
    var submit = {
      images : imagePaths,
      author : [fields.userId[0]],
      events : [fields.eventId[0]],
      location : {
        geo: {
          coordinates : [Number(fields['coordinates[0]'][0]), Number(fields['coordinates[1]'][0])]
        }
      },
      time: Date.now(),
      content: fields.content[0]
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

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
var multiparty = require('multiparty');
var User = require('../user/user.model');
var fs = require('fs');
var mkdirp = require('mkdirp');
var config = require('../../config/environment');

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
  Submission.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));

    console.log(req.body);
      var form = new multiparty.Form();
      form.parse(req, function(err, fields, files) {
        Object.keys(fields).forEach(function(name) {
          console.log('got field named ' + name);
        });

        Object.keys(files).forEach(function(name) {
          console.log('got file named ' + name);
          var file = files[name][0]
          console.log(file);
          var name = file.path.substring(file.path.lastIndexOf('/')).substring(1);
          var path = config.imageUploadPath  + fields.userId + '/' + fields.eventId;
          var destPath = path + '/' + name;
          if(!fs.existsSync(path)){
            mkdirp.sync(path);
          }
          // Copy file from temp to uploads folder with streams.
          // Allows upload across partitions unlike fs.renameSync
          var is = fs.createReadStream(file.path);
          var os = fs.createWriteStream(destPath);
          is.pipe(os);
          is.on('end', function() {
              fs.unlinkSync(file.path);
          });

          User.findById(req.body._id)
          .then((user) => {
              if(!user) { return res.send(404); }
              user.photos.push(name);
              user.save(function (err) {
                if(err){
                  res.status(500).send(err);
                }
                else{
                  res.json(201, name);
                }
              });
          })
          .catch(handleError(res));
        });

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

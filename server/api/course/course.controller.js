/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/courses              ->  index
 * POST    /api/courses              ->  create
 * GET     /api/courses/:id          ->  show
 * PUT     /api/courses/:id          ->  update
 * DELETE  /api/courses/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Course = require('./course.model');
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
      res.status(404).json({});
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

function saveEventInfoImage(files, fields, cb){
  var imagePaths = [],
      asyncTasks = [];
  if (!files){return imagePaths;}
  files.files.forEach(function(file) {
    var name = file.name;
    var path = config.imageUploadPath  + 'courses';
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

// Gets a list of Courses
exports.index = function(req, res) {
  Course.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Course from the DB
exports.show = function(req, res) {
  var dbquery = Course.findById(req.params.id);
  dbquery.execAsync()
    .then(handleEntityNotFound(res))
    .then((course) => {
      // Return the query with the sections if requested
      if (!course){
        return null;
      }
      if (req.query.withSections){
        course.getSections({
          withInstructors: req.query.withSectionInstructors,
          withEnrollmentStatus: req.query.withSectionEnrollmentStatus,
          studentId: req.query.studentid
        }, (sections) => {
          course = course.toObject();
          course.sections = sections;
          responseWithResult(res)(course);
        })
      }else{
        responseWithResult(res)(course);
      }
    })
    .catch(handleError(res));
};

// Creates a new Course in the DB
exports.create = function(req, res) {
  saveEventInfoImage(req.files, req.body, (imagePaths)=>{
    var course = req.body,
      date = new Date();
    course.imageURLs = imagePaths;
    course.active = true;
    if(date.getMonth() < 5){
      course.semester = "Spring" + (date.getYear() - 100).toString();
    }
    else{
      course.semester = "Fall" + (date.getYear() - 100).toString();
    }
    Course.createAsync(course)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
  });
};

// Updates an existing Course in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Course.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Course from the DB
exports.destroy = function(req, res) {
  Course.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

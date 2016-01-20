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
var SectionEvent = require('../sectionevent/sectionevent.model');
var Section = require('../section/section.model');
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

function saveSubmissionImage(files, fields){
  var imagePaths = [];
  if (!files){return imagePaths;}
  files.files.forEach(function(file) {
    var name = Date.now().toString()+ '_' + file.path.substring(file.path.lastIndexOf('/')).substring(1);
    var path = config.imageUploadPath  + fields.userId + '/' + fields.eventId;
    var destPath = path + '/' + name;
    imagePaths.push("/api/submissions/image?imgPath=" + destPath);
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

function withDefault(queryString, defaultValue){
  console.log(queryString, queryString == "true");
  if (queryString === undefined) return defaultValue;
  else return queryString=="true";
}

// Gets a list of Submissions
exports.index = function(req, res) {
  var withStudents = withDefault(req.query.withStudents, true);
  var withSectionEvent = withDefault(req.query.withSectionEvent, true);
  var withEventInfo = withDefault(req.query.withEventInfo, withSectionEvent);

  function respond(query){
    if (withStudents){
      query.populate("authors");
      query.populate("submitter");
    }
    if (withSectionEvent){
      if (withEventInfo){
        query.populate({
          path: 'sectionEvent',
          model: 'SectionEvent',
          populate: {
            path: 'info',
            model: 'EventInfo'
          }
        });
      }else query.populate("sectionEvent");
    }

    query.execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  if (req.query.onlyInstructor){
    var instructorId = req.query.onlyInstructor == "me" ? req.user._id : req.query.onlyInstructor;
    Section.findAsync({instructors: instructorId})
      .then((instructorSections) => {
        var instructorSectionIds = instructorSections.map((sec) => sec._id);
        return SectionEvent.findAsync({section: {$in: instructorSectionIds}});
      })
      .then((sectionEvents) => {
        var sectionEventIds = sectionEvents.map((evnt) => evnt._id);
        respond(Submission.find({sectionEvent: {$in: sectionEventIds}}))
      });

  }else if (req.query.onlySection){
    SectionEvent.findAsync({section: req.query.onlySection})
      .then((sectionEvents) => {
        var sectionEventIds = sectionEvents.map((evnt) => evnt._id);
        respond(Submission.find({sectionEvent: {$in: sectionEventIds}}));
      });

  }else if (req.query.onlyStudent){
    var studentId = req.query.onlyStudent == 'me' ? req.user._id : req.query.onlyStudent;
    var search = { $or: [{ submitter: studentId}, { authors: {$in: [studentId]} } ]};
    if (req.query.onlySectionEvent) search.sectionEvent = req.query.onlySectionEvent;
    respond(Submission.find(search));

  }else if (req.query.onlySectionEvent){
    respond(Submission.find({sectionEvent: req.query.onlySectionEvent}));

  }else{
    respond(Submission.find());
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
  var imagePaths = saveSubmissionImage(req.files, req.body);
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

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sections              ->  index
 * POST    /api/sections              ->  create
 * GET     /api/sections/:id          ->  show
 * PUT     /api/sections/:id          ->  update
 * DELETE  /api/sections/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var async = require("async");
var Auth = require('../../auth/auth.service');
import Section from './section.model';
import User from '../user/user.model';

// Takes a Bool flag and Function func, returns a Promise to execute func on
// mongooseObject and responseObject inputs
// call the "done" of func when finished manipulating data.
// @param Function func: func(mongooseObject, responseObject, done)
// Note: The function "func" must return [mongooseObject, responseObject]
function ifFlagManipulate(flag, func){
  return (mongooseObject, responseObject) => {
    if (flag){
      return new Promise((resolve, reject) => {
        func(mongooseObject, responseObject, (newMongooseObject, newResponseObject)=>{
          if (!newResponseObject){
            var err = newMongooseObject;
            reject(err);
          }else{
            resolve([newMongooseObject, newResponseObject]);
          }
        });
      });
    }else{
      return Promise.all([mongooseObject, responseObject]);
    }
  };
}


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


function checkSectionReq(req) {
  // Check sections numbers
  var sectionNumbers = req.body.sectionNumbers.map(Number);
  if(sectionNumbers){
    sectionNumbers.sort();
    for (var i = 0; i < sectionNumbers.length - 1; i++) {
      if(sectionNumbers[i] < 0){
        throw "Section number must be greater than zero";
      }
      if (sectionNumbers[i + 1] == sectionNumbers[i]) {
        throw "Section number must be greater than zero";
      }
    }
  }
}

// Gets a list of Sections
// Filter by current user ?onlyUser=me
// Filter by user (id) ?onlyUser=:id
// Filter by current user ?onlyCurrentUser=true

exports.index = function(req, res, next)  {
    var query = Section.find();
    query = exports.getSectionsExtra(query,req.query);

    query
        .execAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a list of Sections for a user
exports.userSections = function(req, res, next) {
  var userId = req.params.id;
  User.findById(userId)
  .execAsync()
  .then((user) => {
    if (!user) {
      return res.status(404).end();
    }
    var profile = user.toJSON();
    return Promise.all([user, profile]);
  })
  .then(([user,profile])=>{
    return user.getSectionsAsync(req.query).then((sections) => {
      profile.sections = sections;
      return Promise.all([user, profile]);
    });
  })
  .then(([user,profile]) => {
    return res.json(profile.sections);
  })
  .catch(err => next(err));
};


// Gets a list of Sections for the user
exports.mySections = function(req, res, next) {
  var userId = req.user._id;
  req.params.id = userId;
  exports.userSections(req, res, next);
};

// Gets a single Section from the DB
exports.show = function(req, res, next) {
  var query = Section.findById(req.params.id);
  var withEnrollmentStatus = req.query.withEnrollmentStatus;

  query = exports.getSectionsExtra(query,req.query);

  query
    .execAsync()
    .then((section) => {
      if (!section) {
        return res.status(404).end();
      }
      var data = section.toJSON();
      return Promise.all([section, data]);
    })
    .spread(ifFlagManipulate(req.query.withSectionsEvent || req.query.withSectionEvent, (section,data,done)=>{
      return section.getEventsAsync(req.query).then((events)=>{
        data.events = events;
        done(section, data);
      });
    }))
    .spread((section,data) => {
        // If requested, mark all sections student is enrolled in
      if (withEnrollmentStatus){
        var studentId = req.query.studentId;

        data.isEnrolled = section.students.some((sectionStudent) => {
            return String(sectionStudent) === studentId || String(sectionStudent._id) === studentId ;
        });
        data.isPending = section.pendingStudents.some((sectionStudent) => {
            return String(sectionStudent) === studentId || String(sectionStudent._id) === studentId ;
        });

      }
      return res.json(data);
    })
    .catch(err => next(err));
};

// Creates a new Section in the DB
exports.create = function(req, res) {
  try{checkSectionReq(req);}
  catch(err) { return handleError(res)(err);}
  Section.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Section in the DB

function saveSectionUpdates(req) {

  return (section) => {
    if(req.body.pendingStudent){
      var pendingStudent = req.body.pendingStudent;
      if(section.pendingStudents.remove(pendingStudent)){
        section.students.push(pendingStudent);
      }
      else{
        throw "Not a valid pending student";
      }
    }
    if(req.body.removePendingStudent){
      var pendingStudent = req.body.removePendingStudent;
      if(!section.pendingStudents.remove(pendingStudent)){
        throw "Not a valid pending student";
      }
    }
    if(req.body.removeStudent){

      var student = req.body.removeStudent;
      if(!section.students.remove(student)){
        throw "Not a valid student";
      }
    }
    if (req.body.sectionNumbers){
      checkSectionReq(req);
      section.sectionNumbers = req.body.sectionNumbers.map(Number);
    }
    if(req.body.enrollmentPolicy)
    {
      section.enrollmentPolicy = req.body.enrollmentPolicy;
    }
    if(req.body.instructors)
    {
      section.instructors = req.body.instructors;
    }
    return section.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  }
}


exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Section.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveSectionUpdates(req))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Section from the DB
exports.destroy = function(req, res) {
  Section.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.getSectionsExtra = function (query, opts){
  opts = opts || {};

  //FIXME too many endpoints see #113
  if (opts.withSectionsCourse || opts.withSectionCourse){
    query = query.populate('course');
  }
  if (opts.withSectionsInstructors || opts.withSectionInstructors){
    query = query.populate('instructors');
  }
  if (opts.withSectionsStudents || opts.withSectionStudents){
    query = query.populate('students');
  }
  if (opts.withSectionsPendingStudents || opts.withSectionPendingStudents){
    query = query.populate('pendingStudents');
  }
  return query;
}

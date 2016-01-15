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
import Section from './section.model';
import User from '../user/user.model';

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

function updateSection(req){
  if(req.body.pendingStudent){
    return updatePendingStudents(req);
  }
  else{
    return saveSectionUpdates(req);
  }
}

function updatePendingStudents(req){
  return (section) =>{
    var pendingStudent = req.body.pendingStudent;
    if(section.pendingStudents.remove(pendingStudent)){
      section.students.push(pendingStudent);
      return section.saveAsync()
        .spread((sect)=>{
          return Section.populate(sect, {path:"pendingStudents"})
        });
    }
  }
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
        throw "Duplicate section numbers found";
      }
    }
  }
}

function saveSectionUpdates(req) {
  return (section) => {
    checkSectionReq(req);
    section.sectionNumbers = req.body.sectionNumbers.map(Number);
    section.enrollmentPolicy = req.body.enrollmentPolicy;
    section.instructors = req.body.instructors;
    return section.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  }
}


// Gets a list of Sections
exports.index = function(req, res) {
  Section.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Section from the DB
exports.show = function(req, res) {
  var query = Section.findByIdAsync(req.params.id);

  if (req.query.withEvents){
    query = query.populate("events");
  }
  if (req.query.withCourses){
    query = query.populate("courses");
  }
  if (req.query.withStudents){
    query = query.populate("students");
  }
  if (req.query.withInstructors){
    query = query.populate("instructors");
  }

  query
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
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
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Section.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(updateSection(req))
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
  if (opts.withSectionsInstructors){
    query = query.populate('instructors');
  }
  if (opts.withSectionsStudents){
    query = query.populate('students');
  }
  if (opts.withSectionsPendingStudents){
    query = query.populate('pendingStudents');
  }
  return query;
}

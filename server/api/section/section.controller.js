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
      .then(function(updated) {
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
      if (sectionNumbers[i + 1] === sectionNumbers[i]) {
        throw "Section number must be greater than zero";
      }
    }
  }
  else{
    throw "You need at least one section number"
  }

}

// Gets a list of Sections
// Filter by current user ?onlyUser=me
// Filter by user (id) ?onlyUser=:id
// Filter by current user ?onlyCurrentUser=true

export async function index(req, res, next) {
    var query = Section.find();
    query = getSectionsExtra(query, req.query);
    try{
      let result = await query.execAsync();
      await responseWithResult(res)(result);
    }catch(err){
      await handleError(res)(err);
    }
}

// Gets a list of Sections for a user
export async function userSections(req, res, next) {
  try{
    let userId = req.params.id;
    let user = await User.findById(userId).execAsync();
    if (!user) return res.status(404).end();

    let profile = user.toJSON();

    profile.sections = await user.getSectionsAsync(req.query);

    return res.json(profile.sections);

  }catch(err){
    handleError(res)(err);
  }
}


// Gets a list of Sections for the user
export function mySections(req, res, next) {
  var userId = req.user._id;
  req.params.id = userId;
  userSections(req, res, next);
}

// Gets a single Section from the DB
export async function show(req, res, next) {
  try{
    var query = Section.findById(req.params.id);
    var withEnrollmentStatus = req.query.withEnrollmentStatus;

    query = getSectionsExtra(query, req.query);

    let section = await query.execAsync();
    if (!section) {
      return res.status(404).end();
    }
    let data = section.toJSON();

    if (req.query.withSectionsEvent || req.query.withSectionEvent){
      data.events = await section.getEventsAsync(req.query);
    }

    if (withEnrollmentStatus){
      let studentId = req.query.studentId;
      data.isEnrolled = section.students.some((sectionStudent) => {
          return String(sectionStudent) === studentId || String(sectionStudent._id) === studentId ;
      });
      data.isPending = section.pending.students.some((sectionStudent) => {
          return String(sectionStudent) === studentId || String(sectionStudent._id) === studentId ;
      });
    }

    return res.json(data);
  }catch(err){
    handleError(res)(err);
  }
}

// Creates a new Section in the DB
export function create(req, res) {
  try{checkSectionReq(req);}
  catch(err) { return handleError(res)(err);}
  Section.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Section in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  // Section retrived by canEditSection
  var section = req.section;
  var users, u;

  // Update full instructors list
  if(req.body.instructors)
  {
    section.instructors = req.body.instructors;
  }

  // Update full assistants list
  if(req.body.assistants)
  {
    section.assistants = req.body.assistants;
  }


  for (var type in ['students','instructors','assistants']){
    // Confirm pending
    if(req.body.confirm && req.body.confirm[type]){
      users = req.body.confirm[type];
      for (u in users){
        if(section.pending[type].remove(u)){
          section[type].push(u);
        }
        else{
          throw "Not a valid pending "+type+" to confirm";
        }
      }
    }
    // Remove pending
    if(req.body.reject && req.body.reject[type]){
      users = req.body.reject[type];
      for (u in users){
        if(!section.pending[type].remove(u)){
          throw "Not a valid pending "+type+" to reject";
        }
      }
    }

    // Remove current
    if(req.body.remove && req.body.remove[type]){
      users = req.body.remove[type];
      for (u in users){
        if(!section[type].remove(u)){
          throw "Not a valid pending "+type+" to remove";
        }
      }
    }
  }

  // Update section numbers
  if (req.body.sectionNumbers){
    checkSectionReq(req);
    section.sectionNumbers = req.body.sectionNumbers.map(Number);
  }

  // Update enrollement policy
  if(req.body.enrollmentPolicy)
  {
    section.enrollmentPolicy = req.body.enrollmentPolicy;
  }

  return section.saveAsync()
  .then(responseWithResult(res))
  .catch(handleError(res));
}


// Deletes a Section from the DB
export function destroy(req, res) {
  Section.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function getSectionsExtra(query, opts){
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
  if (opts.withSectionsPending){
    query = query.populate('pending.students');
    query = query.populate('pending.instructors');
    query = query.populate('pending.assistants');
  }
  return query;
}

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sectionevents              ->  index
 * POST    /api/sectionevents              ->  create
 * GET     /api/sectionevents/:id          ->  show
 * PUT     /api/sectionevents/:id          ->  update
 * DELETE  /api/sectionevents/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var SectionEvent = require('./sectionevent.model');
var Submission = require('../submission/submission.model');
var Section = require('../section/section.model');
var User = require('../user/user.model');
var Course = require('../course/course.model');
import SectionCtrl from '../section/section.controller';

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

// Find and delete all submissions with sectionEvent
function fullRemove(res){
  return (entity)=>{
    return entity.fullRemove()
      .then(()=> {
        res.status(204).end();
      });
    }
}

function withDefault(queryString, defaultValue){
  if (queryString === undefined) return defaultValue;
  else return queryString.toLowerCase()==="true";
}

// Gets a list of SectionEvents
exports.index = function(req, res) {
  var onlyNumber = withDefault(req.query.onlyNumber, false);
  var withEventInfo = withDefault(req.query.withEventInfo, !onlyNumber && true);
  var withAuthor = withDefault(req.query.withAuthor, !onlyNumber && true);
  var withSection = withDefault(req.query.withSection, false);
  var withCourse= withDefault(req.query.withCourse, withSection);

  function respond(query){
    if (withAuthor){
      query.populate("author");
    }
    if (withEventInfo){
      query.populate("info");
    }
    if (withSection){
      if (withCourse){
        query.populate({
          path: 'section',
          model: 'Section',
          populate: {
            path: 'course',
            model: 'Course'
          }
        });
      }else query.populate("section");
    }

    query.sort({time: -1});

    query.execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  if (req.query.onlyAuthor || req.query.onlySection || req.query.onlyEvent){
    var search = {};
    if (req.query.onlyAuthor) {
      var authorId = req.query.onlyAuthor.toLowerCase() === "me" ? req.user._id : req.query.onlyAuthor;
      search.author = authorId;
    }
    if (req.query.onlySection) search.section = req.query.onlySection;
    if (req.query.onlyEvent) search.info = req.query.onlyEvent;
    if (onlyNumber){
        SectionEvent.count(search)
        .execAsync()
        .then((entity)=>{
          return {"number": entity};
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
    }
    else{
      respond(SectionEvent.find(search));
    }
  }else if (req.query.onlyUserSections){
    var user = req.query.onlyUserSections.toLowerCase()=== "me" ? req.user._id : req.query.onlyUserSections;
    Section.findAsync({ $or: [{ instructors: user}, { students: user} ]})
      .then((sections) => {
        var sectionIds = sections.map((sec) => sec._id);
        if (onlyNumber){
            SectionEvent.count({section: {$in: sectionIds}})
            .execAsync()
            .then((entity)=>{
              return {"number": entity};
            })
            .then(responseWithResult(res))
            .catch(handleError(res));
        }
        else{
          respond(SectionEvent.find({section: {$in: sectionIds}}))
        }
      });
  }else if (onlyNumber){
    SectionEvent.count()
    .execAsync()
    .then((entity)=>{
      return {"number": entity};
    })
    .then(responseWithResult(res))
    .catch(handleError(res));

  }else{
    respond(SectionEvent.find());
  }
};
// Gets a single SectionEvent from the DB
exports.show = function(req, res) {
  var query = SectionEvent.findById(req.params.id)

  if (req.query.withEventInfo){
    query = query.populate('info');
  }
  if (req.query.withSection){
    query = query.populate('section');
  }
  if (req.query.withAuthor){
    query = query.populate('author');
  }

  query.execAsync()
    .then(handleEntityNotFound(res))
    .then((entity) =>{
      if (req.query.withSectionCourse){
        return Course.populate(entity, {
            path: 'section.course'
        });
      }
      else{
        return entity;
      }
    })
    .then((entity) =>{
      if (req.query.withEventInfoAuthor){
        return User.populate(entity, {
            path: 'info.author'
        });
      }
      else{
        return entity;
      }
    })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new SectionEvent in the DB
exports.create = function(req, res) {
  SectionEvent.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing SectionEvent in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  SectionEvent.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a SectionEvent from the DB
exports.destroy = function(req, res) {
  SectionEvent.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(fullRemove(res))
    .catch(handleError(res));
};

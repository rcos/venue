/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/submissions              ->  index
 * POST    /api/submissions              ->  create
 * GET     /api/submissions/:id          ->  show
 * PUT     /api/submissions/:id          ->  update
 * DELETE  /api/submissions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Submission from './submission.model';
import SectionEvent from '../sectionevent/sectionevent.model';
import EventInfo from '../eventinfo/eventinfo.model';
import Section from '../section/section.model';
import multiparty from 'multiparty';
import User from '../user/user.model';
import fs from 'fs';
import mkdirp from 'mkdirp';
import mongoose from 'mongoose';
import path from 'path';
import config from '../../config/environment';
import { saveImage } from '../../components/imageUpload';
import imageDownload from '../../components/imageDownload';

import async from 'async';
import glob from 'glob';

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
    return updated.saveAsync();
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
  var imagePaths = [];
  if (!files){return cb(imagePaths);}

  Promise.all(files.map(file => {
    return new Promise((resolve, reject) => {
      let path = config.imageUploadPath + 'eventImages/' + fields.userId + '/' + fields.eventId + '/';
      let imagePath = saveImage(file, path, () => {
        resolve("/api/submissions/image/" + fields.userId + "/" + fields.eventId + "/" + imagePath);
      });
    });
  })).then(images => cb(images));
}

function withDefault(queryString, defaultValue){
  if (queryString === undefined) return defaultValue;
  else return queryString.toLowerCase()==="true";
}

// Gets a list of Submissions
exports.index = function(req, res) {
  var onlyNumber = withDefault(req.query.onlyNumber, false);
  var withStudents = withDefault(req.query.withStudents, !onlyNumber && true);
  var withSectionEvent = withDefault(req.query.withSectionEvent, !onlyNumber && true);
  var withEventInfo = withDefault(req.query.withEventInfo, withSectionEvent);
  var withSection = withDefault(req.query.withSection, false);
  var withSectionCourse = withDefault(req.query.withSectionCourse, false);

  var studentRequest = !req.user.isInstructor;
  var search = {};
  if (studentRequest){
    search = { $or: [{ submitter: req.user._id}, { authors: {$in: [req.user._id]} } ]};
  }
  function respond(query){
    query.populate("instructorApproval.instructor");
    if (withStudents){
      query.populate("authors");
      query.populate("submitter");
    }
    if (withSectionEvent){
      query.populate("sectionEvent")
      if (withSection){
        query.populate({
          path: 'sectionEvent',
          model: 'SectionEvent',
          populate: {
            path: 'section',
            model: 'Section'
          }
        });
        if (withSectionCourse){
          query.populate({
            path: 'sectionEvent',
            model: 'SectionEvent',
            populate: {
              path: 'section',
              model: 'Section',
              populate: {
                path: "course",
                model: "Course"
              }
            }
          });
        }
      }
      if (withEventInfo){
        query.populate({
          path: 'sectionEvent',
          model: 'SectionEvent',
          populate: {
            path: 'info',
            model: 'EventInfo'
          }
        });
      }
    }

    query.sort({time: -1});

    query.execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  if (req.query.onlyInstructor){
    var instructorId = req.query.onlyInstructor.toLowerCase() === "me" ? req.user._id : req.query.onlyInstructor;
    Section.findAsync({instructors: instructorId})
      .then((instructorSections) => {
        var instructorSectionIds = instructorSections.map((sec) => sec._id);
        return SectionEvent.findAsync({section: {$in: instructorSectionIds}});
      })
      .then((sectionEvents) => {
        var sectionEventIds = sectionEvents.map((evnt) => evnt._id);
        search.sectionEvent = {$in: sectionEventIds};
        if (onlyNumber){

            Submission.count(search)
            .execAsync()
            .then((entity)=>{
              return {"number": entity};
            })
            .then(responseWithResult(res))
            .catch(handleError(res));
        }
        else{
          respond(Submission.find(search))
        }
      });

  }else if (req.query.onlySection){
    SectionEvent.findAsync({section: req.query.onlySection})
      .then((sectionEvents) => {
        var sectionEventIds = sectionEvents.map((evnt) => evnt._id);
        search.sectionEvent = {$in: sectionEventIds};

        if (onlyNumber){
            Submission.count(search)
            .execAsync()
            .then((entity)=>{
              return {"number": entity};
            })
            .then(responseWithResult(res))
            .catch(handleError(res));
        }
        else{
          respond(Submission.find(search))
        }
      });
  }else if (req.query.onlyStudent){
    var studentId = req.query.onlyStudent == 'me' ? req.user._id : req.query.onlyStudent;
    if (studentRequest){
      studentId = req.user._id;
      //already in search
    }
    else{
      search.$or=[{ submitter: studentId}, { authors: {$in: [studentId]} } ];
    }

    if (req.query.onlySectionEvent) search.sectionEvent = req.query.onlySectionEvent;
    if (onlyNumber){
        Submission.count(search)
        .then((entity)=>{
          return {"number": entity};
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
    }
    else{
      respond(Submission.find(search));
    }
  }else if (req.query.onlySectionEvent){
    search.sectionEvent = req.query.onlySectionEvent;

    if (onlyNumber){
        Submission.count(search)
        .then((entity)=>{
          return {"number": entity};
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
    }
    else{
      respond(Submission.find(search));
    }
  }else if (req.query.onlyNumber){
    Submission.count(search)
    .then((entity)=>{
      return {"number": entity};
    })
    .then(responseWithResult(res))
    .catch(handleError(res));

  }else{
    respond(Submission.find(search));
  }
};

exports.image = function(req, res){
  // Prevents requesting arbitary files from the server
  if ((req.params.name.indexOf('/') !== -1) && (req.params.userId.indexOf('/') !== -1) && (req.params.eventId.indexOf('/') !== -1)){
    return res.json(404);
  }

  // Doesn't have required parameters
  if (!req.params.name || !req.params.userId || !req.params.eventId){
    return res.json(404);
  }

  return imageDownload.getImage(
    req.params.name,
    config.imageUploadPath + 'eventImages/' + req.params.userId + '/' + req.params.eventId + '/',
    req.query.size,
    res);

};

exports.imageSize = function(req, res){
  req.query.size = req.params.size;
  return exports.image(req, res);
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
  if (req.user._id)
    {
      req.body.userId = req.user._id;
    }

  saveSubmissionImage(req.files, req.body, (imagePaths)=>{
    if (!req.body.authors){
      req.body.authors = [req.body.userId]
    }
    if (!req.body.coordinates){
      var submit = {
        images : imagePaths,
        submitter : req.body.userId,
        authors : req.body.authors,
        sectionEvent : req.body.eventId,
        instructorVerification: "none",
        verified: false,
        locationMatch: false,
        time: Date.now(),
        content: req.body.content
      };

      Submission.create(submit, (err, submission) => {
        if (err) return handleError(res);
        return res.json(submission);
      });

    }
    else{
      req.body.coordinates[0] = Number(req.body.coordinates[0]);
      req.body.coordinates[1] = Number(req.body.coordinates[1]);

      SectionEvent.findOne({"_id":req.body.eventId})
      .populate("info")
      .execAsync()
      .then((event)=>{
        if (!event){
          throw "No event assignment found"
        }
          EventInfo.findOne({"_id":event.info._id})
          .where('location.geobounds').intersects().geometry({
            type: "Point",
            coordinates : req.body.coordinates
          })
          .execAsync()
          .then((eventinfo)=>{

            var submit = {
              images : imagePaths,
              submitter : req.body.userId,
              authors : req.body.authors,
              sectionEvent : req.body.eventId,
              location : {
                geo: {
                  type: "Point",
                  coordinates : req.body.coordinates
                }
              },
              instructorVerification: "none",
              verified: eventinfo !== null,
              locationMatch: eventinfo !== null,
              time: Date.now(),
              content: req.body.content
            };

            Submission.create(submit, (err, submission) => {
              if (err) return handleError(res);
              return res.json(submission);
            });
          });
      });
    }
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

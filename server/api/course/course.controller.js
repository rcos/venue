//@flow
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/courses              ->  index
 * POST    /api/courses              ->  create
 * GET     /api/courses/:id          ->  show
 * PUT     /api/courses/:id          ->  update
 * DELETE  /api/courses/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Course from './course.model';
import fs from 'fs';
import mkdirp from 'mkdirp';
import config from '../../config/environment';
import { saveImage } from '../../components/imageUpload';
import imageDownload from '../../components/imageDownload';
import path from 'path';

import async from 'async';

import type {$Response, $Request} from 'express';

type $ExtRequest = $Request & {files:{files: Array<string>}};

function handleError(res: $Response, statusCode: number = 500) {
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res: $Response, statusCode:number = 200) {
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res: $Response) {
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

function saveCourseImage(files: Array<any>, fields, cb){
  var imagePaths = [],
      asyncTasks = [];
  if (!files) {return cb(imagePaths);}

  files.forEach(file => {
    let path = config.imageUploadPath  + 'courses' + '/';
    asyncTasks.push(callback => {
        var imagePath = saveImage(file, path, function(err) {
          return callback(err)
        });
        imagePaths.push("/api/courses/image/" + imagePath);
      });
    });

  async.parallel(asyncTasks, (error, results) => {
    // TODO: Handle Error
    if (error) console.log("ERROR:", error);
    cb(imagePaths);
  });
}

// Gets a list of Courses
export function index(req: $Request, res: $Response) {
  Course.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Course from the DB
export function show(req: $Request, res: $Response) {
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
          course.isCreator = req.query.studentid === course.creatorID;
          responseWithResult(res)(course);
        })
      }else{
        responseWithResult(res)(course);
      }
    })
    .catch(handleError(res));
};

// Creates a new Course in the DB
export function create(req: $ExtRequest, res: $Response) {
  let files:Array<any> = req.files;
  saveCourseImage(files, req.body, (imagePaths: Array<string>)=>{
    var course:any = req.body,
      date = new Date();
    course.imageURLs = imagePaths;
    course.active = true;
    if(date.getMonth() < 5){
      course.semester = "Spring" + (date.getFullYear() - 100).toString();
    }
    else{
      course.semester = "Fall" + (date.getFullYear() - 100).toString();
    }
    Course.createAsync(course)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
  });
};

// Updates an existing Course in the DB
export function update(req: $Request, res: $Response) {
  if (req.body._id) {
    delete req.body._id;
  }
  let files:Array<any> = req.files;
  saveCourseImage(files, req.body, (imagePaths: Array<string>)=>{
    var course:any = req.body;
    course.imageURLs = imagePaths;
    Course.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then((entity)=>{
      var updated = _.merge(entity, course);
      updated.markModified('imageURLs');
      return updated.saveAsync()
      .then(function(updated) {
        return updated;
      });
    })
    .then(responseWithResult(res))
    .catch((err,dat)=>{
      console.log(err, dat);
    })
    .catch(handleError(res));
  });
};

// Deletes a Course from the DB
export function destroy(req: $Request, res: $Response) {
  Course.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

export function image(req: $Request, res: $Response){
  // Prevents requesting arbitary files from the server
  if (req.params.name.indexOf('/') !== -1){
    return res.json(404);
  }

  // Doesn't have required parameters
  if (!req.params.name){
    return res.json(404);
  }
  return imageDownload.getImage(
    req.params.name,
    config.imageUploadPath + 'courses/',
    req.query.size,
    res);
};

export function imageSize(req: $Request, res: $Response){
  req.query.size = req.params.size;
  return exports.image(req, res);
};

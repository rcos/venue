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
  console.log("Create course");
  let files:Array<any> = req.files;
  saveCourseImage(files, req.body, (imagePaths: Array<string>)=>{
      console.log("Image saved");

    var course:any = req.body,
      date = new Date();
    course.imageURLs = imagePaths;
    course.administrators = [req.user.id];
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
    // Course retrived by canEditSection
    var course = req.course;
    if (imagePaths.length){
      course.imageURLs = imagePaths;
      course.markModified('imageURLs');

    }

    // Update full administrators list
    if(req.body.administrators)
    {
      course.administrators = req.body.instructors;
    }

    // Update full assistants list
    if(req.body.assistants)
    {
      course.assistants = req.body.assistants;
    }

    for (var type in ['administrators','assistants']){
      // Confirm pending
      if(req.body.confirm && req.body.confirm[type]){
        users = req.body.confirm[type];
        for (u in users){
          if(course.pending[type].remove(u)){
            course[type].push(u);
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
          if(!course.pending[type].remove(u)){
            throw "Not a valid pending "+type+" to reject";
          }
        }
      }

      // Remove current
      if(req.body.remove && req.body.remove[type]){
        users = req.body.remove[type];
        for (u in users){
          if(!course[type].remove(u)){
            throw "Not a valid pending "+type+" to remove";
          }
        }
      }
    }
    // Update name
    if(req.body.name)
    {
      course.name = req.body.name;
    }

    // Update department code
    if(req.body.department)
    {
      course.department = req.body.department;
    }
    // Update description
    if(req.body.description)
    {
      course.description = req.body.description;
    }
    // Update semester
    if(req.body.semester)
    {
      course.semester = req.body.semester;
    }
    // Update active
    if(req.body.active)
    {
      course.active = req.body.active;
    }


    return course.saveAsync()
    .then(function(updated) {
      return updated;
    });
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

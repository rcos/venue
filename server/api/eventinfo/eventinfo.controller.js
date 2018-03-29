/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/eventinfos              ->  index
 * POST    /api/eventinfos              ->  create
 * GET     /api/eventinfos/:id          ->  show
 * PUT     /api/eventinfos/:id          ->  update
 * DELETE  /api/eventinfos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import EventInfo from './eventinfo.model';
import SectionEvent from '../sectionevent/sectionevent.model';
import fs from 'fs';
import mkdirp from 'mkdirp';
import config from '../../config/environment';
import {saveImage} from '../../components/imageUpload';
import imageDownload from '../../components/imageDownload';
import path from 'path';
import flatten from 'flat';
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

function saveEventInfoImage(files, fields, cb){
  var imagePaths = [],
      asyncTasks = [];
  if (!files){return cb(imagePaths);}

  files.forEach(function(file) {
    var path = config.imageUploadPath  + 'eventInfoImages' + '/';
    asyncTasks.push( (callback) => {
      var imagePath = saveImage(file, path, function(err) {
        return callback(err)
      });
      imagePaths.push("/api/eventinfos/image/" + imagePath);
      });
    });

  async.parallel(asyncTasks, (error, results) => {
    // TODO: Handle Error
    return cb(imagePaths);
  });
}

// Gets a list of EventInfos
export function index(req, res) {

  // Display the device type in the console
  var md = new MobileDetect(req.headers['user-agent']);
  if ( md.mobile() ) {
    console.log("REQUEST FROM " + md.mobile());
  }

  else {
    console.log("REQUEST FROM desktop device.");
  }

  EventInfo.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single EventInfo from the DB
export function show(req, res) {
  var query = EventInfo.findByIdAsync(req.params.id)

  query
    .then(handleEntityNotFound(res))
    .then((eventInfo) =>{
      if (req.query.withSectionEvents){
        eventInfo.getSectionEventsAsync({
          withCourses: req.query.withCourses
        },(sectionEvents)=>{
          eventInfo = eventInfo.toObject();
          eventInfo.sectionEvents = sectionEvents;
          responseWithResult(res)(eventInfo);
        });
      }
      else{
        responseWithResult(res)(eventInfo);
      }
    })
    .catch(handleError(res));
}

function parseGeo(coordinates){
  // We need to parse it like this because there is no guarantee of valid geojson
  // and express sometimes changes the array structure to a dict

  var allShapes = []; // all the polygons, inside which a coordinate is valid
  for (var a = 0; a < coordinates.length; a++){
    var poly = []; // the current polygon, can be made up of multiple lines (there can be a hole)
    var rawPoly = coordinates[a];

    for (var b = 0; b < rawPoly.length; b++){
      var line = []; // one closed line of the polygon
      var rawLine = rawPoly[b];

      for (var c = 0; c < rawLine.length; c++){
        var coordsPair = []; // one closed line of the polygon
        var rawCoordsPair = coordinates[a][b][c]; // a pair of coordinates

        if (!Array.isArray(rawCoordsPair)){ // if express converts it to a dict, change back to a array
          rawCoordsPair = Object.keys(rawCoordsPair).map((key) => {
            return rawCoordsPair[key]
          });
        }
        for (var d = 0; d < rawCoordsPair.length; d++){
          //Convert coordinates to a number
          coordsPair.push(Number(rawCoordsPair[d])); // add coordinates to the coordinates Pair
        }
        line.push(coordsPair); // add the coordinates Pair to the line
      }
      poly.push(line); // add the line to the polygon
    }
    allShapes.push(poly); //add the polygon to the list of all shapes
    return allShapes;
  }

}
// Creates a new EventInfo in the DB
export function create(req, res) {
  saveEventInfoImage(req.files, req.body, (imagePaths)=>{
    var evnt = req.body;
    evnt = flatten.unflatten(evnt); // Fix any multer flattening flaws

    // If there is only 1 time, it doesn't unflatten correctly
    if (!evnt.times && evnt['times[0]']){
      evnt.times = [evnt['times[0]']]
    }
    // Change time strings to Date objects
    for (var a =0; a < evnt.times.length ; a++){
      evnt.times[a].start = new Date(evnt.times[a].start)
      evnt.times[a].end = new Date(evnt.times[a].end)

    }

    // Verify fields are included
    if (!evnt.location.address || !evnt.location.description){
      throw new Error("There must be a location address and desription");
    }

    if (!evnt.location.geobounds || !evnt.location.geobounds.coordinates || !evnt.location.geobounds.coordinates.length){
      throw new Error("There must be at least one geobound polygon");
    }

    if(!evnt.location.geo || !evnt.location.geo.coordinates  || !evnt.location.radius){
      throw new Error("There must be a geo coordinate");
    }

    if(!evnt.title || !evnt.description  || !evnt.times  || !evnt.times.length){
      throw new Error("There must be event information");
    }

    var eventObject = {
      title: evnt.title,
      description: evnt.description,
      imageURLs: imagePaths,
      author: req.user._id,
      creationDate: new Date(),
      location: {
        address: evnt.location.address,
        description: evnt.location.description,
        radius: Number(evnt.location.radius),
        geo: evnt.location.geo,
        geobounds: evnt.location.geobounds,
      },
      times: evnt.times
    };

    eventObject.location.geobounds.coordinates = parseGeo(eventObject.location.geobounds.coordinates); // save the list of all shapes

    for (var e = 0; e < eventObject.location.geo.coordinates.length; e++){
      // Save the bounds as numbers
      eventObject.location.geo.coordinates[e] = Number(eventObject.location.geo.coordinates[e]);
    }

    EventInfo.createAsync(eventObject)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
  });
}


export function image(req, res){
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
    config.imageUploadPath + 'eventInfoImages/',
    req.query.size,
    res);
}

export function imageSize(req, res){
  req.query.size = req.params.size;
  return image(req,res);
}

// Updates an existing EventInfo in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  saveEventInfoImage(req.files, req.body, (imagePaths)=>{
    var eventObject = req.body;
    eventObject = flatten.unflatten(eventObject);

    if (!eventObject.times && eventObject['times[0]']){
      eventObject.times = [eventObject['times[0]']]
      delete eventObject['times[0]'];
    }
    if (eventObject.times){
      for (var a =0; a < eventObject.times ; a++){
        eventObject.times[a].start = new Date(eventObject.times[a].start)
        eventObject.times[a].end = new Date(eventObject.times[a].end)
      }
    }

    if (imagePaths && imagePaths.length){
      eventObject.imageURLs = imagePaths;
    }
    if (eventObject.location && eventObject.location.radius){
      eventObject.location.radius = Number(eventObject.location.radius);
    }

    if (eventObject.location && eventObject.location.geobounds && eventObject.location.geobounds.coordinates){
      eventObject.location.geobounds.coordinates = parseGeo(eventObject.location.geobounds.coordinates); // save the list of all shapes
    }

    if (eventObject.location && eventObject.location.geo && eventObject.location.geo.coordinates){
      for (var e = 0; e < eventObject.location.geo.coordinates.length; e++){
        // Save the bounds as numbers
        eventObject.location.geo.coordinates[e] = Number(eventObject.location.geo.coordinates[e]);
      }
    }


    // Update the event
    EventInfo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then((entity)=>{
        var updated = _.merge(entity, eventObject);
        updated.markModified('times');
        updated.markModified('location.geobounds.coordinates');
        updated.markModified('location.geo.coordinates');
        updated.markModified('imageURLs');
        return updated.saveAsync()
          .then(function(updated) {
            return updated;
          });
    })
    .then(responseWithResult(res))
    .catch(handleError(res));
  });
}

// Deletes a EventInfo from the DB
export function destroy(req, res) {
  EventInfo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

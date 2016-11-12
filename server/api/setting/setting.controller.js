/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settings              ->  index
 * POST    /api/settings              ->  create
 * GET     /api/settings/:id          ->  show
 * PUT     /api/settings/:id          ->  upsert
 * PATCH   /api/settings/:id          ->  patch
 * DELETE  /api/settings/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Setting from './setting.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Settings
export function index(req, res) {
  return Setting.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Setting from the DB
export function getCurrent(req, res) {
  console.log("Testing123")
  return Setting.findOne({active:true}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Setting from the DB
export function show(req, res) {
  return Setting.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Setting in the DB
export function create(req, res) {
  return Setting.update({active:true},
     {$set: {active: false}}).exec((err,setting) =>{
       var newSettings = {
         semester: req.body.semester,
         login: {
           cas: req.body.login.cas,
           local: req.body.login.local
         },
         active: true
}
       return Setting.create(newSettings)
         .then(respondWithResult(res, 201))
         .catch(handleError(res));
     })

}

// Updates an existing Setting in the DB
export function changeLoginTypes(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  var update = false;
  var loginChanges = {}
  for (var field in req.body){
    loginChanges['login.'+field] = req.body[field]
  }
  console.log(loginChanges);
  return Setting.update({active:true},{$set:loginChanges}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Setting from the DB
export function destroy(req, res) {
  return Setting.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

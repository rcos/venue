'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import Section from "../section/section.model";

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

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

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;
  User.findById(userId)
  .select('-salt -password')
  .execAsync()
  .then((user) => {
    if (!user) {
      return res.status(404).end();
    }
    var profile = user.toJSON();
    return Promise.all([user, profile]);
  })
  .spread(ifFlagManipulate(req.query.withSections, (user,profile,done)=>{
    return user.getSectionsAsync(req.query).then((sections) => {
      profile.sections = sections;
      done(user, profile);
    });
  }))
  .spread(ifFlagManipulate(req.query.withEvents, (user,profile,done)=>{
    return user.getEventsAsync(req.query).then((events)=>{
      profile.events = events;
      done(user, profile);
    });
  }))
  .spread(ifFlagManipulate(req.query.withCourses, (user,profile,done)=>{
    return user.getCoursesAsync(req.query).then((courses)=>{
      profile.courses = courses;
      done(user, profile);
    });
  }))
  .spread((user,profile) => {
    return res.json(profile);
  })
  .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findById(req.params.id)
    .then((user)=>{
      user.lastName = "";
      user.firstName = "[deleted user]";
      user.password = "";
      user.saveAsync()
        .spread(function(usr) {
          res.status(200).end();
        })
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Enroll in a section
 */
export function enrollInSection(req, res, next) {
  var userId = req.user._id;
  var sectionId = req.body.sectionid;
  Section.findByIdAsync(sectionId)
    .then( section => {
      section.students.push(userId);
      section.save();
      res.json(section);
    })
    .catch(err => next(err));
}

/**
 * Unenroll in a section
 */
export function unenrollInSection(req, res, next) {
  var userId = req.user._id;
  var sectionId = req.body.sectionid;
  Section.findOneAndUpdateAsync({"_id": sectionId} , {
      $pull : {students: userId}
    }).then( section => {
      res.json(section);
    })
    .catch(err => next(err));
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;
  req.params.id = userId;
  show(req, res, next);
}
/**
 * Get user's sections
 */
export function sections(req, res, next) {
  var userId = req.params.id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      user.getSectionsAsync().then((sections)=>{
        return res.json(sections)
      })
      .catch(err => next(err));

    })
    .catch(err => next(err));
}

/**
 * Get user's events
 */
export function events(req, res, next) {
  var userId = req.params.id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      user.getEventsAsync().then((events)=>{
        return res.json(events)
      })
      .catch(err => next(err));

    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}

'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';
import Section from '../api/section/section.model';
import Course from '../api/course/course.model';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findByIdAsync(req.user._id)
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Checks if user is an instructor
 */
export function isInstructor(){
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (req.user.isInstructor){
                next();
            }else{
                res.status(403).send('Forbidden');
            }
        });
}

/**
* Checks if user can edit the section (everything but confirming instructors and assistants)
People who can edit sections:
Admins
Section Instructors
Section Assistants
Course Admins
Course Assistants
*/
export function canEditSection(){
  return compose()
  .use(isAuthenticated())
  .use(function meetsRequirements(req, res, next) {
    if (req.user.role === 'admin'){
      return next();
    }
    if (req.baseUrl === '/api/sections'){
      return Section.findById(req.params.id)
      .populate("course").execAsync()
      .then(section => {
        if (!section) {
          return res.status(404).end();
        }
        req.section = section;
        var userId = req.user._id.toString();

        if (section.instructors.indexOf(userId) !== -1){
          next();
        }
        else if (section.assistants.indexOf(userId) !== -1){
          next();
        }
        else if (section.course.administrators.indexOf(userId) !== -1){
          next();
        }
        else if (section.course.assistants.indexOf(userId) !== -1){
          next();
        }
        else{
          return res.status(403).send('Forbidden');
        }
      })
      .catch(err => next(err));
    }
    else{
      console.log("req.baseUrl",req.baseUrl);
      res.status(403).send('Forbidden');
    }
  });
}
/**
* Checks if user can administer the section (confirming instructors and assistants)
People who can administer sections:
Admins
Section Instructors
Course Admins

*/
export function canAdminSection(){
  return compose()
  .use(isAuthenticated())
  .use(function meetsRequirements(req, res, next) {
    if (req.user.role === 'admin'){
      return next();
    }
    if (req.baseUrl === '/api/sections'){
      return Section.findById(req.params.id)
      .populate("course").execAsync()
      .then(section => {
        if (!section) {
          return res.status(404).end();
        }
        var userId = req.user._id.toString();
        req.section = section;

        if (section.instructors.indexOf(userId) !== -1){
          next();
        }
        else if (section.course.administrators.indexOf(userId) !== -1){
          next();
        }
        else{
          return res.status(403).send('Forbidden');
        }
      })
      .catch(err => next(err));
    }
    else{
      console.log("req.baseUrl",req.baseUrl);
      res.status(403).send('Forbidden');
    }
  });
}
/**
 * Checks if user can edit the course (everything but confirm administrators and sssistants)
 People who can administer courses:
 Admins
 Course Admins
 */
export function canAdminCourse(){
    return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      console.log("canAdminCourse",req.baseUrl);
        if (req.user.role === 'admin'){
            return next();
        }
        courseId = req.params.id;
        return Course.findByIdAsync(courseId)
          .then(course => {
                  console.log("course",course);

            if (!course) {
              return res.status(404).end();
            }
            var userId = req.user._id.toString();
            req.course = course;
            console.log("userId", userId)
            console.log("course.administrators.indexOf(userId)", course.administrators.indexOf(userId))
            if (course.administrators.indexOf(userId) !== -1){
                next();
            }
            else{
                console.log("forbidden");
                return res.status(403).send('Forbidden');
            }
          })
          .catch(err => next(err));
    });
}

/**
 * Checks if user can admin the course (create sections, change course info)
 People who can administer courses:
 Admins
 Course Admins
 Course Assistants

 Can be accessed from /api/sections or /api/courses
 */
export function canAdminCourse(){
    return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      console.log("canAdminCourse",req.baseUrl);
        if (req.user.role === 'admin'){
            return next();
        }
        var courseId = "";
        if (req.baseUrl === '/api/sections'){
          courseId = req.body.course;
        }
        else if (req.baseUrl === '/api/courses'){
          courseId = req.params.id;
        }
        else{
          console.log("req.baseUrl",req.baseUrl);
          res.status(403).send('Forbidden');
        }
        return Course.findByIdAsync(courseId)
          .then(course => {
                  console.log("course",course);

            if (!course) {
              return res.status(404).end();
            }
            var userId = req.user._id.toString();
            req.course = course;
            console.log("userId", userId)
            console.log("course.administrators.indexOf(userId)", course.administrators.indexOf(userId))
            if (course.administrators.indexOf(userId) !== -1){
                next();
            }
            else if (course.assistants.indexOf(userId) !== -1){
                next();
            }
            else{
                console.log("forbidden");
                return res.status(403).send('Forbidden');
            }
          })
          .catch(err => next(err));
    });
}

/**
 * Checks if user can add a course
  People who can add courses:
  Admins
  Instructors
 */
export function canAddCourse(){
    return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
        if (req.user.isInstructor || req.user.role === 'admin'){
            next();
        }else{
            res.status(403).send('Forbidden');
        }
    });
}

/**
 * Checks if user is a student
 */
export function isStudent(){
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (!req.user.isInstructor){
                next();
            }else{
                res.status(403).send('Forbidden');
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  if(!req.user.isInstructor){
    res.redirect('/student/dashboard');
  }
  else{
    res.redirect('/instructor/dashboard');
  }
}

'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';
import Course from '../api/course/course.model';
import Section from '../api/section/section.model';
import Submission from '../api/submission/submission.model';
import SectionEvent from '../api/sectionevent/sectionevent.model'

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
 * Checks if user is supervisor of course, need course id or section id in req body or req query
 */
export function isSupervisor(){
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
          if (!req.user.isInstructor)
            res.status(403).send('Forbidden');
          if (req.body.course || req.query.course) {
            var course_id = req.body.course ? req.body.course : req.query.course;
            Course.findByIdAsync(course_id)
              .then(course => {
                if (!course) 
                  return res.status(401).end();
                if (!(course.supervisorId.equals(req.user._id) || req.user.role=='admin'))
                  return res.status(403).send('Forbidden');
                next();
              })
          } else { // if no course id is given in req
            Section.findByIdAsync(req.params.id)
              .then(section => {
                Course.findByIdAsync(section.course)
                  .then(course => {
                      return res.status(401).end();
                    if (!(course.supervisorId.equals(req.user._id) || req.user.role=='admin'))
                      return res.status(403).send('Forbidden');
                    next();
                  })
              })
          }
        });
}

function isInstructorInSection(userId, sectionId) {
  return Section.findByIdAsync(sectionId)
    .then(section => {
      var isInstructor = false;
      section.instructors.forEach(function(instructorId) {
        if (instructorId.equals(userId))
          isInstructor = true;
      })
      return isInstructor;
  }).catch(err => next(err));
}

/**
 * Checks if user is an instructor of a course
 */
export function isCourseInstructor(){
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (!req.user.isInstructor)
              res.status(403).send('Forbidden');
            var userId = req.user._id;
            if (req.baseUrl == '/api/submissions') {
              if (req.body._id) {
                Submission.findByIdAsync(req.body._id)
                  .then(submission => {
                    SectionEvent.findByIdAsync(submission.sectionEvent)
                      .then(sectionEvent => {
                        isInstructorInSection(userId, sectionEvent.section)
                          .then(inSection => {
                            if (!inSection) {
                              res.status(403).send('Forbidden');
                            } else {
                              next();
                            }
                          }).catch(err => next(err));
                    }).catch(err => next(err));
                }).catch(err => next(err));
              }
            } else if (req.baseUrl == '/api/sectionevents') {
              SectionEvent.findByIdAsync(req.params.id)
                .then(sectionEvent => {
                  isInstructorInSection(userId, sectionEvent.section)
                    .then(inSection => {
                      if (!inSection) {
                        res.status(403).send('Forbidden');
                      } else {
                        next();
                      }
                    }).catch(err => next(err));
              }).catch(err => next(err));
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
 * Checks if user is a student
 */
export function isStudent(){
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (req.user.isStudent){
                next();
            }else{
                res.status(403).send('Forbidden');
            }
        });
}

function isTAInSection(userId, sectionId) {
  console.log("isTAinSection called");
  return Section.findByIdAsync(sectionId)
    .then(section => {
      var isTA = false;
      section.teachingAssistants.forEach(function(TaId) {
        if (TaId.equals(userId))
          isTA = true;
      })
      return isTA;
  }).catch(err => next(err));
}

export function isSectionTA(){
  return compose()
      .use(isAuthenticated())
      .use(function meetsRequirements(req, res, next) {
          if (!req.user.isTA)
            res.status(403).send('Forbidden');
          var userId = req.user._id;
          if (req.baseUrl == '/api/submissions') {
            if (req.body._id) {
              Submission.findByIdAsync(req.body._id)
                .then(submission => {
                  SectionEvent.findByIdAsync(submission.sectionEvent)
                    .then(sectionEvent => {
                      isTAInSection(userId, sectionEvent.section)
                        .then(inSection => {
                          if (!inSection) {
                            res.status(403).send('Forbidden');
                          } else {
                            next();
                          }
                        }).catch(err => next(err));
                  }).catch(err => next(err));
              }).catch(err => next(err));
            }
          } else if (req.baseUrl == '/api/sectionevents') {
            SectionEvent.findByIdAsync(req.params.id)
              .then(sectionEvent => {
                isTAInSection(userId, sectionEvent.section)
                  .then(inSection => {
                    if (!inSection) {
                      res.status(403).send('Forbidden');
                    } else {
                      next();
                    }
                  }).catch(err => next(err));
            }).catch(err => next(err));
          }
      });
}
/**
 * Checks if a user is a TA
 */
export function isTA(){
  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req,res,next){
      if(req.user.isStudent && req.user.taSections != undefined && req.user.taSections.length > 0){
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

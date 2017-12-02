'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';
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
 * Checks if user is creator of course, need course id in req body or req query
 */
export function isCreator(){
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
          if (req.body.course) {
            Course.findByIdAsync(req.body.course)
              .then(course => {
                if (!course) {
                  return res.status(401).end();
                }
                if (course.creatorID==req.user._id) {
                  next();
                }else{
                  res.status(403).send('Forbidden');
                }
              })
          } else {
            Course.findByIdAsync(req.query.course)
              .then(course => {
                if (!course) {
                  return res.status(401).end();
                }
                if (course.creatorID==req.user._id) {
                  next();
                }else{
                  res.status(403).send('Forbidden');
                }
              })
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

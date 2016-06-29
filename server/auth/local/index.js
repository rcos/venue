'use strict';

import express from 'express';
import passport from 'passport';
import User from "../../api/user/user.model";
import {signToken} from '../auth.service';

var router = express.Router();

router.post('/', function(req, res, next) {
  var studentOnly = req.query.studentOnly;
  var instructorOnly = req.query.instructorOnly;
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var profile = user.profile;
    User.findById(profile._id).then((user) => {
      if (studentOnly === true && profile.isInstructor){
        res.status(401).json({"message": "user is not a student"});
      }else if (instructorOnly === true && !profile.isInstructor){
        res.status(401).json({"message": "user is not an instructor"});
      }
      var token = signToken(user._id, user.role);
      res.json({ token, profile });
    });
  })(req, res, next)
});

export default router;

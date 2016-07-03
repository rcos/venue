'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
var User = require('../../api/user/user.model');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    User.findById(user._id)
    .execAsync()
    .then((userObj) => {
      var profile = userObj.profile;
      var token = signToken(profile._id, profile.role);
      res.json({ token, profile });
    });
  })(req, res, next)
});

export default router;

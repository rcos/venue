'use strict';

import express from 'express';
import passport from 'passport';
import User from "../../api/user/user.model";
import {signToken} from '../auth.service';

var router = express.Router();

router.get('/', requestCASLogin);

function requestCASLogin(req, res, next) {
    var studentOnly = req.body.studentOnly;
    var instructorOnly = req.body.instructorOnly;

    passport.authenticate('cas', function(err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({message: 'Something went wrong, please try again.'});
        }
        var profile = user.profile;

        User.findById(profile._id).then((user) => {
            if (studentOnly === true && user.isInstructor){
                res.status(401).json({"message": "Error: cannot log in, user is not a student"});
                return;
            }else if (instructorOnly === true && !user.isInstructor){
                res.status(401).json({"message": "Error: cannot log in, user is not an instructor"});
                return;
            }
            profile = user.profile;
            var token = signToken(user._id, user.role);
            res.cookie('token',token , { maxAge: 900000 });
            res.redirect("/");
        });
    })(req, res, next)
}

export default router;

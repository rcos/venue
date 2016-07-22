'use strict';
import User from '../api/user/user.model';
import Course from '../api/course/course.model';
import Event from '../api/eventinfo/eventinfo.model';
import SectionEvent from '../api/sectionevent/sectionevent.model';
import Section from '../api/section/section.model';
import Submission from '../api/submission/submission.model';
var _ = require('lodash');

var mongoose = require('mongoose');

module.exports.createAdmin = ()=>{
  return User.findAsync({"role": "admin"}).then((admin) => {
    if (admin.length === 0) throw 'No Admin!';
    return Promise.resolve(null)
  }).catch(() => {
    console.log("Admin does not exist, creating");
    // Admin does not exist, create one
    return User.createAsync({
      provider: 'local',
      firstName: 'admin',
      lastName: 'admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      isVerified: true,
      isInstructor: true,
      _id: mongoose.Types.ObjectId('000000000000000000000000')
    });
  })
};

module.exports.seed = function(){
  return module.exports.createAdmin();
};

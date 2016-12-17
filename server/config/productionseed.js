'use strict';
import User from '../api/user/user.model';
import Course from '../api/course/course.model';
import Event from '../api/eventinfo/eventinfo.model';
import SectionEvent from '../api/sectionevent/sectionevent.model';
import Section from '../api/section/section.model';
import Settings from '../api/setting/setting.model';
import Submission from '../api/submission/submission.model';
import fs from 'fs';
import config from './environment';
var _ = require('lodash');

var mongoose = require('mongoose');

module.exports.createAdmin = ()=>{
  return User.findAsync({"role": "admin"}).then((admin) => {
    if (admin.length === 0) throw 'No Admin!';
    return Promise.resolve(null)
  }).catch(() => {
    console.log("Admin does not exist, creating default");
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

module.exports.createSetting = ()=>{
  return Settings.findAsync({"active": true}).then((setting) => {
    if (setting.length === 0) throw 'No Settings!';
    return Promise.resolve(null)
  }).catch(() => {
    console.log("Setting does not exist, creating");
    // Admin does not exist, create one
    return Settings.createAsync({
       semester: "Current",
       login: {cas:true, local:true, developer:false},
       active: true,
       _id: mongoose.Types.ObjectId('111111111111111111111111')
    });
  })
};

export function prepareDataDirectory(){
  console.log("Preparing data directory " + config.imageUploadPath);
  return new Promise(resolve => {
    fs.stat(config.imageUploadPath, (err, stats) => {
      if (err){
        // We need to create the directory
        try{
          fs.mkdirSync(config.imageUploadPath);
          fs.mkdirSync(config.imageUploadPath + "courses");
          fs.mkdirSync(config.imageUploadPath + "eventImages");
          fs.mkdirSync(config.imageUploadPath + "eventInfoImages");
          resolve();
        }catch(e){
          console.log("Error seeding data directory");
          resolve();
        }
      }else{
        // Possibly an empty directory, attempt to create subdirs
        // fs.mkdirSync(config.imageUploadPath);
        try{
          fs.mkdirSync(config.imageUploadPath + "courses");
          fs.mkdirSync(config.imageUploadPath + "eventImages");
          fs.mkdirSync(config.imageUploadPath + "eventInfoImages");
        }catch(e){
          // Ignore this error, it's probably an existing data dir
        }finally{
          resolve();
        }
      }

    });
  });
}

module.exports.seed = function(){
  return module.exports.createAdmin()
  .then(module.exports.createSetting)
  .then(prepareDataDirectory);
};

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Course from '../api/course/course.model';
import Event from '../api/eventinfo/eventinfo.model';
import SectionEvent from '../api/sectionevent/sectionevent.model';
import Section from '../api/section/section.model';
import Submission from '../api/submission/submission.model';
import Settings from '../api/setting/setting.model';
var _ = require('lodash');

var mongoose = require('mongoose');

export function allUsers(){return {
    admin: {
      provider: 'local',
      role: 'admin',
      firstName: 'admin',
      lastName: 'User',
      email: 'admin@admin.com',
      password: 'admin',
      isVerified: true,
      isInstructor: true,
      _id: mongoose.Types.ObjectId('000000000000000000000001'),
      preferences: {emailNotifyAheadMinutes: [30]},
    },
    test: {
      provider: 'local',
      role: 'test',
      firstName: 'test',
      lastName: 'User',
      email: 'test@test.com',
      password: 'test',
      isVerified: true,
      isInstructor: false,
      _id: mongoose.Types.ObjectId('000000000000000000000002'),
      preferences: {emailNotifyAheadMinutes: [30]},
    },
    teacher: {
      provider: 'local',
      role: 'teacher',
      firstName: 'teacher',
      lastName: 'User',
      email: 'teacher@teacher.com',
      password: 'teacher',
      isVerified: true,
      isInstructor: true,
      _id: mongoose.Types.ObjectId('000000000000000000000003'),
      preferences: {emailNotifyAheadMinutes: [30]},
    },
  };
}

export function allCourses(){return {
    testCourse:{
      _id : mongoose.Types.ObjectId("222222222222222222222220"),
      department : "TEST",
      imageURLs: ["/api/courses/image/test-1470287331303.jpeg"], // url to image
      courseNumber : 1234,
      name : "Venue Testing",
      description : "This course is for testing new venue features.",
      active : true,
      semester : "Spring16",
      pending : {
        administrators : [],
        assistants : []
      },
      administrators : [allUsers().admin._id], //Admin
      assistants : []
    }
}}

export function allSections(){ return {
    testSection: {
      sectionNumbers: [1,2],
      enrollmentPolicy: "open",
      _id:mongoose.Types.ObjectId('111111111111111111111120'),
      course : allCourses().netArt._id, //Net Art
      students : [allUsers().jane._id, allUsers().kelly._id, allUsers().foo._id], //Jane
      pending : {
        students : [],
        instructors : [],
        assistants : []
      },
      instructors : [allUsers().bob._id], //Bob
      assistants : []
    }
  }
}


export function allEvents(){
  return {
    testEvent:{
      title: "Test Event",
      description: "This tests events.",
      imageURLs: ["/api/eventinfos/image/rpi_concerts-1470324497084.jpeg"], // url to image
      author: allUsers().teacher._id, //Teacher
      creationDate: new Date(new Date().getTime() + -7 * 24 * 60 * 60 * 1000 + 4*60*60*1000),
      location: {
        address: "110 8th St, Troy, NY  12180, United States",
        description: "Empac",
        geo: {
          coordinates: [-73.6842041,42.7288898], // [<longitude>, <latitude>]
          type: "Point"
        },
        geobounds : {
          // These coordinates represent a location surrounding RPI
          // and brunswick, they are used in validation testing
          type: "MultiPolygon",
          coordinates:
          [
            [ //poly1
              [ //ring1
                [ -73.6786079406738, 42.7404566603398 ],
                [ -73.699893951416, 42.7268391495544 ],
                [ -73.6693382263184, 42.7038843572483 ],
                [ -73.64290237426761, 42.7217948682557 ],
                [ -73.6786079406738, 42.7404566603398 ]
              ]
            ],
            [ //poly2
              [ //ring1
                [ -73.5735511779785, 42.7414652458955 ],
                [ -73.57458114624021, 42.728604551111 ],
                [ -73.5481452941895, 42.7303699024239 ],
                [ -73.5484886169434, 42.7429780934664 ],
                [ -73.5735511779785, 42.7414652458955 ]
              ]
            ]
          ]
        }
      },
      times: [{
        start: new Date(new Date().getTime() + -6 * 24 * 60 * 60 * 1000 + 1*60*60*1000),
        end: new Date(new Date().getTime() + -6 * 24 * 60 * 60 * 1000 + 4*60*60*1000),
      },{
        start:new Date(new Date().getTime() + -5 * 24 * 60 * 60 * 1000 + 1*60*60*1000),
        end: new Date(new Date().getTime() + -5 * 24 * 60 * 60 * 1000 + 4*60*60*1000),
      }],
      _id: mongoose.Types.ObjectId('000000000000000000000020')
    }
  }
}

export function allSectionEvents(){
  return{
    testSectionEvent: {
      section: allSections().testSection._id,// Test Section
      course: allCourses().testCourse._id,//Test course
      submissionInstructions:"Write about what you learned.",
      author: allUsers().teacher._id, //Travis
      creationDate: new Date(new Date().getTime() + -5 * 24 * 60 * 60 * 1000 + 4*60*60*1000),
      info: allEvents().testEvent._id,//Test Event
      _id: mongoose.Types.ObjectId('000000000000000000001000')
    }

  }
}

export function allSubmissions(){
  return {
    testSubmission:{
      _id : mongoose.Types.ObjectId("666666666666666666666661"),
      content: "This is what I learned from the test.",
      images: ["/api/submissions/image/000000000000000000000004/000000000000000000001000/submission1.jpg"], // path to image on static image server?
      time: Date.now(),
      submitter: allUsers().Test._id,
      authors: [allUsers().Test._id],
      sectionEvent: allSectionEvents().testSectionEvent._id,
      instructorVerification: "none",
      verified: true,
      locationMatch: true,
      location: {
        geo: {
          coordinates: [
               -73.6794438867554,
              42.731655780717645
          ],
          type: "Point"
        }
      }
    }
  }
}


export function allSettings(){
  return {
    testSettings:{
      _id : mongoose.Types.ObjectId("777777777777777777777771"),
      semester: "Current",
      login: {
        cas: true,
        local: true,
        developer: true
      },
      active: true
    }
  }
}

module.exports.clearDB = function(){
  return new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase((err, res) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Create Users
module.exports.createUsers = function(){
  return User.createAsync(_.values(allUsers()));
}


// Create Courses
module.exports.createCourses = function(){
  return Course.createAsync(_.values(allCourses()));
}

// Create Courses
module.exports.createSections = function(){
  return Section.createAsync(_.values(allSections()));
}

// Create Events
module.exports.createEvents = function(){
  return Event.createAsync(_.values(allEvents()));
}
// Create Section Events

module.exports.createSectionEvents = function(){
  return SectionEvent.createAsync(_.values(allSectionEvents()));
}

// Create Submissions
module.exports.createSubmissions = function(){
  return Submission.createAsync(_.values(allSubmissions()));
};

// Create Submissions
module.exports.createSettings = function(){
  return Settings.createAsync(_.values(allSettings()));
};



module.exports.exampleInstructor = allUsers().teacher;
module.exports.exampleStudent = allUsers().test;
module.exports.exampleAdmin = allUsers().admin;
module.exports.exampleSubmission = allSubmissions().testSubmission;
module.exports.exampleSectionEvent = allSectionEvents().testSectionEvent;
module.exports.exampleSection = allSections().testSection;
module.exports.exampleEvent = allEvents().testEvent;
module.exports.exampleCourse = allCourses().testCourse;
module.exports.exampleSettings = allSettings().testSettings;

module.exports.seed = function(){
  var resolved = false;
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (!resolved){
        reject("Seeding timed out");
      }
    },20000)

    return module.exports.clearDB()
    .then(module.exports.createUsers).then(() => {
      console.log('finished populating users');
    }).then(module.exports.createCourses).then(() => {
      console.log('finished populating courses');
    }).then(module.exports.createEvents).then(() => {
      console.log('finished populating events');
    }).then(module.exports.createSections).then(()=>{
      console.log('finished populating sections');
    }).then(module.exports.createSectionEvents).then(()=>{
      console.log('finished populating section events');
    }).then(module.exports.createSubmissions).then(()=>{
      console.log("finished populating submissions");
    }).then(module.exports.createSettings).then(()=>{
      console.log("finished populating settings");
    }).then( () => {
      resolved = true;
      resolve()
    })
    .catch((err) => {
      reject(`Error seeding the database!, ${err}`);
    });
  });

}

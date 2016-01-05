/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Course from '../api/course/course.model';
import Event from '../api/event/event.model';

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }, {
      provider: 'local',
      name: 'bob',
      email: 'bob@example.com',
      password: 'password',
      isInstructor: true
    }, {
      provider: 'local',
      name: 'foo',
      email: 'foo@example.com',
      password: 'password',
      isInstructor: false
    }, {
      provider: 'local',
      name: 'jane',
      email: 'jane@example.com',
      password: 'password',
      isInstructor: false
    })
    .then(() => {
      console.log('finished populating users');
      createCourses();
    });
  });

function createCourses(){
  Course.find({}).removeAsync()
    .then(() => {
      Course.createAsync({
        name: 'machine learning',
        courseReferenceNumber: 1111111,
        department: "CSCI",
        courseNumber: 4100,
        description: "Learn about machines ",
        semester: "F2015",
        students: [],
        instructors: [],
        active: false
      }, {
        name: 'Intro to comp sci',
        courseReferenceNumber: 1111112,
        department: "CSCI",
        courseNumber: 1200,
        description: "Learn about coding!",
        semester: "S2016",
        active: true
      })
      .then(() => {
        console.log('finished populating courses');
        createEvents();
        addStudents();
      });
    });
}

function addStudents(){
  // Find users
  User.findOne({'name':"bob"}, function(err, user){
    Course.find({}, function(err, courses){
      for (var i=0; i< courses.length; i++) {
        courses[i].instructors.push(user._id);
        courses[i].save(function(err) {
          if (err) return console.log(err);
        });
      }
    });
  });

  User.findOne({'name':"foo"}, function(err, user){
    Course.find({}, function(err, courses){
      for (var i=0; i< courses.length; i++) {
        courses[i].students.push(user._id);
        courses[i].save(function(err) {
          if (err) return console.log(err);
        });
      }
    });
  });

  User.findOne({'name':"jane"}, function(err, user){
    Course.find({}, function(err, courses){
      for (var i=0; i< courses.length; i++) {
        courses[i].students.push(user._id);
        courses[i].save(function(err) {
          if (err) return console.log(err);
        });
      }
    });
  });
}


function createEvents(){

Event.find({}).removeAsync()
  .then(() => {
    Event.createAsync({
      title: "RCOS meeting",
      description: "RCOS is awesome",
      creationDate: new Date(),

    }, {
      title: "artx",
      description: "artx is awesome",
      creationDate: new Date(),
    })
    .then(() => {
      console.log('finished populating courses');
      addCourses();
    });
  });
}

function addCourses(){
  // Find users
  Course.findOne({ 'courseReferenceNumber': 1111111}, function(err, course){
    Event.find({}, function(err, events){
      for (var i=0; i< events.length; i++) {
        events[i].courses.push(course._id);
        events[i].save(function(err) {
          if (err) return console.log(err);
        });
      }
    });
  });

  Course.findOne({'courseReferenceNumber':1111112}, function(err, course){
    Event.find({}, function(err, events){
      for (var i=0; i< events.length; i++) {
        events[i].courses.push(course._id);
        events[i].save(function(err) {
          if (err) return console.log(err);
        });
      }
    });
  });

}

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Course from '../api/course/course.model';
import Event from '../api/event/event.model';
import mongoose from 'mongoose';

// Create Users
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

// Create Courses
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

// Add the students to the courses
function addStudents(){
  var students = [
    {'name': 'foo'},
    {'name': 'jane'}
  ]

  for (var i=0; i< students.length; i++) {
    addStudentsHelper(students[i]);
  }

  var instr = [
    {'name': 'bob'}
  ]
  for (var i=0; i< instr.length; i++) {
    addInstructorHelper(instr[i]);
  }
}

function addStudentsHelper(student){
  User.findOne(student, function(err, user){
    Course.find({}, function(err, courses){
      var courseIds = [];
      for (var i=0; i< courses.length; i++) {
        courseIds.push(courses[i]._id);
        //  Add student to course's model
        courses[i].students.push(user._id);
        courses[i].save(function(err) {
          if (err) return console.log(err);
        });
      }
      addStudentToCourse(student, courseIds);
    });
  });
}

function addInstructorHelper(instr){
  User.findOne(instr, function(err, user){
    Course.find({}, function(err, courses){
      var courseIds = [];
      for (var i=0; i< courses.length; i++) {
        courseIds.push(courses[i]._id);
        courses[i].instructors.push(user._id);
        courses[i].save(function(err) {
          if (err) return console.log(err);
        });
      }
      addStudentToCourse(instr, courseIds);
    });
  });
}

function addStudentToCourse(student, courses){
  User.findOne(student, function(err, user){
    user.courses = courses;
    user.save(function(err) {
      if (err) return console.log(err);
    });
  });
}

// Create Events
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
        console.log('finished populating events');
        addCourses();
      });
    });
}

// Add courses to those events
function addCourses(){
  var referecnceNumber = [
    { 'courseReferenceNumber': 1111111},
    { 'courseReferenceNumber': 1111112}
  ]
  for(var num in referecnceNumber){
    addCoursesHelper(referecnceNumber[num])
  }

}

function addCoursesHelper(ref){
  Course.findOne(ref, function(err, course){
    Event.find({}, function(err, events){
      for (var i=0; i< events.length; i++) {
        events[i].courses.push(course._id);
        events[i].save(function(err) {
          if (err) return console.log(err);
        });
        if(course.events.indexOf(mongoose.Types.ObjectId(events[i]._id)) == -1){
          course.events.push(events[i]._id);
          course.save(function(err) {
            if (err) return console.log(err);
          });
        }
      }
    });
  });
}

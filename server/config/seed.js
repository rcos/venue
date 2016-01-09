/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Course from '../api/course/course.model';
import Event from '../api/event/event.model';
var mongoose = require('mongoose');
createUsers();
createCourses();
createEvents();

// Create Users
function createUsers(){
  User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: 'test',
      _id: mongoose.Types.ObjectId('000000000000000000000000'),
    }, {
      provider: 'local',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@admin.com',
      password: 'admin',
      _id: mongoose.Types.ObjectId('000000000000000000000001'),

    }, {
      provider: 'local',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob@bob.com',
      password: 'bob',
      isInstructor: true,
      _id: mongoose.Types.ObjectId('000000000000000000000002'),
    },
    {
      provider: 'local',
      firstName: 'Travis',
      lastName: 'Smith',
      email: 'travis@travis.com',
      password: 'travis',
      isInstructor: true,
      _id: mongoose.Types.ObjectId('000000000000000000000003'),
    }, {
      provider: 'local',
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@foo.com',
      password: 'foo',
      isInstructor: false,
      _id: mongoose.Types.ObjectId('000000000000000000000004'),
    },{
      provider: 'local',
      firstName: 'Kelly',
      lastName: 'Simon',
      email: 'kelly@kelly.com',
      password: 'kelly',
      isInstructor: false,
      _id: mongoose.Types.ObjectId('000000000000000000000005'),
    }, {
      provider: 'local',
      firstName: 'Jane',
      lastName: 'Eagle',
      email: 'jane@jane.com',
      password: 'jane',
      isInstructor: false,
      _id: mongoose.Types.ObjectId('000000000000000000000006'),
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
}


// Create Courses
function createCourses(){
  Course.find({}).removeAsync()
  .then(() => {
    Course.createAsync({
      name: 'Net Art',
      courseReferenceNumber: 1111111,
      department: "ARTS",
      courseNumber: 2030,
      description: "Net Art is a hands-on studio course that uses the examination of the historical and theoretical aspects of Web-based art and virtual social spaces as a launching pad for individual student work. Considerable work at the conceptual level and a survey of Web-oriented software and programming enable students to create new works in net-based art.",
      enrollmentPolicy: "closed",
      semester: "F2015",
      students: [mongoose.Types.ObjectId('000000000000000000000004'),mongoose.Types.ObjectId('000000000000000000000005'),mongoose.Types.ObjectId('000000000000000000000006')],
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000002')],//Bob
      events: [],
      active: false,
      _id: mongoose.Types.ObjectId('000000000000000000000010'),
    },
    {
      name: "Introduction to Open Source",
      courseReferenceNumber: 1111112,
      department: "CSCI",
      courseNumber: 2963,
      description: "The goal of this course is to provide a strong foundation in open source software development in preparation for jobs in industry or for more advanced courses. An important component of this course is participation in a community and contributing to an open source project. This course also provides an understanding of open source software tools and community, an understanding of open source licensing, an understanding of testing, version control, and open source software stacks. Students must come with a desire to learn new things, as well as the ability to adapt to open source tools and packages.",
      semester: "S2015",
      enrollmentPolicy: "verification required",
      students: [mongoose.Types.ObjectId('000000000000000000000004')],
      pendingStudents: [mongoose.Types.ObjectId('000000000000000000000006')],
      instructors: [],
      events: [],
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000011'),
    },
    {
      name: "Mestizo Robotics",
      courseReferenceNumber: 1111113,
      department: "ARCH",
      courseNumber: 4968,
      description: "Students will participate in the development of an artistic academic project comprised of an interconnected spherical robotic community dispersed and developed by different research units throughout the Americas.",
      semester: "S2015",
      enrollmentPolicy: "verification required",
      students: [mongoose.Types.ObjectId('000000000000000000000004'),mongoose.Types.ObjectId('000000000000000000000005')],
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000003'),mongoose.Types.ObjectId('000000000000000000000002')], //Travis & Bob
      events: [],
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000012'),
    },
    {
      name: "Art, Community and Technology",
      courseReferenceNumber: 1111114,
      department: "ARTS",
      courseNumber: 4080,
      description: "Through direct experience in the community, this course explores the complex roles and relationships of art, education and technology, students will develop a plan to work with a media arts center, community organization or school; final teams will produce real-world arts and education projects that ultimately will be realized as significant additions to their professional portfolio.  The projects can include a range from traditional arts practice to creative writing, creative IT models to community art and activism. We will examine diverse case studies, with special focus on the development and sustainability of a new local media arts center in Troy, the Sanctuary for Independent Media.  Students from a wide interdisciplinary range of studies are encouraged to enroll: a strong interest in how you can integrate creativity into your own knowledge base, and a desire to do field work in the community, are all that is required.",
      semester: "S2015",
      enrollmentPolicy: "open",
      students: [],
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000003')], //Travis
      events: [],
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000013'),
    },
    {
      name: "Media Studio: Imaging",
      courseReferenceNumber: 1111115,
      department: "ARTS",
      courseNumber: 1020,
      description: "This course introduces students to digital photography, web design, and interactive multimedia in making art. Students broaden their understanding of such topics as composition, effective use of images, color theory, typography, and narrative flow. Inquiry and experimentation are encouraged, leading towards the development of the skill and techniques needed to create visual art with electronic media.",
      semester: "S2015",
      enrollmentPolicy: "closed",
      students: [mongoose.Types.ObjectId('000000000000000000000005'),mongoose.Types.ObjectId('000000000000000000000006')],
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000003')], //Travis
      events: [],
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000014'),
    })
    .then(() => {
      console.log('finished populating courses');
    });
  });
}

// Create Events
function createEvents(){
  Event.find({}).removeAsync()
  .then(() => {
    Event.createAsync(
      {
        title: "Art_X Concerts: Examine Intersections of Science, Art",
        description: "Faculty of the School of Humanities, Arts and Social Sciences (HASS) collaborate with the Center for Biotechnology and Interdisciplinary Studies (CBIS) and local Troy artists on two Art_X concerts to discover the art in science and the science in art.  The concerts, which will be held on Tuesday October 6 and October 20 at 4:30 pm in the CBIS Auditorium, are free and open to the RPI community. Following each concert, there will be a reception hosted by CBIS in the Gallery of the CBIS Auditorium.",
        imageURL: "http://news.rpi.edu/sites/default/files/cbis-news_0.jpeg", // url to image
        author: mongoose.Types.ObjectId('000000000000000000000003'), //Travis
        creationDate: new Date("January 1, 2016 03:24:00"),
        course: mongoose.Types.ObjectId('000000000000000000000012'), //Metzio Robitics
        location: {
          address: "110 8th St, Troy, NY  12180, United States",
          description: "Empac",
          geo: {
            type: 'Point',
            coordinates: [42.7288898,-73.6842041] // [<longitude>, <latitude>]
          }
        },
        times: [{
            start: new Date("January 20, 2016 18:00:00"),
            end: new Date("January 20, 2016 20:00:00"),
        },{
            start: new Date("January 22, 2016 18:00:00"),
            end: new Date("January 22, 2016 20:00:00"),
        }],
        _id: mongoose.Types.ObjectId('000000000000000000000020')
      },
      {
        title: "Dancing Through the Years",
        description: "Judson Laipply dances the last 50 years.",
        imageURL: "http://www.lhsdoi.com/wp-content/uploads/2014/04/photo-1-950x950.jpg", // url to image
        author: mongoose.Types.ObjectId('000000000000000000000002'), //Bob
        creationDate: new Date("January 4, 2016 05:49:06"),
        course: mongoose.Types.ObjectId('000000000000000000000010'), //Net Art
        location: {
          address: "110 8th St, Troy, NY  12180, United States",
          description: "Empac",
          geo: {
            type: 'Point',
            coordinates: [42.7288898,-73.6842041] // [<longitude>, <latitude>]
          }
        },
        times: [{
            start: new Date("January 15, 2016 18:00:00"),
            end: new Date("January 15, 2016 20:00:00"),
        }],
        _id: mongoose.Types.ObjectId('000000000000000000000021')

      })
    .then(() => {
      console.log('finished populating events');
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
        events[i].course.push(course._id);
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

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

var mongoose = require('mongoose');
createUsers();
createCourses();
createSections();
createEvents();
createSectionEvents()
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
      isInstructor: false,
      sections: [],
      _id: mongoose.Types.ObjectId('000000000000000000000000'),
    }, {
      provider: 'local',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@admin.com',
      password: 'admin',
      isInstructor: true,
      sections: [],
      _id: mongoose.Types.ObjectId('000000000000000000000001'),

    }, {
      provider: 'local',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob@bob.com',
      password: 'bob',
      isInstructor: true,
      sections: [mongoose.Types.ObjectId('000000000000000000000120'),mongoose.Types.ObjectId('000000000000000000000122')],//Net Art sections 1,2 and 3,4 Mestizo Robotics section 1 and Art, Community and Technology sections 2,3,4
      _id: mongoose.Types.ObjectId('000000000000000000000002'),
    },
    {
      provider: 'local',
      firstName: 'Travis',
      lastName: 'Smith',
      email: 'travis@travis.com',
      password: 'travis',
      isInstructor: true,
      sections: [mongoose.Types.ObjectId('000000000000000000000122'),], //Mestizo Robotics section 1 Art, Community and Technology section 1 and Media Studio: Imaging section 1,2,3,4
      _id: mongoose.Types.ObjectId('000000000000000000000003'),
    }, {
      provider: 'local',
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@foo.com',
      password: 'foo',
      isInstructor: false,
      sections: [mongoose.Types.ObjectId('000000000000000000000220'),mongoose.Types.ObjectId('000000000000000000000124'),mongoose.Types.ObjectId('000000000000000000000121'),mongoose.Types.ObjectId('000000000000000000000223')],//Net Art sections 3,4 and Introduction to Open Source section 1 and Media Studio: Imaging sections 1,2,3,4 and Art, Community and Technology sections 2,3,4
      _id: mongoose.Types.ObjectId('000000000000000000000004'),
    },{
      provider: 'local',
      firstName: 'Kelly',
      lastName: 'Simon',
      email: 'kelly@kelly.com',
      password: 'kelly',
      isInstructor: false,
      sections: [mongoose.Types.ObjectId('000000000000000000000124'),mongoose.Types.ObjectId('000000000000000000000122')], //Media Studio: Imaging sections 1,2,3,4 and Mestizo Robotics section 1
      _id: mongoose.Types.ObjectId('000000000000000000000005'),
    }, {
      provider: 'local',
      firstName: 'Jane',
      lastName: 'Eagle',
      email: 'jane@jane.com',
      password: 'jane',
      isInstructor: false,
      sections: [mongoose.Types.ObjectId('000000000000000000000124'),mongoose.Types.ObjectId('000000000000000000000120'),],//Media Studio: Imaging sections 1,2,3,4 and Net Art sections 1,2
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
      department: "ARTS",
      courseNumber: 2030,
      description: "Net Art is a hands-on studio course that uses the examination of the historical and theoretical aspects of Web-based art and virtual social spaces as a launching pad for individual student work. Considerable work at the conceptual level and a survey of Web-oriented software and programming enable students to create new works in net-based art.",
      semester: "F2015",
      active: false,
      _id: mongoose.Types.ObjectId('000000000000000000000010'),
    },
    {
      name: "Introduction to Open Source",
      department: "CSCI",
      courseNumber: 2963,
      description: "The goal of this course is to provide a strong foundation in open source software development in preparation for jobs in industry or for more advanced courses. An important component of this course is participation in a community and contributing to an open source project. This course also provides an understanding of open source software tools and community, an understanding of open source licensing, an understanding of testing, version control, and open source software stacks. Students must come with a desire to learn new things, as well as the ability to adapt to open source tools and packages.",
      semester: "S2015",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000011'),
    },
    {
      name: "Mestizo Robotics",
      department: "ARCH",
      courseNumber: 4968,
      description: "Students will participate in the development of an artistic academic project comprised of an interconnected spherical robotic community dispersed and developed by different research units throughout the Americas.",
      semester: "S2015",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000012'),
    },
    {
      name: "Art, Community and Technology",
      department: "ARTS",
      courseNumber: 4080,
      description: "Through direct experience in the community, this course explores the complex roles and relationships of art, education and technology, students will develop a plan to work with a media arts center, community organization or school; final teams will produce real-world arts and education projects that ultimately will be realized as significant additions to their professional portfolio.  The projects can include a range from traditional arts practice to creative writing, creative IT models to community art and activism. We will examine diverse case studies, with special focus on the development and sustainability of a new local media arts center in Troy, the Sanctuary for Independent Media.  Students from a wide interdisciplinary range of studies are encouraged to enroll: a strong interest in how you can integrate creativity into your own knowledge base, and a desire to do field work in the community, are all that is required.",
      semester: "S2015",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000013'),
    },
    {
      name: "Media Studio: Imaging",
      department: "ARTS",
      courseNumber: 1020,
      description: "This course introduces students to digital photography, web design, and interactive multimedia in making art. Students broaden their understanding of such topics as composition, effective use of images, color theory, typography, and narrative flow. Inquiry and experimentation are encouraged, leading towards the development of the skill and techniques needed to create visual art with electronic media.",
      semester: "S2015",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000014'),
    })
    .then(() => {
      console.log('finished populating courses');
    });
  });
}

// Create Courses
function createSections(){
  Section.find({}).removeAsync()
  .then(() => {
    Section.createAsync({
      course: mongoose.Types.ObjectId('000000000000000000000010'), //Net Art
      sectionNumbers: [1,2],
      enrollmentPolicy: "closed",
      students: [mongoose.Types.ObjectId('000000000000000000000006')],//Jane
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000002')],//Bob
      events: [],
      _id:mongoose.Types.ObjectId('000000000000000000000120'),
    },{
      course: mongoose.Types.ObjectId('000000000000000000000010'), //Net Art
      sectionNumbers: [3,4],
      enrollmentPolicy: "closed",
      students: [mongoose.Types.ObjectId('000000000000000000000004')],//Foo
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000002')],//Bob
      events: [],
      _id:mongoose.Types.ObjectId('000000000000000000000220'),
    },
    {
      course: mongoose.Types.ObjectId('000000000000000000000011'), //Introduction to Open Source
      sectionNumbers: [1],
      enrollmentPolicy: "approvalRequired",
      students: [mongoose.Types.ObjectId('000000000000000000000004')],//Foo
      pendingStudents: [mongoose.Types.ObjectId('000000000000000000000006')],//Jane
      instructors: [],
      events: [],
      _id:mongoose.Types.ObjectId('000000000000000000000121'),
    },
    {
      course: mongoose.Types.ObjectId('000000000000000000000012'), //Mestizo Robotics
      sectionNumbers: [1],
      enrollmentPolicy: "approvalRequired",
      students: [mongoose.Types.ObjectId('000000000000000000000004'),mongoose.Types.ObjectId('000000000000000000000005')], //Foo and Kelly
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000003'),mongoose.Types.ObjectId('000000000000000000000002')], //Travis & Bob
      events: [],
      _id:mongoose.Types.ObjectId('000000000000000000000122'),
    },
    {
      course: mongoose.Types.ObjectId('000000000000000000000013'), //Art, Community and Technology
      sectionNumbers: [1],
      enrollmentPolicy: "open",
      students: [],
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000003')], //Travis
      events: [],
      _id:mongoose.Types.ObjectId('000000000000000000000123'),
    },{
      course: mongoose.Types.ObjectId('000000000000000000000013'), //Art, Community and Technology
      sectionNumbers: [2,3,4],
      enrollmentPolicy: "open",
      students: [mongoose.Types.ObjectId('000000000000000000000004')], //foo
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000002')], //Bob
      events: [],
      _id:mongoose.Types.ObjectId('000000000000000000000223'),
    },
    {
      course: mongoose.Types.ObjectId('000000000000000000000014'), //Media Studio: Imaging
      sectionNumbers: [1,2,3,4],
      enrollmentPolicy: "closed",
      students: [mongoose.Types.ObjectId('000000000000000000000004'),mongoose.Types.ObjectId('000000000000000000000005'),mongoose.Types.ObjectId('000000000000000000000006')], //foo, kelly, jane
      pendingStudents: [],
      instructors: [mongoose.Types.ObjectId('000000000000000000000003')], //Travis
      events: [],
      _id:mongoose.Types.ObjectId('000000000000000000000124'),
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
// Create Section Events

function createSectionEvents(){
  SectionEvent.find({}).removeAsync()
  .then(() => {
    SectionEvent.createAsync(
      {
        section: mongoose.Types.ObjectId('000000000000000000000120'),//Net art sections 1,2
        additionalNotes:"Make sure to take a photo with the program.",
        author: mongoose.Types.ObjectId('000000000000000000000003'), //Travis
        creationDate: new Date("January 1, 2016 03:24:00"),
        info: mongoose.Types.ObjectId('000000000000000000000020'),//Art_X Concerts: Examine Intersections of Science, Art
        _id: mongoose.Types.ObjectId('000000000000000000001000')
      },
      {
        section: mongoose.Types.ObjectId('000000000000000000000220'),//Net art sections 3,4
        additionalNotes:"Make sure to take a photo in front of the building.",
        author: mongoose.Types.ObjectId('000000000000000000000003'), //Travis
        creationDate: new Date("January 1, 2016 03:24:00"),
        info: mongoose.Types.ObjectId('000000000000000000000020'),//Art_X Concerts: Examine Intersections of Science, Art
        _id: mongoose.Types.ObjectId('000000000000000000001001')
      },
      {
        section: mongoose.Types.ObjectId('000000000000000000000121'),//Introduction to Open Source sections 1
        additionalNotes:"Make sure to take a photo in front of the building.",
        author: mongoose.Types.ObjectId('000000000000000000000003'), //Travis
        creationDate: new Date("January 1, 2016 03:24:00"),
        info: mongoose.Types.ObjectId('000000000000000000000020'),//Art_X Concerts: Examine Intersections of Science, Art
        _id: mongoose.Types.ObjectId('000000000000000000001002')
      },
      {
        section:mongoose.Types.ObjectId('000000000000000000000124'),// Media Studio: Imaging section 1
        additionalNotes:"Make sure to take a photo in front of the building.",
        author: mongoose.Types.ObjectId('000000000000000000000003'), //Travis
        creationDate: new Date("January 1, 2016 03:24:00"),
        info: mongoose.Types.ObjectId('000000000000000000000020'),//Art_X Concerts: Examine Intersections of Science, Art
        _id: mongoose.Types.ObjectId('000000000000000000001003')
      },
      {
        section:mongoose.Types.ObjectId('000000000000000000000123'),// Art, Community and Technology section 1
        additionalNotes:"",
        author: mongoose.Types.ObjectId('000000000000000000000002'), //Bob
        creationDate: new Date("January 4, 2016 05:49:06"),
        info: mongoose.Types.ObjectId('000000000000000000000021'),//Dancing Through the Years
        _id: mongoose.Types.ObjectId('000000000000000000001004')


      },
      {
        section:mongoose.Types.ObjectId('000000000000000000000124'),// Media Studio: Imaging section 1
        additionalNotes:"",
        author: mongoose.Types.ObjectId('000000000000000000000002'), //Bob
        creationDate: new Date("January 4, 2016 05:49:06"),
        info: mongoose.Types.ObjectId('000000000000000000000021'),//Dancing Through the Years
        _id: mongoose.Types.ObjectId('000000000000000000001005')


      },
      {
        section: mongoose.Types.ObjectId('000000000000000000000220'),//Net art sections 3,4
        additionalNotes:"",
        author: mongoose.Types.ObjectId('000000000000000000000002'), //Bob
        creationDate: new Date("January 4, 2016 05:49:06"),
        info: mongoose.Types.ObjectId('000000000000000000000021'),//Dancing Through the Years
        _id: mongoose.Types.ObjectId('000000000000000000001006')


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

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

var mongoose = require('mongoose');

function allUsers(){return {
  test: {
    provider: 'local',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'test',
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000000'),
  },
  admin: {
    provider: 'local',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@admin.com',
    password: 'admin',
    isInstructor: true,
    _id: mongoose.Types.ObjectId('000000000000000000000001'),

  },
  bob: {
    provider: 'local',
    firstName: 'Bob',
    lastName: 'Dylan',
    email: 'bob@bob.com',
    password: 'bob',
    isInstructor: true,
    _id: mongoose.Types.ObjectId('000000000000000000000002'),
  },
  travis: {
    provider: 'local',
    firstName: 'Travis',
    lastName: 'Smith',
    email: 'travis@travis.com',
    password: 'travis',
    isInstructor: true,
    _id: mongoose.Types.ObjectId('000000000000000000000003'),
  },
  foo: {
    provider: 'local',
    firstName: 'Foo',
    lastName: 'Bar',
    email: 'foo@foo.com',
    password: 'foo',
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000004'),
  },
  kelly: {
    provider: 'local',
    firstName: 'Kelly',
    lastName: 'Simon',
    email: 'kelly@kelly.com',
    password: 'kelly',
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000005'),
  },
  jane: {
    provider: 'local',
    firstName: 'Jane',
    lastName: 'Eagle',
    email: 'jane@jane.com',
    password: 'jane',
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000006'),
  }}
}

function allCourses(){return {
    netArt:{
      name: 'Net Art',
      department: "ARTS",
      courseNumber: 2030,
      description: "Net Art is a hands-on studio course that uses the examination of the historical and theoretical aspects of Web-based art and virtual social spaces as a launching pad for individual student work. Considerable work at the conceptual level and a survey of Web-oriented software and programming enable students to create new works in net-based art.",
      semester: "Fall15",
      active: false,
      _id: mongoose.Types.ObjectId('000000000000000000000010'),
    },
    openSource:{
      name: "Introduction to Open Source",
      department: "CSCI",
      courseNumber: 2963,
      description: "The goal of this course is to provide a strong foundation in open source software development in preparation for jobs in industry or for more advanced courses. An important component of this course is participation in a community and contributing to an open source project. This course also provides an understanding of open source software tools and community, an understanding of open source licensing, an understanding of testing, version control, and open source software stacks. Students must come with a desire to learn new things, as well as the ability to adapt to open source tools and packages.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000011'),
    },
    robotics:{
      name: "Mestizo Robotics",
      department: "ARCH",
      courseNumber: 4968,
      description: "Students will participate in the development of an artistic academic project comprised of an interconnected spherical robotic community dispersed and developed by different research units throughout the Americas.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000012'),
    },
    art:{
      name: "Art, Community and Technology",
      department: "ARTS",
      courseNumber: 4080,
      description: "Through direct experience in the community, this course explores the complex roles and relationships of art, education and technology, students will develop a plan to work with a media arts center, community organization or school; final teams will produce real-world arts and education projects that ultimately will be realized as significant additions to their professional portfolio.  The projects can include a range from traditional arts practice to creative writing, creative IT models to community art and activism. We will examine diverse case studies, with special focus on the development and sustainability of a new local media arts center in Troy, the Sanctuary for Independent Media.  Students from a wide interdisciplinary range of studies are encouraged to enroll: a strong interest in how you can integrate creativity into your own knowledge base, and a desire to do field work in the community, are all that is required.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000013'),
    },
    imaging:{
      name: "Media Studio: Imaging",
      department: "ARTS",
      courseNumber: 1020,
      description: "This course introduces students to digital photography, web design, and interactive multimedia in making art. Students broaden their understanding of such topics as composition, effective use of images, color theory, typography, and narrative flow. Inquiry and experimentation are encouraged, leading towards the development of the skill and techniques needed to create visual art with electronic media.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000014'),
    },
    materials:{
      name: "Materials and Design",
      department: "ARCH",
      courseNumber: 2510,
      description: "This course establishes an understanding of the most common materials, their properties and resulting uses, and the implications of their uses in the larger context of material life cycles. The structural makeup of metals, ceramics, polymers, and composite materials is discovered and their resulting properties, costs, and life cycle consequences are clarified. An understanding of basic mechanical properties is established hands on by conducting tension, compression, and 3-point bending tests (mse-lab). Physical performance of material constructs as synergy between form and material properties is further illustrated. Experiments are conducted that introduce such major concepts as structural loading, properties of sections, and resulting system performance. Sustainability: The concept of life cycles is introduced; material and energy flows are tracked throughout the entire material life cycle. This will be accomplished alongside introducing major material groupings (metals, polymers, ceramics, and composites). Students come to realize that environmental concerns are directly related to structural composition and material availability. Consequences of resource extraction, distribution, manipulation, use, and disposal, reuse or recycle are addressed at both local and global scales. Selected field trips to materials extraction, processing, manufacturing, disposal, and recycling facilities are aimed to give physical meaning to the concept of life cycle.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000015'),
    },
    designStudio:{
      name: "Design Studio",
      department: "ARCH",
      courseNumber: 2200,
      description: "Design studio introducing students from all disciplines to general design through a series of short projects. The projects stress critical and creative thinking and invention, interdisciplinary collaboration, observation and perception, communication and visualization. Students will begin open-ended investigations using sketching, photography, model making, and computing.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000016'),
    },
    citiesLands:{
      name: "Cities/Lands",
      department: "ARCH",
      courseNumber: 4040,
      description: "This lecture-seminar is an examination of the parallel historical formation and operation of human settlements together with the territories associated with them, and the interrelations among them in Western Europe, North America, China, the Middle East, and North Africa. The purpose is to better understand the role spatial organization plays in the construction of social practices, human subjectivities, and technologies of power. While the differing paradigmatic notions of architectural and landscape practices will be explored in each cultural situation, the emphasis will be on the formative processes operating at all scales and among scales, and the more general design practices that have emerged, and could emerge, from these understandings.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000017'),
    }
  }
}

function allSections(){ return {
    netArt12: {
      sectionNumbers: [1,2],
      enrollmentPolicy: "closed",
      _id:mongoose.Types.ObjectId('000000000000000000000120'),
      course : allCourses().netArt._id, //Net Art
      students : [allUsers().jane._id], //Jane
      pendingStudents : [],
      instructors : [allUsers().bob._id] //Bob
    },
    netArt34: {
      sectionNumbers: [3,4],
      enrollmentPolicy: "closed",
      _id:mongoose.Types.ObjectId('000000000000000000000220'),
      course : allCourses().netArt._id, //Net Art
      students : [allUsers().foo._id], //Foo
      pendingStudents : [],
      instructors : [allUsers().bob._id], //Bob
    },
    openSource1: {
      course : allCourses().openSource._id, //Introduction to Open Source
      students : [allUsers().foo._id], //Foo
      pendingStudents : [allUsers().jane._id], //Jane
      instructors : [allUsers().bob._id], //Bob
      sectionNumbers: [1],
      enrollmentPolicy: "approvalRequired",
      _id:mongoose.Types.ObjectId('000000000000000000000121'),
    },
    robotics1: {
      course : allCourses().robotics._id, //Mestizo Robotics
      students : [allUsers().foo._id, allUsers().kelly._id], //Foo and Kelly
      pendingStudents : [],
      instructors : [allUsers().travis._id,allUsers().bob._id], //Travis & Bob
      sectionNumbers: [1],
      enrollmentPolicy: "approvalRequired",
      _id:mongoose.Types.ObjectId('000000000000000000000122'),
    },
    art1: {
      course : allCourses().art._id, //Art, Community and Technology
      students : [],
      pendingStudents : [],
      instructors : [allUsers().travis._id], //Travis
      sectionNumbers: [1],
      enrollmentPolicy: "open",
      _id:mongoose.Types.ObjectId('000000000000000000000123'),
    },
    art234: {
      course : allCourses().art._id, //Art, Community and Technology
      students : [allUsers().foo._id], //foo
      pendingStudents : [],
      instructors : [allUsers().bob._id], //Bob
      sectionNumbers: [2,3,4],
      enrollmentPolicy: "open",
      _id:mongoose.Types.ObjectId('000000000000000000000223'),
    },
    imaging1234: {
      course : allCourses().imaging._id, //Media Studio: Imaging
      students :  [allUsers().foo._id ,allUsers().kelly._id ,allUsers().jane._id ], //foo, kelly, jane
      pendingStudents :  [],
      instructors :  [allUsers().travis._id ], //Travis
      sectionNumbers: [1,2,3,4],
      enrollmentPolicy: "closed",
      _id:mongoose.Types.ObjectId('000000000000000000000124'),
    },
    designStudio1: {
      course : allCourses().designStudio._id, //Design Studio
      students : [],
      pendingStudents : [allUsers().foo._id ,allUsers().kelly._id ,allUsers().jane._id ], //foo, kelly, jane
      instructors : [],
      sectionNumbers: [1],
      enrollmentPolicy: "closed",
      _id:mongoose.Types.ObjectId('000000000000000000000125'),
    },
    citiesLands1: {
      course : allCourses().citiesLands._id, //Cities/Lands
      students : [],
      pendingStudents : [allUsers().foo._id ,allUsers().kelly._id ,allUsers().jane._id ], //foo, kelly, jane
      instructors : [allUsers().travis._id ], //Travis
      sectionNumbers: [1],
      enrollmentPolicy: "closed",
      _id:mongoose.Types.ObjectId('000000000000000000000126'),
    }
  }
}


function allEvents(){
  return {
      concerts:{
      title: "Art_X Concerts: Examine Intersections of Science, Art",
      description: "Faculty of the School of Humanities, Arts and Social Sciences (HASS) collaborate with the Center for Biotechnology and Interdisciplinary Studies (CBIS) and local Troy artists on two Art_X concerts to discover the art in science and the science in art.  The concerts, which will be held on Tuesday October 6 and October 20 at 4:30 pm in the CBIS Auditorium, are free and open to the RPI community. Following each concert, there will be a reception hosted by CBIS in the Gallery of the CBIS Auditorium.",
      imageURL: "http://news.rpi.edu/sites/default/files/cbis-news_0.jpeg", // url to image
      author: allUsers().travis._id, //Travis
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
    dancing:{
      title: "Dancing Through the Years",
      description: "Judson Laipply dances the last 50 years.",
      imageURL: "http://www.lhsdoi.com/wp-content/uploads/2014/04/photo-1-950x950.jpg", // url to image
      author: allUsers().bob._id, //Bob
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

    }
  }
}

function allSectionEvents(){
  return{
    netArt12Concerts: {
      section: allSections().netArt12._id,//Net art sections 1,2
      course: allCourses().netArt._id,//Net art
      additionalNotes:"Make sure to take a photo with the program.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001000')
    },
    netArt34Concerts: {
      section: allSections().netArt34._id,//Net art sections 3,4
      course: allCourses().netArt._id,//Net art
      additionalNotes:"Make sure to take a photo in front of the building.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001001')
    },
    openSource1Concerts: {
      section: allSections().openSource1._id,//Introduction to Open Source sections 1
      course: allCourses().openSource._id,//Introduction to Open Source
      additionalNotes:"Make sure to take a photo in front of the building.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001002')
    },
    imaging1234Concerts: {
      section: allSections().imaging1234._id,// Media Studio: Imaging section 1
      course: allCourses().imaging._id,//Media Studio: Imaging
      additionalNotes:"Make sure to take a photo in front of the building.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001003')
    },
    art1Dancing: {
      section: allSections().art1._id,// Art, Community and Technology section 1
      course: allCourses().art._id,//Art, Community and Technology
      additionalNotes:"",
      author: allUsers().bob._id, //Bob
      creationDate: new Date("January 4, 2016 05:49:06"),
      info: allEvents().dancing._id,//Dancing Through the Years
      _id: mongoose.Types.ObjectId('000000000000000000001004')
    },
    imaging1234Dancing: {
      section:allSections().imaging1234._id,// Media Studio: Imaging section 1
      course: allCourses().imaging._id,//Media Studio: Imaging
      additionalNotes:"",
      author: allUsers().bob._id, //Bob
      creationDate: new Date("January 4, 2016 05:49:06"),
      info: allEvents().dancing._id,//Dancing Through the Years
      _id: mongoose.Types.ObjectId('000000000000000000001005')
    },
    netArt34Dancing: {
      section: allSections().netArt34._id,//Net art sections 3,4
      course: allCourses().netArt._id,//Net art
      additionalNotes:"",
      author: allUsers().bob._id, //Bob
      creationDate: new Date("January 4, 2016 05:49:06"),
      info: allEvents().dancing._id,//Dancing Through the Years
      _id: mongoose.Types.ObjectId('000000000000000000001006')
    }
  }
}

function allSubmissions(){
  return {
    submission1:{
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet interdum nisi placerat iaculis. Praesent in euismod nunc. Ut dapibus lacinia velit sed congue. Proin lacus augue, tempus vel rhoncus eu, dignissim id enim. Integer sit amet tempor felis. Aenean eros sem, euismod sit amet malesuada nec, eleifend ac ex. Sed rutrum nisi eros, quis imperdiet sem commodo ac. Fusce dictum massa dapibus nibh tincidunt maximus. Praesent gravida ante est, eu vehicula enim blandit non. Cras leo ligula, volutpat vitae tortor sed, malesuada tempor sapien. Donec malesuada lorem eu lacus auctor, ac placerat leo gravida. Aliquam bibendum accumsan lectus, ac consectetur arcu egestas eget. Cras quis arcu non metus lobortis eleifend. Phasellus sodales tortor id odio interdum, sit amet pharetra erat ullamcorper.",
      images: ["/api/submissions/image?imgPath=./data/eventImages/000000000000000000000004/000000000000000000000120/submission1.jpg"], // path to image on static image server?
      time: Date.now(),
      submitter: mongoose.Types.ObjectId('000000000000000000000004'),
      authors: [mongoose.Types.ObjectId('000000000000000000000004'), mongoose.Types.ObjectId('000000000000000000000003'), mongoose.Types.ObjectId('000000000000000000000005')],
      sectionEvent: mongoose.Types.ObjectId('000000000000000000000120'),
      location: {
        address: "110 8th St, Troy, NY 12180",
        description: "Rensselaer Polytechnic Institute",
        geo: {
          coordinates: [-73.6672966, 42.7306403]
        }
      }
    },
    submission2:{
      content: "Aenean venenatis sodales sollicitudin. Ut quis auctor tellus. Suspendisse eu dictum dolor, sed eleifend nisi. Sed sit amet odio eget felis scelerisque cursus eu id erat. Suspendisse volutpat magna libero, mattis semper justo aliquet sed. Suspendisse nisi neque, suscipit sit amet vehicula ut, luctus vitae diam. Vivamus congue orci sem, at mattis tortor sagittis id. Nullam malesuada diam nec mollis dictum. Suspendisse non turpis eu nunc auctor interdum. Nullam sollicitudin orci sapien, vitae bibendum nisi iaculis vitae. Nunc egestas porta ante non ullamcorper. Morbi odio ex, mattis a posuere at, tincidunt at turpis. Nullam quis maximus ipsum, a dapibus orci. Etiam vehicula ante non tincidunt fermentum. Nunc tristique sed ligula ac molestie.",
      images: ["/api/submissions/image?imgPath=./data/eventImages/000000000000000000000004/000000000000000000000120/submission2.jpg"], // path to image on static image server?
      time: Date.now(),
      submitter: mongoose.Types.ObjectId('000000000000000000000005'),
      authors: [mongoose.Types.ObjectId('000000000000000000000004'), mongoose.Types.ObjectId('000000000000000000000003'), mongoose.Types.ObjectId('000000000000000000000005')],
      sectionEvent: mongoose.Types.ObjectId('000000000000000000000120'),
      location: {
        address: "1600 Pennsylvania Ave NW, Washington, DC 20500",
        description: "White House",
        geo: {
          coordinates: [-77.0366, 38.8977]
        }
      }
    }
  }
}


// Create Users
module.exports.createUsers = function(){
  return User.find({}).removeAsync()
  .then(() => {
    var users = allUsers();

    return User.createAsync(users.test, users.admin, users.bob, users.travis, users.foo, users.kelly, users.jane)
  });
}


// Create Courses
module.exports.createCourses = function(){
  return Course.find({}).removeAsync()
  .then(() => {
    var courses = allCourses();

    return Course.createAsync(
      courses.netArt, courses.openSource, courses.robotics, courses.art, courses.imaging, courses.materials, courses.designStudio, courses.citiesLands)
  });
}

// Create Courses
module.exports.createSections = function(){
  return Section.find({}).removeAsync()
  .then(() => {
    var sections = allSections();

    return Section.createAsync(
    sections.netArt12, sections.netArt34, sections.openSource1, sections.robotics1, sections.art1, sections.art234, sections.imaging1234, sections.designStudio1, sections.citiesLands1 )
  });
}

// Create Events
module.exports.createEvents = function(){
  return Event.find({}).removeAsync()
  .then(() => {
    var events = allEvents();

    return Event.createAsync(events.concerts, events.dancing)

  });
}
// Create Section Events

module.exports.createSectionEvents = function(){
  return SectionEvent.find({}).removeAsync()
  .then(() => {
    var sectionEvents = allSectionEvents();

    return SectionEvent.createAsync( sectionEvents.netArt12Concerts, sectionEvents.netArt34Concerts, sectionEvents.openSource1Concerts, sectionEvents.imaging1234Concerts, sectionEvents.art1Dancing, sectionEvents.imaging1234Dancing, sectionEvents.netArt34Dancing )

  });
}

// Create Submissions
module.exports.createSubmissions = function(){
    return Submission.find({}).removeAsync()
      .then(() => {
        var submissions = allSubmissions();

        return Submission.createAsync(submissions.submission1, submissions.submission2);
      });

};

module.exports.seed = function(){
  module.exports.createUsers().then(() => {
        console.log('finished populating users');
      });
  module.exports.createCourses().then(() => {
        console.log('finished populating courses');
      });

  module.exports.createSections().then(() => {
      console.log('finished populating courses');
    });
  module.exports.createEvents().then(() => {
    console.log('finished populating events');
    });
  module.exports.createSectionEvents().then(() => {
    console.log('finished populating events');
    });
  module.exports.createSubmissions().then(() => {
    console.log("finished populating submissions");
  });
}

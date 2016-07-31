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
var _ = require('lodash');

var mongoose = require('mongoose');

function allUsers(){return {
  test: {
    provider: 'local',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'test',
    isVerified: true,
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000000'),
    preferences: {emailNotifyAheadMinutes: [30]},
  },
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
  bob: {
    provider: 'local',
    firstName: 'Bob',
    lastName: 'Dylan',
    email: 'bob@bob.com',
    password: 'bob',
    isVerified: true,
    isInstructor: true,
    _id: mongoose.Types.ObjectId('000000000000000000000002'),
    preferences: {emailNotifyAheadMinutes: [30]},
  },
  travis: {
    provider: 'local',
    firstName: 'Travis',
    lastName: 'Smith',
    email: 'travis@travis.com',
    password: 'travis',
    isVerified: true,
    isInstructor: true,
    _id: mongoose.Types.ObjectId('000000000000000000000003'),
    preferences: {emailNotifyAheadMinutes: [30]},
  },
  foo: {
    provider: 'local',
    firstName: 'Foo',
    lastName: 'Bar',
    email: 'foo@foo.com',
    password: 'foo',
    isVerified: true,
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000004'),
    preferences: {emailNotifyAheadMinutes: [30]},
  },
  kelly: {
    provider: 'local',
    firstName: 'Kelly',
    lastName: 'Simon',
    email: 'kelly@kelly.com',
    password: 'kelly',
    isVerified: true,
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000005'),
    preferences: {emailNotifyAheadMinutes: [30]},
  },
  jane: {
    provider: 'local',
    firstName: 'Jane',
    lastName: 'Eagle',
    email: 'jane@jane.com',
    password: 'jane',
    isVerified: true,
    isInstructor: false,
    _id: mongoose.Types.ObjectId('000000000000000000000006'),
    preferences: {emailNotifyAheadMinutes: [30]},
  },
  curt:{
    _id : mongoose.Types.ObjectId("111111111111111111111111"),
    provider : "local",
    firstName : "Curt",
    lastName : "Breneman",
    email : "curt@curt.com",
    password : "curt",
    isVerified: true,
    isInstructor : false,
    role : "user",
    preferences: {emailNotifyAheadMinutes: [30]},
  },
  venue:{
    _id : mongoose.Types.ObjectId("111111111111111111111112"),
    provider : "local",
    email : "venue@rpi.edu",
    password : "venue",
    isVerified: true,
    isInstructor : true,
    role : "admin",
    firstName : "Venue",
    lastName : "Team",
    preferences: {emailNotifyAheadMinutes: [30]},
  }


}
}

function allCourses(){return {
    netArt:{
      name: 'Net Art',
      department: "ARTS",
      imageURLs: ["https://images.unsplash.com/photo-1423768164017-3f27c066407f?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 2030,
      description: "Net Art is a hands-on studio course that uses the examination of the historical and theoretical aspects of Web-based art and virtual social spaces as a launching pad for individual student work. Considerable work at the conceptual level and a survey of Web-oriented software and programming enable students to create new works in net-based art.",
      semester: "Fall15",
      active: false,
      _id: mongoose.Types.ObjectId('000000000000000000000010'),
    },
    openSource:{
      name: "Introduction to Open Source",
      department: "CSCI",
      imageURLs: ["https://images.unsplash.com/photo-1454817481404-7e84c1b73b4a?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 2963,
      description: "The goal of this course is to provide a strong foundation in open source software development in preparation for jobs in industry or for more advanced courses. An important component of this course is participation in a community and contributing to an open source project. This course also provides an understanding of open source software tools and community, an understanding of open source licensing, an understanding of testing, version control, and open source software stacks. Students must come with a desire to learn new things, as well as the ability to adapt to open source tools and packages.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000011'),
    },
    robotics:{
      name: "Mestizo Robotics",
      department: "ARCH",
      imageURLs: ["https://images.unsplash.com/photo-1453282716202-de94e528067c?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 4968,
      description: "Students will participate in the development of an artistic academic project comprised of an interconnected spherical robotic community dispersed and developed by different research units throughout the Americas.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000012'),
    },
    art:{
      name: "Art, Community and Technology",
      department: "ARTS",
      imageURLs: ["https://images.unsplash.com/photo-1453106037972-08fbfe790762?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 4080,
      description: "Through direct experience in the community, this course explores the complex roles and relationships of art, education and technology, students will develop a plan to work with a media arts center, community organization or school; final teams will produce real-world arts and education projects that ultimately will be realized as significant additions to their professional portfolio.  The projects can include a range from traditional arts practice to creative writing, creative IT models to community art and activism. We will examine diverse case studies, with special focus on the development and sustainability of a new local media arts center in Troy, the Sanctuary for Independent Media.  Students from a wide interdisciplinary range of studies are encouraged to enroll: a strong interest in how you can integrate creativity into your own knowledge base, and a desire to do field work in the community, are all that is required.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000013'),
    },
    imaging:{
      name: "Media Studio: Imaging",
      department: "ARTS",
      imageURLs: ["https://images.unsplash.com/photo-1441986380878-c4248f5b8b5b?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 1020,
      description: "This course introduces students to digital photography, web design, and interactive multimedia in making art. Students broaden their understanding of such topics as composition, effective use of images, color theory, typography, and narrative flow. Inquiry and experimentation are encouraged, leading towards the development of the skill and techniques needed to create visual art with electronic media.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000014'),
    },
    materials:{
      name: "Materials and Design",
      department: "ARCH",
      imageURLs: ["https://images.unsplash.com/photo-1454047637795-79e3325dfa0e?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 2510,
      description: "This course establishes an understanding of the most common materials, their properties and resulting uses, and the implications of their uses in the larger context of material life cycles. The structural makeup of metals, ceramics, polymers, and composite materials is discovered and their resulting properties, costs, and life cycle consequences are clarified. An understanding of basic mechanical properties is established hands on by conducting tension, compression, and 3-point bending tests (mse-lab). Physical performance of material constructs as synergy between form and material properties is further illustrated. Experiments are conducted that introduce such major concepts as structural loading, properties of sections, and resulting system performance. Sustainability: The concept of life cycles is introduced; material and energy flows are tracked throughout the entire material life cycle. This will be accomplished alongside introducing major material groupings (metals, polymers, ceramics, and composites). Students come to realize that environmental concerns are directly related to structural composition and material availability. Consequences of resource extraction, distribution, manipulation, use, and disposal, reuse or recycle are addressed at both local and global scales. Selected field trips to materials extraction, processing, manufacturing, disposal, and recycling facilities are aimed to give physical meaning to the concept of life cycle.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000015'),
    },
    designStudio:{
      name: "Design Studio",
      department: "ARCH",
      imageURLs: ["https://images.unsplash.com/photo-1460626399219-57a00a2361cb?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 2200,
      description: "Design studio introducing students from all disciplines to general design through a series of short projects. The projects stress critical and creative thinking and invention, interdisciplinary collaboration, observation and perception, communication and visualization. Students will begin open-ended investigations using sketching, photography, model making, and computing.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000016'),
    },
    citiesLands:{
      name: "Cities/Lands",
      department: "ARCH",
      imageURLs: ["https://images.unsplash.com/photo-1438893761775-f1db119d27b2?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber: 4040,
      description: "This lecture-seminar is an examination of the parallel historical formation and operation of human settlements together with the territories associated with them, and the interrelations among them in Western Europe, North America, China, the Middle East, and North Africa. The purpose is to better understand the role spatial organization plays in the construction of social practices, human subjectivities, and technologies of power. While the differing paradigmatic notions of architectural and landscape practices will be explored in each cultural situation, the emphasis will be on the formative processes operating at all scales and among scales, and the more general design practices that have emerged, and could emerge, from these understandings.",
      semester: "Spring15",
      active: true,
      _id: mongoose.Types.ObjectId('000000000000000000000017'),
    },
    venue:{
      _id : mongoose.Types.ObjectId("222222222222222222222220"),
      department : "TEST",
      imageURLs: ["https://images.unsplash.com/photo-1451188502541-13943edb6acb?fm=jpg&dpr=0.75&h=500"], // url to image
      courseNumber : 1234,
      name : "Venue Testing",
      description : "This course is for testing new venue features.",
      active : true,
      semester : "Spring16",
      }
  }
}

function allSections(){ return {
    netArt12: {
      sectionNumbers: [1,2],
      enrollmentPolicy: "closed",
      _id:mongoose.Types.ObjectId('000000000000000000000120'),
      course : allCourses().netArt._id, //Net Art
      students : [allUsers().jane._id, allUsers().kelly._id, allUsers().foo._id], //Jane
      pendingStudents : [],
      instructors : [allUsers().bob._id] //Bob
    },
    netArt34: {
      sectionNumbers: [3,4,5],
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
    },
    venue1:{
      course : allCourses().venue._id, //Venue
      students : [allUsers().curt._id], //curt
      pendingStudents : [ ],
      instructors : [allUsers().venue._id ], //Venue
      sectionNumbers: [1],
      enrollmentPolicy: "open",
      _id:mongoose.Types.ObjectId('333333333333333333333330'),
    }
  }
}


function allEvents(){
  return {
      concerts:{
      title: "Art_X Concerts: Examine Intersections of Science, Art",
      description: "Faculty of the School of Humanities, Arts and Social Sciences (HASS) collaborate with the Center for Biotechnology and Interdisciplinary Studies (CBIS) and local Troy artists on two Art_X concerts to discover the art in science and the science in art.  The concerts, which will be held on Tuesday October 6 and October 20 at 4:30 pm in the CBIS Auditorium, are free and open to the RPI community. Following each concert, there will be a reception hosted by CBIS in the Gallery of the CBIS Auditorium.",
      imageURLs: ["http://news.rpi.edu/sites/default/files/cbis-news_0.jpeg"], // url to image
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      location: {
        address: "110 8th St, Troy, NY  12180, United States",
        description: "Empac",
        geo: {
          coordinates: [-73.6842041,42.7288898], // [<longitude>, <latitude>]
          type: "Point"
        },
        geobounds : {
          coordinates : [[[
            [
                 -73.6794438867554,
                42.731655780717645
            ],[
                -73.68399291324465,
                42.731655780717645
            ],[
              -73.68399291324465,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.731655780717645
            ]
          ]]],
          type : "MultiPolygon"
        },

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
      imageURLs: ["http://www.lhsdoi.com/wp-content/uploads/2014/04/photo-1-950x950.jpg"], // url to image
      author: allUsers().bob._id, //Bob
      creationDate: new Date("January 4, 2016 05:49:06"),
      location: {
        address: "110 8th St, Troy, NY  12180, United States",
        description: "Empac",
        geo: {
          coordinates: [-73.6842041,42.7288898], // [<longitude>, <latitude>]
          type: "Point"
        },
        geobounds : {
          coordinates : [[[
            [
                 -73.6794438867554,
                42.731655780717645
            ],[
                -73.68399291324465,
                42.731655780717645
            ],[
              -73.68399291324465,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.731655780717645
            ]
          ]]],
          type : "MultiPolygon"
        },

      },
      times: [{
          start: new Date("January 15, 2016 18:00:00"),
          end: new Date("January 15, 2016 20:00:00"),
      }],
      _id: mongoose.Types.ObjectId('000000000000000000000021')

    },
    medalReception:{
      _id : mongoose.Types.ObjectId("444444444444444444444440"),
      title : "National Medal of Science Reception",
      description : "President Shirley Ann Jackson named recipient of National Medal of Science, the nation‚Äôs highest honor in science and technology. The award recognizes individuals deserving of special recognition for their outstanding cumulative contributions to knowledge in the physical, biological, mathematical, engineering, or behavioral or social sciences, in service to the nation.",
      imageURLs : ["https://i.ytimg.com/vi/kKDpgJLh93o/maxresdefault.jpg"],
      author : allUsers().venue._id,
      times : [
        {
          start : "2016-01-21T23:00:00Z",
          end : "2016-01-22T03:00:00Z",
        }
      ],
      location : {
        address : "1150 22nd St NW, Washington, DC 20037, United States",
        description : "The Ritz-Carlton, Washington D.C.",
        geo : {
          coordinates : [
            -77.04907850000001,
            38.90471019999999
          ],
          type : "Point"
        },
        geobounds : {
          coordinates : [[[
            [
                 -73.6794438867554,
                42.731655780717645
            ],[
                -73.68399291324465,
                42.731655780717645
            ],[
              -73.68399291324465,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.731655780717645
            ]
          ]]],

          type : "MultiPolygon"
        },
        radius : 0.0005686283111572266
      }
    },
    medalGala:{
      _id : mongoose.Types.ObjectId("444444444444444444444441"),
      title : "National Medal of Science Black-tie Gala",
      description : "A gala to celebrate the amazing individuals who have won the highest science, technology, engineering, and mathematics award in the United States. Their achievements shape cultural revolutions, drive world economies, and change the face of life as we know it. Their stories will inspire the next generation.",
      imageURLs : ["http://www.officiallycrowned.org/wp-content/uploads/2015/10/Special-Occasions-Event-Planning-Revelry-Event-Designers-1.jpg"],
      creationDate : "2016-01-21T11:35:26.867Z",
      author : allUsers().venue._id,
      times : [
          {
            start : "2016-01-22T23:00:00Z",
            end : "2016-01-23T01:00:00Z",
          }
        ],
      location : {
        address : "1150 22nd St NW, Washington, DC 20037, United States",
        description : "The Ritz-Carlton, Washington D.C.",
        geo : {
          coordinates : [
              -77.04853702905513,
              38.90482343443286
          ],
          type : "Point"
        },
        geobounds : {
          coordinates : [[[
            [
                 -73.6794438867554,
                42.731655780717645
            ],[
                -73.68399291324465,
                42.731655780717645
            ],[
              -73.68399291324465,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.73007960926878
            ],[
                 -73.6794438867554,
                42.731655780717645
            ]
          ]]],
          type : "MultiPolygon"
        },
        radius : 0.0045490264892578125
      }
    }
  }
}

function allSectionEvents(){
  return{
    netArt12Concerts: {
      section: allSections().netArt12._id,//Net art sections 1,2
      course: allCourses().netArt._id,//Net art
      submissionInstructions:"Make sure to take a photo with the program.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001000')
    },
    netArt34Concerts: {
      section: allSections().netArt34._id,//Net art sections 3,4
      course: allCourses().netArt._id,//Net art
      submissionInstructions:"Make sure to take a photo in front of the building.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001001')
    },
    openSource1Concerts: {
      section: allSections().openSource1._id,//Introduction to Open Source sections 1
      course: allCourses().openSource._id,//Introduction to Open Source
      submissionInstructions:"Make sure to take a photo in front of the building.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001002')
    },
    imaging1234Concerts: {
      section: allSections().imaging1234._id,// Media Studio: Imaging section 1
      course: allCourses().imaging._id,//Media Studio: Imaging
      submissionInstructions:"Make sure to take a photo in front of the building.",
      author: allUsers().travis._id, //Travis
      creationDate: new Date("January 1, 2016 03:24:00"),
      info: allEvents().concerts._id,//Art_X Concerts: Examine Intersections of Science, Art
      _id: mongoose.Types.ObjectId('000000000000000000001003')
    },
    art1Dancing: {
      section: allSections().art1._id,// Art, Community and Technology section 1
      course: allCourses().art._id,//Art, Community and Technology
      submissionInstructions:"",
      author: allUsers().bob._id, //Bob
      creationDate: new Date("January 4, 2016 05:49:06"),
      info: allEvents().dancing._id,//Dancing Through the Years
      _id: mongoose.Types.ObjectId('000000000000000000001004')
    },
    imaging1234Dancing: {
      section:allSections().imaging1234._id,// Media Studio: Imaging section 1
      course: allCourses().imaging._id,//Media Studio: Imaging
      submissionInstructions:"",
      author: allUsers().bob._id, //Bob
      creationDate: new Date("January 4, 2016 05:49:06"),
      info: allEvents().dancing._id,//Dancing Through the Years
      _id: mongoose.Types.ObjectId('000000000000000000001005')
    },
    netArt34Dancing: {
      section: allSections().netArt34._id,//Net art sections 3,4
      course: allCourses().netArt._id,//Net art
      submissionInstructions:"",
      author: allUsers().bob._id, //Bob
      creationDate: new Date("January 4, 2016 05:49:06"),
      info: allEvents().dancing._id,//Dancing Through the Years
      _id: mongoose.Types.ObjectId('000000000000000000001006')
    },
    venue1medalReception:{
      _id : mongoose.Types.ObjectId("555555555555555555555550"),
      section : allSections().venue1._id,//venue section 1
      info : allEvents().medalReception._id,
      author : allUsers().venue._id,
      submissionInstructions : "Try to get a picture with President Shirley Ann Jackson!",
    },
    venue1medalGala:{
      _id : mongoose.Types.ObjectId("555555555555555555555551"),
      section : allSections().venue1._id,//venue section 1
      info : allEvents().medalGala._id,
      author : allUsers().venue._id,
      submissionInstructions : "Take a picture with the honorable Shirley Ann Jackson.",
    }

  }
}

function allSubmissions(){
  return {
    submission1:{
      _id : mongoose.Types.ObjectId("666666666666666666666661"),
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      images: ["/api/submissions/image?imgPath=./data/eventImages/000000000000000000000004/000000000000000000001000/submission1.jpg"], // path to image on static image server?
      time: Date.now(),
      submitter: allUsers().foo._id,
      authors: [allUsers().foo._id, allUsers().kelly._id, allUsers().jane._id],
      sectionEvent: allSectionEvents().netArt12Concerts._id,
      location: {
        geo: {
          coordinates: [
               -73.6794438867554,
              42.731655780717645
          ],
          type: "Point"
        }
      }
    },
    submission2:{
      content: "Aenean venenatis sodales sollicitudin. Ut quis auctor tellus. Suspendisse eu dictum dolor, sed eleifend nisi. Sed sit amet odio eget felis scelerisque cursus eu id erat. Suspendisse volutpat magna libero, mattis semper justo aliquet sed. Suspendisse nisi neque, suscipit sit amet vehicula ut, luctus vitae diam. Vivamus congue orci sem, at mattis tortor sagittis id. Nullam malesuada diam nec mollis dictum. Suspendisse non turpis eu nunc auctor interdum. Nullam sollicitudin orci sapien, vitae bibendum nisi iaculis vitae. Nunc egestas porta ante non ullamcorper. Morbi odio ex, mattis a posuere at, tincidunt at turpis. Nullam quis maximus ipsum, a dapibus orci. Etiam vehicula ante non tincidunt fermentum. Nunc tristique sed ligula ac molestie.",
      images: ["/api/submissions/image?imgPath=./data/eventImages/000000000000000000000004/000000000000000000001000/submission2.jpg"], // path to image on static image server?
      time: Date.now(),
      submitter: allUsers().kelly._id,
      authors: [allUsers().foo._id, allUsers().jane._id, allUsers().kelly._id],
      sectionEvent: allSectionEvents().netArt12Concerts._id,
      location: {
        geo: {
          coordinates: [
               -73.6794438867554,
              42.731655780717645
          ],
          type: "Point"
        }
      }
    },
    submission3:{
      content: "Cu partem officiis sed, est ex dicit tacimates honestatis, id eam libris facilis singulis. Case tota virtute his cu. Illud fierent accusata mel at, qui ne nemore vivendo legendos. Eripuit aliquid consequat pro eu.",
      images: ["/api/submissions/image?imgPath=./data/eventImages/000000000000000000000006/000000000000000000001000/submission1.jpg"], // path to image on static image server?
      time: Date.now(),
      submitter: allUsers().jane._id,
      authors: [allUsers().foo._id, allUsers().jane._id, allUsers().kelly._id],
      sectionEvent: allSectionEvents().netArt12Concerts._id,
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


// Create Users
module.exports.createUsers = function(){
  return User.find({}).removeAsync()
  .then(() => {
    return User.createAsync(_.values(allUsers()));
  });
}


// Create Courses
module.exports.createCourses = function(){
  return Course.find({}).removeAsync()
  .then(() => {
    return Course.createAsync(_.values(allCourses()));
  });
}

// Create Courses
module.exports.createSections = function(){
  return Section.find({}).removeAsync()
  .then(() => {
    return Section.createAsync(_.values(allSections()));
  });
}

// Create Events
module.exports.createEvents = function(){
  return Event.find({}).removeAsync()
  .then(() => {
    return Event.createAsync(_.values(allEvents()));

  });
}
// Create Section Events

module.exports.createSectionEvents = function(){
  return SectionEvent.find({}).removeAsync()
  .then(() => {
    return SectionEvent.createAsync(_.values(allSectionEvents()));

  });
}

// Create Submissions
module.exports.createSubmissions = function(){
  return Submission.find({}).removeAsync()
  .then(() => {
    return Submission.createAsync(_.values(allSubmissions()));
  });
};

module.exports.exampleInstructor = allUsers().bob;
module.exports.exampleStudent = allUsers().foo;
module.exports.exampleSubmission = allSubmissions().submission1;
module.exports.exampleSectionEvent = allSectionEvents().netArt12Concerts;
module.exports.exampleSection = allSections().netArt12;
module.exports.exampleEvent = allEvents().concert;
module.exports.exampleCourse = allCourses().netArt;

module.exports.seed = function(){
    return Promise.all([
        module.exports.createUsers().then(() => {
            console.log('finished populating users');
            return Promise.resolve();
        }),
        module.exports.createCourses().then(() => {
            console.log('finished populating courses');
            return Promise.resolve();
        }),
        module.exports.createSections().then(() => {
            console.log('finished populating courses');
            return Promise.resolve();
        }),
        module.exports.createEvents().then(() => {
            console.log('finished populating events');
            return Promise.resolve();
        }),
        module.exports.createSectionEvents().then(() => {
            console.log('finished populating events');
            return Promise.resolve();
        }),
        module.exports.createSubmissions().then(() => {
            console.log("finished populating submissions");
            return Promise.resolve();
        })
    ]);
}

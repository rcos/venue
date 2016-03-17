# API Documentation

This guide is intended to quickly get a developer interested in integrating with
venue the necessary API endpoints and information to quickly integrate.

Each endpoint performs operations or retrieves information from a resource, typically
additional GET parameters can be specified to retrieve additional information from
the resources.

**TODO Currently only GET and POST endpoints are documented**

## Logging In

`/auth/local` - Returns token for authenticated calls with the API, requires that the X-XSRF and XSRF token, a session id and binary body consisting of a JSON object with `email` and `password`.

Example Request (curl)
```curl
curl 'http://localhost:9000/auth/local' -H 'X-XSRF-TOKEN: WU2uDVQKKNhZfCzy8dvADO1oTn/zXxyu819k0=' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'Referer: http://localhost:9000/login' -H 'Cookie: connect.sid=s%3AmCqPCCDugWX3MH1s087InB9hBQ67svne.rTffJTyrYUDc3ZysHXJkcF572ENDv77FsbA5dTudUqU; XSRF-TOKEN=WU2uDVQKKNhZfCzy8dvADO1oTn%2FzXxyu819k0%3D' --data-binary '{"email":"foo@foo.com","password":"foo"}'
```

Example Request (breakdown)  
Destination: `http://localhost:9000/auth/local`  
Header `X-XSRF-TOKEN` `WU2uDVQKKNhZfCzy8dvADO1oTn/zXxyu819k0=`  
Header `Content-Type` `application/json;charset=UTF-8`  
Header `Accept` `application/json, text/plain, */*`  
Header `Referer` `http://localhost:9000/login`  
Cookie `connect.sid=s%3AmCqPCCDugWX3MH1s087InB9hBQ67svne.rTffJTyrYUDc3ZysHXJkcF572ENDv77FsbA5dTudUqU;`  
Cookie `XSRF-TOKEN=WU2uDVQKKNhZfCzy8dvADO1oTn%2FzXxyu819k0%3D`  
Data `{"email":"foo@foo.com","password":"foo"}`  

Example Response
```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDQiLCJyb2xlIjoidXNlciIsImlhdCI6MTQ1MzE0MTQ0MywiZXhwIjoxNDUzMTU5NDQzfQ.v0jXDvYAXBDAcMb-nKa6ARgHkTMQ-B9cyBSgjP-gcEI"
}
```

Future requests that require Authorization should put `Authorization: Bearer <token>` in their header, see the example below.

```Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDQiLCJyb2xlIjoidXNlciIsImlhdCI6MTQ1MzE0MTkzNiwiZXhwIjoxNDUzMTU5OTM2fQ.sloYvGS4_B2htipK3_vWpj8oC_cQxYDvCIjPV6xQ9Wo```


## User API

`GET /api/users` ** Admin Only **  - Retrieves list of users and ids, this can be used for searching
users or displaying the list of users who are on the site. **Only active users
are shown**.


`GET /api/users/:id` **Authenticated** - Returns information regarding user with id

Can be called with the following GET parameters for additional information: `withSections`, `withEvents`, `withSectionsCourse`, `withCourses`

Example Response:
```javascript
// GET /api/users/<id>
{
  "_id": "000000000000000000000004",
  "provider": "local",
  "firstName": "Foo",
  "lastName": "Bar",
  "email": "foo@foo.com",
  "isInstructor": false,
  "__v": 0,
  "role": "user"
}
```

```javascript
// GET /api/users/<id>?withCourses

{
  "_id": "000000000000000000000004",
  "provider": "local",
  "firstName": "Foo",
  "lastName": "Bar",
  "email": "foo@foo.com",
  "isInstructor": false,
  "__v": 0,
  "role": "user",
  "courses": [
    {
      "_id": "000000000000000000000010",
      "name": "Net Art",
      "department": "ARTS",
      "courseNumber": 2030,
      "description": "Net Art is a hands-on studio course that uses the examination of the historical and theoretical aspects of Web-based art and virtual social spaces as a launching pad for individual student work. Considerable work at the conceptual level and a survey of Web-oriented software and programming enable students to create new works in net-based art.",
      "semester": "Fall15",
      "active": false,
      "__v": 0
    },
    {
      "_id": "000000000000000000000011",
      "name": "Introduction to Open Source",
      "department": "CSCI",
      "courseNumber": 2963,
      "description": "The goal of this course is to provide a strong foundation in open source software development in preparation for jobs in industry or for more advanced courses. An important component of this course is participation in a community and contributing to an open source project. This course also provides an understanding of open source software tools and community, an understanding of open source licensing, an understanding of testing, version control, and open source software stacks. Students must come with a desire to learn new things, as well as the ability to adapt to open source tools and packages.",
      "semester": "Spring15",
      "active": true,
      "__v": 0
    },
    {
      "_id": "000000000000000000000012",
      "name": "Mestizo Robotics",
      "department": "ARCH",
      "courseNumber": 4968,
      "description": "Students will participate in the development of an artistic academic project comprised of an interconnected spherical robotic community dispersed and developed by different research units throughout the Americas.",
      "semester": "Spring15",
      "active": true,
      "__v": 0
    },
    {
      "_id": "000000000000000000000013",
      "name": "Art, Community and Technology",
      "department": "ARTS",
      "courseNumber": 4080,
      "description": "Through direct experience in the community, this course explores the complex roles and relationships of art, education and technology, students will develop a plan to work with a media arts center, community organization or school; final teams will produce real-world arts and education projects that ultimately will be realized as significant additions to their professional portfolio.  The projects can include a range from traditional arts practice to creative writing, creative IT models to community art and activism. We will examine diverse case studies, with special focus on the development and sustainability of a new local media arts center in Troy, the Sanctuary for Independent Media.  Students from a wide interdisciplinary range of studies are encouraged to enroll: a strong interest in how you can integrate creativity into your own knowledge base, and a desire to do field work in the community, are all that is required.",
      "semester": "Spring15",
      "active": true,
      "__v": 0
    },
    {
      "_id": "000000000000000000000014",
      "name": "Media Studio: Imaging",
      "department": "ARTS",
      "courseNumber": 1020,
      "description": "This course introduces students to digital photography, web design, and interactive multimedia in making art. Students broaden their understanding of such topics as composition, effective use of images, color theory, typography, and narrative flow. Inquiry and experimentation are encouraged, leading towards the development of the skill and techniques needed to create visual art with electronic media.",
      "semester": "Spring15",
      "active": true,
      "__v": 0
    }
  ]
}
```

```javascript
// GET /api/users/<id>?withSections=true

{
  "_id": "000000000000000000000004",
  "provider": "local",
  "firstName": "Foo",
  "lastName": "Bar",
  "email": "foo@foo.com",
  "isInstructor": false,
  "__v": 0,
  "role": "user",
  "sections": [
    {
      "_id": "000000000000000000000220",
      "enrollmentPolicy": "closed",
      "course": "000000000000000000000010",
      "__v": 0,
      "sectionNumbers": [
        3,
        4
      ],
      "pendingStudents": [],
      "students": [
        "000000000000000000000004"
      ],
      "instructors": [
        "000000000000000000000002"
      ]
    },
    {
      "_id": "000000000000000000000121",
      "course": "000000000000000000000011",
      "enrollmentPolicy": "approvalRequired",
      "__v": 0,
      "sectionNumbers": [
        1
      ],
      "pendingStudents": [
        "000000000000000000000006"
      ],
      "students": [
        "000000000000000000000004"
      ],
      "instructors": [
        "000000000000000000000002"
      ]
    },
    {
      "_id": "000000000000000000000122",
      "course": "000000000000000000000012",
      "enrollmentPolicy": "approvalRequired",
      "__v": 0,
      "sectionNumbers": [
        1
      ],
      "pendingStudents": [],
      "students": [
        "000000000000000000000004",
        "000000000000000000000005"
      ],
      "instructors": [
        "000000000000000000000003",
        "000000000000000000000002"
      ]
    },
    {
      "_id": "000000000000000000000223",
      "course": "000000000000000000000013",
      "enrollmentPolicy": "open",
      "__v": 0,
      "sectionNumbers": [
        2,
        3,
        4
      ],
      "pendingStudents": [],
      "students": [
        "000000000000000000000004"
      ],
      "instructors": [
        "000000000000000000000002"
      ]
    },
    {
      "_id": "000000000000000000000124",
      "course": "000000000000000000000014",
      "enrollmentPolicy": "closed",
      "__v": 0,
      "sectionNumbers": [
        1,
        2,
        3,
        4
      ],
      "pendingStudents": [],
      "students": [
        "000000000000000000000004",
        "000000000000000000000005",
        "000000000000000000000006"
      ],
      "instructors": [
        "000000000000000000000003"
      ]
    }
  ]
}
```

```javascript
// GET /api/users/<id>?withEvents=true

{
  "_id": "000000000000000000000004",
  "provider": "local",
  "firstName": "Foo",
  "lastName": "Bar",
  "email": "foo@foo.com",
  "isInstructor": false,
  "__v": 0,
  "role": "user",
  "events": [
    {
      "_id": "000000000000000000001001",
      "section": "000000000000000000000220",
      "additionalNotes": "Make sure to take a photo in front of the building.",
      "author": "000000000000000000000003",
      "creationDate": "2016-01-01T08:24:00.000Z",
      "info": {
        "_id": "000000000000000000000020",
        "title": "Art_X Concerts: Examine Intersections of Science, Art",
        "description": "Faculty of the School of Humanities, Arts and Social Sciences (HASS) collaborate with the Center for Biotechnology and Interdisciplinary Studies (CBIS) and local Troy artists on two Art_X concerts to discover the art in science and the science in art.  The concerts, which will be held on Tuesday October 6 and October 20 at 4:30 pm in the CBIS Auditorium, are free and open to the RPI community. Following each concert, there will be a reception hosted by CBIS in the Gallery of the CBIS Auditorium.",
        "imageURL": "http://news.rpi.edu/sites/default/files/cbis-news_0.jpeg",
        "author": "000000000000000000000003",
        "creationDate": "2016-01-01T08:24:00.000Z",
        "__v": 0,
        "times": [
          {
            "start": "2016-01-20T23:00:00.000Z",
            "end": "2016-01-21T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e8"
          },
          {
            "start": "2016-01-22T23:00:00.000Z",
            "end": "2016-01-23T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e7"
          }
        ],
        "location": {
          "address": "110 8th St, Troy, NY  12180, United States",
          "description": "Empac",
          "geo": {
            "coordinates": [
              42.7288898,
              -73.6842041
            ],
            "type": "Point"
          }
        }
      },
      "__v": 0
    },
    {
      "_id": "000000000000000000001002",
      "section": "000000000000000000000121",
      "additionalNotes": "Make sure to take a photo in front of the building.",
      "author": "000000000000000000000003",
      "creationDate": "2016-01-01T08:24:00.000Z",
      "info": {
        "_id": "000000000000000000000020",
        "title": "Art_X Concerts: Examine Intersections of Science, Art",
        "description": "Faculty of the School of Humanities, Arts and Social Sciences (HASS) collaborate with the Center for Biotechnology and Interdisciplinary Studies (CBIS) and local Troy artists on two Art_X concerts to discover the art in science and the science in art.  The concerts, which will be held on Tuesday October 6 and October 20 at 4:30 pm in the CBIS Auditorium, are free and open to the RPI community. Following each concert, there will be a reception hosted by CBIS in the Gallery of the CBIS Auditorium.",
        "imageURL": "http://news.rpi.edu/sites/default/files/cbis-news_0.jpeg",
        "author": "000000000000000000000003",
        "creationDate": "2016-01-01T08:24:00.000Z",
        "__v": 0,
        "times": [
          {
            "start": "2016-01-20T23:00:00.000Z",
            "end": "2016-01-21T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e8"
          },
          {
            "start": "2016-01-22T23:00:00.000Z",
            "end": "2016-01-23T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e7"
          }
        ],
        "location": {
          "address": "110 8th St, Troy, NY  12180, United States",
          "description": "Empac",
          "geo": {
            "coordinates": [
              42.7288898,
              -73.6842041
            ],
            "type": "Point"
          }
        }
      },
      "__v": 0
    },
    {
      "_id": "000000000000000000001003",
      "section": "000000000000000000000124",
      "additionalNotes": "Make sure to take a photo in front of the building.",
      "author": "000000000000000000000003",
      "creationDate": "2016-01-01T08:24:00.000Z",
      "info": {
        "_id": "000000000000000000000020",
        "title": "Art_X Concerts: Examine Intersections of Science, Art",
        "description": "Faculty of the School of Humanities, Arts and Social Sciences (HASS) collaborate with the Center for Biotechnology and Interdisciplinary Studies (CBIS) and local Troy artists on two Art_X concerts to discover the art in science and the science in art.  The concerts, which will be held on Tuesday October 6 and October 20 at 4:30 pm in the CBIS Auditorium, are free and open to the RPI community. Following each concert, there will be a reception hosted by CBIS in the Gallery of the CBIS Auditorium.",
        "imageURL": "http://news.rpi.edu/sites/default/files/cbis-news_0.jpeg",
        "author": "000000000000000000000003",
        "creationDate": "2016-01-01T08:24:00.000Z",
        "__v": 0,
        "times": [
          {
            "start": "2016-01-20T23:00:00.000Z",
            "end": "2016-01-21T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e8"
          },
          {
            "start": "2016-01-22T23:00:00.000Z",
            "end": "2016-01-23T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e7"
          }
        ],
        "location": {
          "address": "110 8th St, Troy, NY  12180, United States",
          "description": "Empac",
          "geo": {
            "coordinates": [
              42.7288898,
              -73.6842041
            ],
            "type": "Point"
          }
        }
      },
      "__v": 0
    },
    {
      "_id": "000000000000000000001005",
      "section": "000000000000000000000124",
      "additionalNotes": "",
      "author": "000000000000000000000002",
      "creationDate": "2016-01-04T10:49:06.000Z",
      "info": {
        "_id": "000000000000000000000021",
        "title": "Dancing Through the Years",
        "description": "Judson Laipply dances the last 50 years.",
        "imageURL": "http://www.lhsdoi.com/wp-content/uploads/2014/04/photo-1-950x950.jpg",
        "author": "000000000000000000000002",
        "creationDate": "2016-01-04T10:49:06.000Z",
        "__v": 0,
        "times": [
          {
            "start": "2016-01-15T23:00:00.000Z",
            "end": "2016-01-16T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e9"
          }
        ],
        "location": {
          "address": "110 8th St, Troy, NY  12180, United States",
          "description": "Empac",
          "geo": {
            "coordinates": [
              42.7288898,
              -73.6842041
            ],
            "type": "Point"
          }
        }
      },
      "__v": 0
    },
    {
      "_id": "000000000000000000001006",
      "section": "000000000000000000000220",
      "additionalNotes": "",
      "author": "000000000000000000000002",
      "creationDate": "2016-01-04T10:49:06.000Z",
      "info": {
        "_id": "000000000000000000000021",
        "title": "Dancing Through the Years",
        "description": "Judson Laipply dances the last 50 years.",
        "imageURL": "http://www.lhsdoi.com/wp-content/uploads/2014/04/photo-1-950x950.jpg",
        "author": "000000000000000000000002",
        "creationDate": "2016-01-04T10:49:06.000Z",
        "__v": 0,
        "times": [
          {
            "start": "2016-01-15T23:00:00.000Z",
            "end": "2016-01-16T01:00:00.000Z",
            "_id": "56970b8756408ff04b4a31e9"
          }
        ],
        "location": {
          "address": "110 8th St, Troy, NY  12180, United States",
          "description": "Empac",
          "geo": {
            "coordinates": [
              42.7288898,
              -73.6842041
            ],
            "type": "Point"
          }
        }
      },
      "__v": 0
    }
  ]
}
```

`POST /api/users` - Creates a user account, this is called on sign-up.  
Request returns a javascript web token.

Example Request:
```javascript
// POST /api/users/

{
  name: "John Doe",
  email: "John@Doe.com",
  password: "password",
  isInstructor: false
}
```

Example Response:
```javascript

{
  $promise: {Promise Object},
  $resolved: true,
  token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjljNGUzNDllMzM0YzZiNTNjMjYzOTEiLCJpYXQiOjE0NTMwODQyMTIsImV4cCI6MTQ1MzEwMjIxMn0.9z6Akq-MtU6MV4GHSU5lVCbW3WWSRp5aQ0SPr4lXfvo"
}
```


## Courses API

`GET /api/courses/:id` - Returns course information with supplied id

Accepts the following GET parameters for additional information: `withSections`, `withSectionInstructors`, `withSectionEnrollmentStatus & studentid`

Example Response:

```javascript
//GET /api/courses/<courseid>?studentid=<studentid>&withSectionEnrollmentStatus=true&withSectionInstructors=true&withSections=true

{
  "_id": "000000000000000000000010",
  "name": "Net Art",
  "department": "ARTS",
  "courseNumber": 2030,
  "description": "Net Art is a hands-on studio course that uses the examination of the historical and theoretical aspects of Web-based art and virtual social spaces as a launching pad for individual student work. Considerable work at the conceptual level and a survey of Web-oriented software and programming enable students to create new works in net-based art.",
  "semester": "Fall15",
  "active": false,
  "__v": 0,
  "sections": [
    {
      "_id": "000000000000000000000120",
      "enrollmentPolicy": "closed",
      "course": "000000000000000000000010",
      "__v": 0,
      "sectionNumbers": [
        1,
        2
      ],
      "pendingStudents": [],
      "students": [
        "000000000000000000000006"
      ],
      "instructors": [
        {
          "_id": "000000000000000000000002",
          "salt": "9Ybee4j3VZaEML4EPAVa7w==",
          "provider": "local",
          "firstName": "Bob",
          "lastName": "Dylan",
          "email": "bob@bob.com",
          "password": "+xW0uCpS9QJinRrfZ6eXGkaVQPy4AD6AhnA1lKY1tAALmmMdyJ8ELN2UAXqI3ZPS/O7m7+4W9G1BOKZiTQW9nA==",
          "isInstructor": true,
          "__v": 0,
          "role": "user"
        }
      ],
      "isEnrolled": false
    },
    {
      "_id": "000000000000000000000220",
      "enrollmentPolicy": "closed",
      "course": "000000000000000000000010",
      "__v": 0,
      "sectionNumbers": [
        3,
        4
      ],
      "pendingStudents": [],
      "students": [
        "000000000000000000000004"
      ],
      "instructors": [
        {
          "_id": "000000000000000000000002",
          "salt": "9Ybee4j3VZaEML4EPAVa7w==",
          "provider": "local",
          "firstName": "Bob",
          "lastName": "Dylan",
          "email": "bob@bob.com",
          "password": "+xW0uCpS9QJinRrfZ6eXGkaVQPy4AD6AhnA1lKY1tAALmmMdyJ8ELN2UAXqI3ZPS/O7m7+4W9G1BOKZiTQW9nA==",
          "isInstructor": true,
          "__v": 0,
          "role": "user"
        }
      ],
      "isEnrolled": true
    }
  ]
}
```

`POST /api/courses` **Authenticated** - Creates a course if user is an instructor.    
Request returns the course object.

Example Request:
```javascript
// POST /api/courses/

{
  department: "CSCI",
  courseNumber: "4100",
  name: "Machine Learning",
  description: "Learn about machines!"
}
```

Example Response:
```javascript

{
  $promise: {Promise Object},
  $resolved: true,
  __v: 0,
  _id: "569c4f929e334c6b53c26392",
  active: true,
  courseNumber: 4100,
  department: "CSCI",
  description: "Learn about machines!",
  name: "Machine Learning",
  semester: "Spring16"
}
```

## Section API

`GET /api/sections?onlyUser=me` or `GET /api/sections?onlyCurrentUser=true` **Authenticated** - Gets the sections for the current user  
`GET /api/sections?onlyUser=:id` **Authenticated** - Gets the sections for a user  
`GET /api/sections` - Gets all sections  

Request returns an array of section objects.

If you add withSectionsEvent, withSectionsCourse, withSectionsInstructors, withSectionsStudents, or withSectionsPendingStudents to the parameters, it will return with the appropriate fields populated.

`POST /api/sections` **Authenticated** - Creates a section within a course if user is an instructor.  
Request returns the section object.

Example Request:
```javascript
// POST /api/sections/

{
  course: "000000000000000000000010",
  enrollmentPolicy: "open",
  instructors: ["000000000000000000000002"],
  sectionNumbers: [5, 6, 7]
}
```

Example Response:
```javascript

{
  $promise: {Promise Object}
  $resolved: true,
  __v: 0,
  _id: "569c50ab9e334c6b53c26394",
  course: "000000000000000000000010",
  enrollmentPolicy: "open",
  instructors: ["000000000000000000000002"],
  pendingStudents:["000000000000000000000005"]
  sectionNumbers: [5, 6, 7]
  students: ["000000000000000000000007", "000000000000000000000008"]
}
```


## Submission API


`GET /api/submissions` **Authenticated** - Gets all the submissions.  If `onlyInstructor=me` or `onlyInstructor=:userId` are specified, it will return only the submissions pertaining to the particular instructor specified by me or :userId. Likewise is `onlyStudent=me` or `onlyStudent=:userId` for students.  If `onlySection=:sectionId` is specified or `onlySectionEvent=:sectionEventId` is specified, only the submission related to the appropriate section or section event are returned.


Unless specified using `withStudents=false` and `withSectionEvent=false`, students and section events will be automatically populated.  If section events are populated, event info will also be, unless specified to not be returned with `withEventInfo=false`. If `onlyNumber=true` is specified, only the number of submissions fitting the criteria is returned.

Request returns array of submission objects unless `onlyNumber=true` is specified.


`POST /api/submissions` **Authenticated** - Creates a submission for a given section event.  The file(s) are sent along with 'data' in a HTML form using the multipart/form-data encoding.
Request returns the submission object.


Example Request:
```javascript
// POST /api/submissions/

data: {
  userId: '000000000000000000000005',
  eventId: '000000000000000000001005',
  authors: ['000000000000000000000006', '000000000000000000000007', '000000000000000000000004', '000000000000000000000008'],
  coordinates: [ '-73.6672827', '42.730635299999996' ],
  content: 'Content goes here',
  title: 'Some Title'
}
```
Example Response:
```javascript

{
  images: [ './data/eventImages/000000000000000000000005/000000000000000000001005'],
  authors: ['000000000000000000000006', '000000000000000000000007', '000000000000000000000004', '000000000000000000000008'],  
  sectionEvent: [ "000000000000000000001005" ],
  location: { geo: { type: 'Point', coordinates: [Object] } },
  _id: "569c598f04045bb15b5b6a1d",
  content: 'Content goes here',
  time: Sun Jan 17 2016 22:18:39 GMT-0500 (EST),
  submitter: "000000000000000000000005",
  __v: 0
}
```

## Section Event API
`GET /api/sectionevents` **Authenticated** - Gets all the section events.  If `onlyAuthor=me` or `onlyAuthor=:userId` are specified, it will return only the submissions pertaining to the particular author specified by me or :userId.  If `onlySection=:sectionId` is specified or `onlyEvent=:eventInfoId` are specified, only the submission related to the appropriate section or event info are returned. If `onlyUserSections=me` or `onlyUserSections=:userId` are specified, then only the section events for the sections where the particular user specified by me or :userId are a student or instructor are returned.


Unless specified using `withEventInfo=false` and `withAuthor=false`, event info and the author will be automatically populated.  If `withSection=true` is specified, the section will be populated, and unless `withCourse=false` the course will be populated as well. If `onlyNumber=true` is specified, only the number of submissions fitting the criteria is returned.

Request returns array of submission objects unless `onlyNumber=true` is specified.

#### Coming Soon
** TODO **

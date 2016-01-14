# API Documentation

This guide is intended to quickly get a developer interested in integrating with
venue the necessary API endpoints and information to quickly integrate.

Each endpoint performs operations or retrieves information from a resource, typically
additional GET parameters can be specified to retrieve additional information from
the resources.

**TODO Currently only GET endpoints are documented**

## Connecting to the API

** TODO **

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

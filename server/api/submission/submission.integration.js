'use strict';

var app = require('../..');
var request = require('supertest');
var User = require('../user/user.model')
var newSubmission;
var auth = require("../../auth/local/test.integration");
var superwith = require("../superwith.integration");

var seed = require('../../config/seed');
var exampleSectionEvent = seed.exampleSectionEvent;
var exampleStudent = seed.exampleStudent;
var exampleInstructor = seed.exampleInstructor;
var exampleSubmission = seed.exampleSubmission;
import {validLocations, badLocations} from './testassets';

describe('Submission API:', function() {

  describe('GET /api/submissions', function() {
    var submissions;

    beforeEach(function(done) {
      auth.instructor.request(app)
        .get('/api/submissions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          submissions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(submissions).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/submissions', function() {

    beforeEach(function(done) {
      auth.student.request(app)
      .post('/api/submissions')
      .type('form')
      .field('userId', exampleStudent._id.toString())
      .field('eventId', exampleSectionEvent._id.toString())
      .field('coordinates[0]', 0)
      .field('coordinates[1]', 1)
      .field('content', 'This is the brand new submission!!!')
      .attach('files[0]', './client/assets/images/empac.jpg')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        newSubmission = res.body;
        done();
      });

    });

    it('should respond with the newly created submission', function() {
      expect(newSubmission.content).to.equal('This is the brand new submission!!!');
      expect(newSubmission.submitter).to.equal(exampleStudent._id.toString());
      expect(newSubmission.images).to.have.length(1);
    });

  });

  describe('GET /api/submissions/:id', function() {
    var submission;

    beforeEach(function(done) {
      auth.student.request(app)
        .get('/api/submissions/' + newSubmission._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          submission = res.body;
          done();
        });
    });

    it('should respond with the requested submission', function() {
      expect(submission.content).to.equal('This is the brand new submission!!!');
    });

  });

  describe('GET /api/submissions with options', function() {

      var populationOptions = [
          {
              param: "withStudents=true",
              should: "populate submitter and authors",
              test: (subs) => {
                  expect(subs[0].submitter).to.have.property("_id");
                  expect(subs[0].authors[0]).to.have.property("_id");
              }
          },
          {
              param: "withSectionEvent=true",
              should: "include associated section event",
              test: (subs) => {
                  expect(subs[0].sectionEvent).to.have.property("_id");
              },
              params: [
                  {
                      param: "withSection=true",
                      should: "",
                      test: (subs) => {
                          expect(subs[0].sectionEvent.section).to.have.property("_id");
                      },
                      params: [
                          {
                              param: "withSectionCourse=true",
                              should: "",
                              test: (subs) => {
                                  expect(subs[0].sectionEvent.section.course).to.have.property("_id");
                              }
                          },
                          {
                              param: "withEventInfo=true",
                              should: "",
                              test: (subs) => {
                                  expect(subs[0].sectionEvent.info).to.have.property("_id");
                              }
                          }
                      ]
                  }
              ]
          }
      ];
      superwith.test(auth.student.request(app), `/api/submissions`, populationOptions);
      superwith.test(auth.student.request(app), `/api/submissions`, [
          {
              param: `onlyInstructor=${exampleInstructor._id}`,
              should: 'only return submissions for this instructor',
              skip: true, // TODO remove
              test: (subs) => {
                  var sectionEventId = subs[0].sectionEvent._id ? subs[0].sectionEvent._id : subs[0].sectionEvent;
                  // TODO make sure the sectionEvent is from a course taught by the instructor
              },
              params: populationOptions
          }
      ]);
      superwith.test(auth.student.request(app), `/api/submissions`, [
          {
              param: `onlyStudent=${exampleStudent._id}`,
              should: 'only return submissions for this instructor',
              skip: true, // TODO remove
              test: (subs) => {
                  var sectionEventId = subs[0].sectionEvent._id ? subs[0].sectionEvent._id : subs[0].sectionEvent;
                  // TODO make sure the sectionEvent is from a course taught by the instructor
              },
              params: populationOptions
          }
      ]);
      superwith.test(auth.student.request(app), `/api/submissions`, [
          {
              param: `onlySectionEvent=${exampleSectionEvent._id}`,
              should: 'only return submissions for this section event',
              test: (subs) => {
                  var sectionEventId = subs[0].sectionEvent._id ? subs[0].sectionEvent._id : subs[0].sectionEvent;
                  expect(sectionEventId).to.equal(exampleSectionEvent._id.toString())
              },
              params: populationOptions
          }
      ]);
  });

  describe('PUT /api/submissions/:id', function() {
    var updatedSubmission

    beforeEach(function(done) {
      auth.student.request(app)
        .put('/api/submissions/' + newSubmission._id)
        .send({
          content: 'This is the updated submission!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSubmission = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSubmission = {};
    });

    it('should respond with the updated submission', function() {
      expect(updatedSubmission.content).to.equal('This is the updated submission!!!');
    });

  });

  describe('DELETE /api/submissions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
        auth.student.request(app)
        .delete('/api/submissions/' + newSubmission._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when submission does not exist', function(done) {
      auth.instructor.request(app)
        .delete('/api/submissions/' + newSubmission._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

  describe("valid submission tests", () => {

    var course = seed.allCourses().netArt;
    var section = seed.allSections().netArt12;
    var info = seed.allEvents().concerts;
    var sectionEvent = seed.allSectionEvents().netArt12Concerts;

    describe("passing validation", () => {

      validLocations.forEach((validLocation) => {
        let newSubmission;

        before((done)=>{
          auth.student.request(app)
          .post('/api/submissions')
          .type('form')
          .field('userId', exampleStudent._id.toString())
          .field('eventId', exampleSectionEvent._id.toString())
          .field('coordinates[0]', validLocation.coordinates[0])
          .field('coordinates[1]', validLocation.coordinates[1])
          .field('content', 'Valid submission location')
          .attach('files[0]', './client/assets/images/empac.jpg')
          .end(function(err, res) {
            if (err) return done(err);
            newSubmission = res.body;
            // FIXME: Remove this timeout after file attachment library bug
            // is fixed
            setTimeout(()=>done(), 100);
          });
        });

        it('should be a valid location', () => {
          console.log('newSubmission',newSubmission)
          expect(newSubmission.locationMatch).to.be.true;
        });
      });

    });

    describe("failing validation", () => {

      badLocations.forEach((badLocation) => {
        let newSubmission;

        before((done)=>{
          auth.student.request(app)
          .post('/api/submissions')
          .type('form')
          .field('userId', exampleStudent._id.toString())
          .field('eventId', exampleSectionEvent._id.toString())
          .field('coordinates[0]', badLocation.coordinates[0])
          .field('coordinates[1]', badLocation.coordinates[1])
          .field('content', 'Valid submission location')
          .attach('files[0]', './client/assets/images/empac.jpg')
          .end(function(err, res) {
            if (err) done(err);
            newSubmission = res.body;
            setTimeout(()=>done(), 100);
          });
        });

        it('should be an invalid location', () => {
          expect(newSubmission.locationMatch).to.be.false;
        });
      });

    });

  });

});

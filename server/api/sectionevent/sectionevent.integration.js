'use strict';

import app from '../..';
import request from 'supertest';
import auth from "../../auth/local/test.integration";
import * as superwith from "../superwith.integration";
import scheduler from '../../schedule';

import SectionEvent from './sectionevent.model';
import User from "../user/user.model";

import {exampleSectionEvent, exampleStudent} from '../../config/seed';

var newSectionEvent;

describe("SectionEvent Notification Handling", function(){
    var sectionEvent;
    var student;

    before(async () => {
        sectionEvent = await SectionEvent.findByIdAsync(exampleSectionEvent._id);
    });

    before(async () => {
        student = await User.findByIdAsync(exampleStudent._id);
    });

    var relatedUsers;
    describe("Static Methods", () => {
        before(() => {
            return sectionEvent.getRelatedUsers().then(users => {
                relatedUsers = users;
            });
        });

        it("getRelatedUsers() should return users", () => {
            expect(relatedUsers).to.be.a('array');
        });
    });

    describe('Set notifications for event', function() {

      before(() => student.clearNotifications());

      before(()=> sectionEvent.updateUserNotifications());

      it("should have given the user notifications", () => {
        return student.getNotifications().then((jobs) => {
          expect(jobs.length).to.be.at.least(1);
        });
      });

    });

});


describe('SectionEvent API:', function() {

  describe('GET /api/sectionevents', function() {
    var sectionevents;

    beforeEach(function(done) {
      auth.student.request(app)
        .get('/api/sectionevents?array=true') // TODO remove array=true
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sectionevents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sectionevents).to.be.instanceOf(Array);
    });
  });

  describe('GET /api/sectionevents with options', () => {
      superwith.test(auth.student.request(app), '/api/sectionevents?array=true', [
          {
              param: "withEventInfo=true",
              should: "get event info",
              test: (svnts) => {
                  expect(svnts[0]).to.have.property('description');
                  expect(svnts[0]).to.have.property('title');
              }
          },
          {
              param: "withAuthor=true",
              should: "get section event author",
              test: (svnts) => {
                  expect(svnts[0].sectionEvents[0].author).to.have.property('_id');
              }
          },
          {
              param: "withSection=true",
              should: "get section event section",
              test: (svnts) => {
                  expect(svnts[0].sectionEvents[0].section).to.have.property('_id');
              },
              params: [
                  {
                      param: "withCourse=true",
                      should: "get section event section course",
                      test: (svnts) => {
                          expect(svnts[0].sectionEvents[0].section.course).to.have.property('_id');
                      }
                  },
                  {
                      param: "withSectionStudents=true",
                      should: "get section event section students",
                      test: (svnts) => {
                          expect(svnts[0].sectionEvents[0].section.students).to.be.a('array');
                      }
                  }
              ]
          }

      ])
  });

  describe('GET /api/sectionevents just count', () => {
      var number;

      beforeEach(function(done) {
        auth.student.request(app)
          .get('/api/sectionevents?onlyNumber=true')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            number = res.body;
            done();
          });
      });

      it('should respond with JSON array', function() {
        expect(number).to.have.property('number');
        expect(number.number).to.be.a('number');
      });
  });


  describe('POST /api/sectionevents', function() {
    beforeEach(function(done) {
      auth.instructor.request(app)
        .post('/api/sectionevents')
        .send({
          section: '000000000000000000000120',
          course: '000000000000000000000010',
          submissionInstructions: 'New SectionEvent',
          author: '000000000000000000000003',
          creationDate: new Date(),
          info: '000000000000000000000020',
          _id: '555555555555555555555555'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSectionEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created sectionevent', function() {
      expect(newSectionEvent.submissionInstructions).to.equal('New SectionEvent');
    });

  });

  describe('GET /api/sectionevents/:id', function() {
    var sectionevent;

    beforeEach(function(done) {
      request(app)
        .get('/api/sectionevents/' + newSectionEvent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sectionevent = res.body;
          done();
        });
    });

    afterEach(function() {
      sectionevent = {};
    });

    it('should respond with the requested sectionevent', function() {
      expect(sectionevent.submissionInstructions).to.equal('New SectionEvent');
    });

  });

  describe('GET /api/sectionevents/:id with options', () => {
      superwith.test(request(app), `/api/sectionevents/${exampleSectionEvent._id}`, [
          {
              param: "withEventInfo=true",
              should: "get event info",
              test: (sectionEvent) => {
                  expect(sectionEvent.info).to.have.property("_id");
                  expect(sectionEvent.info).to.have.property("description");
              },
              params: [
                  {
                      param: "withEventInfoAuthor=true",
                      should: "get event info author",
                      test: (sectionEvent) => {
                          expect(sectionEvent.info.author).to.have.property("_id");
                      }
                  }
              ]
          },
          {
              param: "withSection=true",
              should: "get section",
              test: (sectionEvent) => {
                  expect(sectionEvent.section).to.have.property("_id");
              },
              params: [
                  {
                      param: "withSectionCourse=true",
                      should: "get section course",
                      test: (sectionEvent) => {
                          expect(sectionEvent.section.course).to.have.property("_id");
                      }
                  }
              ]
          },
          {
              param: "withAuthor=true",
              should: "get author",
              test: (sectionEvent) => {
                  expect(sectionEvent.author).to.have.property("_id");
              }
          }
      ])
  });


  describe('PUT /api/sectionevents/:id', function() {
    var updatedSectionEvent

    beforeEach(function(done) {
      auth.instructor.request(app)
        .put('/api/sectionevents/' + newSectionEvent._id)
        .send({
          submissionInstructions: 'Updated SectionEvent',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSectionEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSectionEvent = {};
    });

    it('should respond with the updated sectionevent', function() {
      expect(updatedSectionEvent.submissionInstructions).to.equal('Updated SectionEvent');
    });

  });

  describe('DELETE /api/sectionevents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      auth.instructor.request(app)
        .delete('/api/sectionevents/' + newSectionEvent._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sectionevent does not exist', function(done) {
      request(app)
        .get('/api/sectionevents/' + newSectionEvent._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

});

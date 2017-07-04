'use strict';

import app from '../..';
import request from 'supertest';
import auth from "../../auth/local/test.integration";
import * as superwith from "../superwith.integration";
import Section from "./section.model";
import User from "../user/user.model";

import {seed, exampleSection, exampleStudent} from '../../config/seed';

var newSection;

describe("Notification Tests", () => {

    var section;

    before(() => {
        return Section.findByIdAsync(exampleSection._id).then(sec => {
            section = sec;
        });
    });

    describe("Static Method Tests", ()=>{
        var relatedUsers;

        before(() => {
            return section.getRelatedUsers().then(users => {
                relatedUsers = users;
            });
        });

        it("expect getRelatedUsers to return users", () => {
            expect(relatedUsers).to.be.a('array');
            expect(relatedUsers[0]).to.have.property('firstName');
            expect(relatedUsers[0]).to.have.property('lastName');
            expect(relatedUsers[0]).to.have.property('isInstructor');
        });
    });


    var student;

    before(() => {
      return User.findByIdAsync(exampleStudent._id).then((stdent) =>{
        student = stdent;
      })
    });

    describe("Adding student", () => {

      before(() => student.clearNotifications());

      before(() => {
        section.students.push(exampleStudent._id);
        return section.saveAsync();
      });

      // it('should have given the student notifications', () => {
      //   return student.getNotifications().then(jobs => {
      //       expect(jobs.length).to.be.at.least(1);
      //   });
      // });

    });

});

describe('Section API:', function() {

  describe('GET /api/sections', function() {
    var sections;

    before(function(done) {
      request(app)
        .get('/api/sections')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sections).to.be.instanceOf(Array);
    });

  });

  describe('GET /api/sections?onlyUser=:id', function() {
    var sections;

    before(function(done) {
      auth.instructor.request(app)
        .get(`/api/sections?onlyUser=${exampleStudent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sections).to.be.instanceOf(Array);
      for (var section of sections){
        expect(section.students).to.include(exampleStudent._id.toString());
      }
    });
  });

  describe('GET /api/sections?onlyCurrentUser=:id', function() {
    var sections;

    before(function(done) {
      auth.student.request(app)
        .get(`/api/sections?onlyCurrentUser=true`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sections).to.be.instanceOf(Array);
      for (var section of sections){
          expect(section.students).to.include(exampleStudent._id.toString());
      }
    });
  });

  describe('GET /api/sections?onlyUser=me', function() {
    var sections;

    before(function(done) {
      auth.student.request(app)
        .get(`/api/sections?onlyUser=me`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sections).to.be.instanceOf(Array);
      for (var section of sections){
          expect(section.students).to.include(exampleStudent._id.toString());
      }
    });
  });

  describe('POST /api/sections', function() {
    beforeEach(function(done) {
      auth.instructor.request(app)
        .post('/api/sections')
        .send({
          sectionNumbers: [1,2,3]
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSection = res.body;
          done();
        });
    });

    it('should respond with the newly created section', function() {
      assert.deepEqual(newSection.sectionNumbers, [1,2,3]);
    });

  });

  describe('GET /api/sections/:id', function() {
    var section;

    beforeEach(function(done) {
      request(app)
        .get('/api/sections/' + newSection._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          section = res.body;
          done();
        });
    });

    afterEach(function() {
      section = {};
    });

    it('should respond with the requested section', function() {
      assert.deepEqual(section.sectionNumbers, [1,2,3]);
    });
  });

  describe('GET /api/sections/:id with options', function() {
    superwith.test(request(app), `/api/sections/${exampleSection._id}`, [
        {
            param: "withSectionCourse=true",
            should: "return course of section",
            test: ( section ) => {
                expect(section.course).to.be.ok;
                expect(section.course).to.have.property('_id');
            }
        },
        {
            param: "withSectionInstructors=true",
            should: "return instructors for section",
            test: ( section ) => {
                expect(section.instructors).to.be.a('array');
            }
        },
        {
            param: "withSectionStudents=true",
            should: "return students in section",
            test: ( section ) => {
                expect(section.students).to.be.a('array');
            }
        },
        {
            param: "withSectionPending=true",
            should: "return pending students",
            test: ( section ) => {
                expect(section.pending.students).to.be.a('array');
                expect(section.pending.instructors).to.be.a('array');
                expect(section.pending.assistants).to.be.a('array');
            }
        },
        {
            param: `withEnrollmentStatus=true&studentId=${exampleStudent._id}`,
            should: "have enrollment status attached",
            test: ( section ) => {
                expect(section).to.have.property('isEnrolled');
                expect(section).to.have.property('isPending');
            }
        }
    ]);

  });

  describe('PUT /api/sections/:id', function() {
    var updatedSection

    beforeEach(function(done) {
      auth.instructor.request(app)
        .put('/api/sections/' + newSection._id)
        .send({
          sectionNumbers: [1,3,5]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSection = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSection = {};
    });

    it('should respond with the updated section', function() {
      assert.deepEqual(updatedSection.sectionNumbers, [1,3,5]);
    });

  });

  describe('DELETE /api/sections/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      auth.instructor.request(app)
        .delete('/api/sections/' + newSection._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when section does not exist', function(done) {
      request(app)
        .get('/api/sections/' + newSection._id)
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

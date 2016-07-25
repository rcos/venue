'use strict';

var app = require('../..');
var request = require('supertest');
var auth = require("../../auth/local/test.integration");
var superwith = require("../superwith.integration");

var seed = require('../../config/seed');
var exampleSection = seed.exampleSection;

var newSection;

describe('Section API:', function() {

  describe('GET /api/sections', function() {
    var sections;

    beforeEach(function(done) {
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

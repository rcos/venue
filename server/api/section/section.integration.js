'use strict';

var app = require('../..');
var request = require('supertest');

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
      request(app)
        .post('/api/sections')
        .send({
          name: 'New Section',
          info: 'This is the brand new section!!!'
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
      expect(newSection.name).to.equal('New Section');
      expect(newSection.info).to.equal('This is the brand new section!!!');
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
      expect(section.name).to.equal('New Section');
      expect(section.info).to.equal('This is the brand new section!!!');
    });

  });

  describe('PUT /api/sections/:id', function() {
    var updatedSection

    beforeEach(function(done) {
      request(app)
        .put('/api/sections/' + newSection._id)
        .send({
          name: 'Updated Section',
          info: 'This is the updated section!!!'
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
      expect(updatedSection.name).to.equal('Updated Section');
      expect(updatedSection.info).to.equal('This is the updated section!!!');
    });

  });

  describe('DELETE /api/sections/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
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
        .delete('/api/sections/' + newSection._id)
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

'use strict';

var app = require('../..');
var request = require('supertest');

var newSectionEvent;

describe('SectionEvent API:', function() {

  describe('GET /api/sectionevents', function() {
    var sectionevents;

    beforeEach(function(done) {
      request(app)
        .get('/api/sectionevents')
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

  describe('POST /api/sectionevents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sectionevents')
        .send({
          additionalNotes: 'New SectionEvent',
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
      expect(newSectionEvent.additionalNotes).to.equal('New SectionEvent');
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
      expect(sectionevent.additionalNotes).to.equal('New SectionEvent');
    });

  });

  describe('PUT /api/sectionevents/:id', function() {
    var updatedSectionEvent

    beforeEach(function(done) {
      request(app)
        .put('/api/sectionevents/' + newSectionEvent._id)
        .send({
          additionalNotes: 'Updated SectionEvent',
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
      expect(updatedSectionEvent.additionalNotes).to.equal('Updated SectionEvent');
    });

  });

  describe('DELETE /api/sectionevents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
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
        .delete('/api/sectionevents/' + newSectionEvent._id)
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

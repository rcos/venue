'use strict';

var app = require('../..');
var request = require('supertest');

var newEventInfo;

describe('EventInfo API:', function() {

  describe('GET /api/eventinfos', function() {
    var eventinfos;

    beforeEach(function(done) {
      request(app)
        .get('/api/eventinfos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          eventinfos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(eventinfos).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/eventinfos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/eventinfos')
        .send({
          name: 'New EventInfo',
          info: 'This is the brand new eventinfo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newEventInfo = res.body;
          done();
        });
    });

    it('should respond with the newly created eventinfo', function() {
      expect(newEventInfo.name).to.equal('New EventInfo');
      expect(newEventInfo.info).to.equal('This is the brand new eventinfo!!!');
    });

  });

  describe('GET /api/eventinfos/:id', function() {
    var eventinfo;

    beforeEach(function(done) {
      request(app)
        .get('/api/eventinfos/' + newEventInfo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          eventinfo = res.body;
          done();
        });
    });

    afterEach(function() {
      eventinfo = {};
    });

    it('should respond with the requested eventinfo', function() {
      expect(eventinfo.name).to.equal('New EventInfo');
      expect(eventinfo.info).to.equal('This is the brand new eventinfo!!!');
    });

  });

  describe('PUT /api/eventinfos/:id', function() {
    var updatedEventInfo

    beforeEach(function(done) {
      request(app)
        .put('/api/eventinfos/' + newEventInfo._id)
        .send({
          name: 'Updated EventInfo',
          info: 'This is the updated eventinfo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEventInfo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEventInfo = {};
    });

    it('should respond with the updated eventinfo', function() {
      expect(updatedEventInfo.name).to.equal('Updated EventInfo');
      expect(updatedEventInfo.info).to.equal('This is the updated eventinfo!!!');
    });

  });

  describe('DELETE /api/eventinfos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/eventinfos/' + newEventInfo._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when eventinfo does not exist', function(done) {
      request(app)
        .delete('/api/eventinfos/' + newEventInfo._id)
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

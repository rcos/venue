'use strict';

var app = require('../..');
var request = require('supertest');

var newEvent;

describe('Event API:', function() {

  describe('GET /api/events', function() {
    var events;

    beforeEach(function(done) {
      request(app)
        .get('/api/events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          events = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(events).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/events', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/events')
        .send({
          title: 'New Event',
          description: 'This is the brand new event!!!',
          location: {
            geo: {
              type: 'Point',
              coordinates: [42.7203888,-73.6735074]
            }
          },
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created event', function() {
      expect(newEvent.title).to.equal('New Event');
      expect(newEvent.description).to.equal('This is the brand new event!!!');
    });

  });

  describe('GET /api/events/:id', function() {
    var event;

    beforeEach(function(done) {
      request(app)
        .get('/api/events/' + newEvent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          event = res.body;
          done();
        });
    });

    afterEach(function() {
      event = {};
    });

    it('should respond with the requested event', function() {
      expect(event.title).to.equal('New Event');
      expect(event.description).to.equal('This is the brand new event!!!');
    });

  });

  describe('PUT /api/events/:id', function() {
    var updatedEvent

    beforeEach(function(done) {
      request(app)
        .put('/api/events/' + newEvent._id)
        .send({
          title: 'Updated Event',
          description: 'This is the updated event!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvent = {};
    });

    it('should respond with the updated event', function() {
      expect(updatedEvent.title).to.equal('Updated Event');
      expect(updatedEvent.description).to.equal('This is the updated event!!!');
    });

  });

  describe('DELETE /api/events/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/events/' + newEvent._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when event does not exist', function(done) {
      request(app)
        .delete('/api/events/' + newEvent._id)
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

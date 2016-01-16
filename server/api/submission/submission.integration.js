'use strict';

var app = require('../..');
var request = require('supertest');

var newSubmission;

describe('Submission API:', function() {

  describe('GET /api/submissions', function() {
    var submissions;

    beforeEach(function(done) {
      request(app)
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
      request(app)
      .post('/api/submissions')
      .field('Content-Type', 'multipart/form-data')
      .field('userId', '000000000000000000000004')
      .field('eventId', '000000000000000000000020')
      .field('coordinates[0]', 0)
      .field('coordinates[1]', 1)
      .field('content', 'This is the brand new submission!!!')
      .attach('files', 'server/api/submission/empac.jpg')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        newSubmission = res.body;
        done();
      });

    });

    it('should respond with the newly created submission', function() {
      console.log(newSubmission)
      expect(newSubmission.content).to.equal('This is the brand new submission!!!');
    });

  });

  describe('GET /api/submissions/:id', function() {
    var submission;

    beforeEach(function(done) {
      request(app)
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

    afterEach(function() {
      submission = {};
    });

    it('should respond with the requested submission', function() {
      expect(submission.content).to.equal('This is the brand new submission!!!');
    });

  });

  describe('PUT /api/submissions/:id', function() {
    var updatedSubmission

    beforeEach(function(done) {
      request(app)
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
      request(app)
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
      request(app)
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

});

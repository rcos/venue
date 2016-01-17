'use strict';

var app = require('../..');
var request = require('supertest');
var User = require('../user/user.model')
var newSubmission;
var token = "";
var tokenAdmin = "";
describe('Submission API:', function() {
  // Clear users before testing
  before(function(done) {
    User.removeAsync().then(function() {
      var user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      user.save(function(){
        request(app)
          .post('/auth/local')
          .send({
            email: 'test@example.com',
            password: 'password'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            token = res.body.token;
            if (token && tokenAdmin){
              done();
            }
          });
      });

      var userAdmin = new User({
        name: 'Admin User',
        email: 'admin@admin.com',
        password: 'password',
        role: 'admin'
      });

      userAdmin.save(function(){
        request(app)
          .post('/auth/local')
          .send({
          email: 'admin@admin.com',
            password: 'password'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            tokenAdmin = res.body.token;
            if (token && tokenAdmin){
              done();
            }
          });
      });

    });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/submissions', function() {
    var submissions;

    beforeEach(function(done) {
      request(app)
        .get('/api/submissions')
        .set('authorization', 'Bearer ' + tokenAdmin)
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
      .set('authorization', 'Bearer ' + token)
      .field('Content-Type', 'multipart/form-data')
      .field('userId', '000000000000000000000004')
      .field('authors[0]', '000000000000000000000004')
      .field('authors[1]', '000000000000000000000005')
      .field('eventId', '000000000000000000000020')
      .field('coordinates[0]', 0)
      .field('coordinates[1]', 1)
      .field('content', 'This is the brand new submission!!!')
      .attach('files[0]', 'server/api/submission/empac.jpg')
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
      expect(newSubmission.submitter).to.equal('000000000000000000000004');
      expect(newSubmission.authors[1]).to.equal('000000000000000000000005');
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

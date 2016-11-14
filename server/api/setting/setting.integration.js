'use strict';

var app = require('../..');
var auth = require("../../auth/local/test.integration");
import request from 'supertest';
var superwith = require("../superwith.integration");

var newSetting;
var secondSetting;

describe('Setting API:', function() {
  describe('GET /api/settings', function() {
    var settings;

    beforeEach(function(done) {
      request(app)
        .get('/api/settings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          settings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(settings).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/settings (1)', function() {
    before(function(done) {
      auth.admin.request(app)
        .post('/api/settings')
        .send({
          semester: 'Fall 2016'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSetting = res.body;
          done();
        });
    });

    it('should respond with the newly created setting', function() {
      expect(newSetting.semester).to.equal('Fall 2016');
    });

    it('should set the new semester as active', function() {
      expect(newSetting.active).to.be.true
    });

    it('should set login to default', function() {
      expect(newSetting.login.cas).to.be.false
      expect(newSetting.login.local).to.be.true
    });

  });

  describe('POST /api/settings (2)', function() {
    before(function(done) {
      auth.admin.request(app)
        .post('/api/settings')
        .send({
          semester: 'Summer 2017'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          secondSetting = res.body;
          done();
        });
    });

    it('should respond with the newly created setting', function() {
      expect(secondSetting.semester).to.equal('Summer 2017');
    });

    it('should set the new semester as active', function() {
      expect(secondSetting.active).to.be.true
    });

    it('should set login to default', function() {
      expect(secondSetting.login.cas).to.be.false
      expect(secondSetting.login.local).to.be.true
    });

  });

  describe('GET /api/settings/:id', function() {
    var setting;

    beforeEach(function(done) {
      request(app)
        .get(`/api/settings/${newSetting._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          setting = res.body;
          done();
        });
    });

    afterEach(function() {
      setting = {};
    });

    it('should respond with the requested setting', function() {
      expect(setting.semester).to.equal(newSetting.semester);
      expect(setting.active).to.be.false;
    });
  });

  describe('GET /api/settings/current', function() {
    var setting;

    beforeEach(function(done) {
      request(app)
        .get(`/api/settings/current`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          setting = res.body;
          done();
        });
    });

    afterEach(function() {
      setting = {};
    });

    it('should respond with the current setting', function() {
      expect(setting.semester).to.equal(secondSetting.semester);
      expect(setting.active).to.be.true;
    });
  });

  describe('PUT /api/settings/login', function() {
    var updatedSetting;

    before(function(done) {
      auth.admin.request(app)
        .put(`/api/settings/login`)
        .send({
          cas: true,
          local: false
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSetting = res.body;
          done();
        });
    });

    it('should respond with the updated setting on a subsequent GET', function(done) {
      request(app)
        .get(`/api/settings/current`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let updatedSetting = res.body;
          expect(updatedSetting.login.cas).to.be.true;
          expect(updatedSetting.login.local).to.be.false;

          done();
        });
    });
  });

  describe('PUT /api/settings/semester', function() {
    var updatedSetting;

    before(function(done) {
      auth.admin.request(app)
        .put(`/api/settings/semester`)
        .send({
          semester: "Spring 2015"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSetting = res.body;
          done();
        });
    });

    it('should respond with the updated setting on a subsequent GET', function(done) {
      request(app)
        .get(`/api/settings/current`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let updatedSetting = res.body;

          expect(updatedSetting.semester).to.equal('Spring 2015');
          secondSetting.semester = updatedSetting.semester;
          done();
        });
    });
  });

  describe('PUT /api/settings/current', function() {
    var updatedSetting;

    before(function(done) {
      auth.admin.request(app)
        .put(`/api/settings/current`)
        .send({
          id: newSetting._id
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSetting = res.body;
          done();
        });
    });

    it('should respond with the updated setting on a subsequent GET', function(done) {
      request(app)
        .get(`/api/settings/current`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let updatedSetting = res.body;
          expect(updatedSetting.semester).to.equal(newSetting.semester);
          expect(updatedSetting._id).to.equal(newSetting._id);

          done();
        });
    });
  });

  describe('DELETE /api/settings/:id', function() {
    it('should respond with 500 on when deleting current semester', function(done) {
      auth.admin.request(app)
        .delete(`/api/settings/${newSetting._id}`)
        .expect(500)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
    it('should respond with 204 on successful removal', function(done) {
      auth.admin.request(app)
        .delete(`/api/settings/${secondSetting._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when setting does not exist', function(done) {
      auth.admin.request(app)
        .delete(`/api/settings/${secondSetting._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});

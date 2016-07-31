'use strict';

var app = require('../..');
var request = require('supertest');
var auth = require("../../auth/local/test.integration");
var superwith = require("../superwith.integration");
var EventInfo = require("./eventinfo.model");

var newEventInfo;
var eventinfoExampleId = "000000000000000000000020";


describe("EventInfo Static Methods", ()=>{

    var eventInfo;

    before(done => {
        EventInfo.findByIdAsync(eventinfoExampleId).then(evnt => {
            eventInfo = evnt;
            done();
        });
    });

    var relatedUsers;
    describe("Static Methods", () => {
        before(done => {
            eventInfo.getRelatedUsers().then(users => {
                relatedUsers = users;
                done();
            });
        });

        it("getRelatedUsers() should return users", () => {
            expect(relatedUsers).to.be.a('array');
            expect(relatedUsers[0]).to.have.property('firstName');
            expect(relatedUsers[0]).to.have.property('lastName');
            expect(relatedUsers[0]).to.have.property('isInstructor');
        });
    });

});


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
    before(function(done) {
      auth.instructor.request(app)
        .post('/api/eventinfos')
        .type('form')
        .field('title', 'New EventInfo')
        .field('description', 'This is the brand new eventinfo!!!')
        .field("times[0].start", "2016-07-24T23:26:51.573Z")
        .field("times[0].end", "2016-07-25T00:26:51.573Z")
        .field("location.address", "asdasd")
        .field("location.description", "asdasd")
        .field("location.geo.type", "Point")
        .field("location.geo.coordinates[0]", "-73.68399119999998")
        .field("location.geo.coordinates[1]", "42.7285023")
        .field("location.radius", "0.045318603515625")
        .field("location.geobounds.type", "MultiPolygon")
        // This location is around RPI
        .field("location.geobounds.coordinates[0][0][0][0]", "-73.68066787719727")
        .field("location.geobounds.coordinates[0][0][0][1]", "42.734152628905065")
        .field("location.geobounds.coordinates[0][0][1][0]", "-73.68890762329102")
        .field("location.geobounds.coordinates[0][0][1][1]", "42.724064845595954")
        .field("location.geobounds.coordinates[0][0][2][0]", "-73.64358901977539")
        .field("location.geobounds.coordinates[0][0][2][1]", "42.72229931484221")
        .field("location.geobounds.coordinates[0][0][3][0]", "-73.68066787719727")
        .field("location.geobounds.coordinates[0][0][3][1]", "42.734152628905065")
        .attach('files[0]', './client/assets/images/empac.jpg')
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
      expect(newEventInfo.title).to.equal('New EventInfo');
      expect(newEventInfo.description).to.equal('This is the brand new eventinfo!!!');
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
      expect(eventinfo.title).to.equal('New EventInfo');
      expect(eventinfo.description).to.equal('This is the brand new eventinfo!!!');
    });
  });

  describe("GET /api/eventinfos/:id with options", function(){
      superwith.test(request(app), `/api/eventinfos/${eventinfoExampleId}`, [
          {
              param: "withSectionEvents=true",
              should: "get section events",
              test: (info) => {
                  expect(info).to.have.property("sectionEvents");
                  expect(info.sectionEvents).to.be.a('array');
                  expect(info.sectionEvents[0]).to.have.property("_id");
              },
              params: [
                  {
                      param: "withCourses=true",
                      should: "get section event courses",
                      test: (info) => {
                          expect(info.sectionEvents[0].section).to.be.ok;
                          expect(info.sectionEvents[0].section.course).to.have.property("_id");
                      }
                  }
              ]
          }
      ]);
  });

  describe('PUT /api/eventinfos/:id', function() {
    var updatedEventInfo

    beforeEach(function(done) {
      auth.instructor.request(app)
        .put('/api/eventinfos/' + newEventInfo._id)
        .send({
          title: 'Updated EventInfo',
          description: 'This is the updated eventinfo!!!'
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
      expect(updatedEventInfo.title).to.equal('Updated EventInfo');
      expect(updatedEventInfo.description).to.equal('This is the updated eventinfo!!!');
    });

  });

  describe('DELETE /api/eventinfos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      auth.instructor.request(app)
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
      auth.instructor.request(app)
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

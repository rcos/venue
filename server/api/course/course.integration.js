'use strict';
var app = require('../..');
var request = require("supertest");
var superwith = require("../superwith.integration");
var auth = require("../../auth/local/test.integration");

import {exampleCourse, exampleStudent} from '../../config/testingseed';

describe('Course API:', function() {
    describe('POST /api/courses', function() {
      it('should create a new course', function(done) {
        auth.instructor.request(app)
        .post('/api/courses')
        .type('form')
        .field('name', 'New Course')
        .field('description', 'This is the brand new course!!!')
        .field('department', 'TEST')
        .field('courseNumber', '2100')
        .attach('files[0]', './client/assets/images/empac.jpg')
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.be.an('null');
          var newCourse = res.body;
          expect(newCourse.name).to.equal('New Course');
          expect(newCourse.description).to.equal('This is the brand new course!!!');
          expect(newCourse.department).to.equal('TEST');
          expect(newCourse.courseNumber).to.equal(2100);
          done();
        });
      });
    });

    describe('GET /api/courses/:id', function() {
        it('should respond with the example course', function(done) {
            request(app)
            .get('/api/courses/' + exampleCourse._id)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                expect(err).to.be.an('null');
                var course = res.body;
                expect(course.name).to.equal(exampleCourse.name);
                expect(course.description).to.equal(exampleCourse.description);
                done();
            });
        });
    });
// tests that auth is working properly. teacher can't modify example, can modify newly created.
    describe('POST and GET /api/courses/:id', function() {

        var newCourse;
        before((done)=>{
          auth.instructor.request(app)
          .post('/api/courses')
          .type('form')
          .field('name', 'New Course')
          .field('description', 'This is the brand new course!!!')
          .field('department', 'TEST')
          .field('courseNumber', '2100')
          .attach('files[0]', './client/assets/images/empac.jpg')
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) done(err)
            newCourse = res.body;
            done();
          });
        })

        it('should respond with the newly created course', function(done) {
            request(app)
            .get('/api/courses/' + newCourse._id)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                expect(err).to.be.an('null');
                var course = res.body;
                expect(course.name).to.equal('New Course');
                expect(course.description).to.equal('This is the brand new course!!!');
                done();
            });
        });

    });

    describe("GET /api/course/:id with options", function(){
        superwith.test(request(app), `/api/courses/${exampleCourse._id}`, [
            {
                param: 'withSections=true',
                should: 'get sections',
                test: (course) => {console.log(course);expect(course.sections).to.be.a('array')},
                params: [
                    {
                        param: 'withInstructors=true',
                        should: 'get instructors',
                        test: (course) => expect(course.sections[0].instructors).to.be.a('array')
                    },
                    {
                        param: `withSectionEnrollmentStatus=true&studentId=${exampleStudent._id}`,
                        should: 'get student enrollment status',
                        test: (course) => {
                            expect(course.sections[0]).to.have.property('isEnrolled')
                            expect(course.sections[0]).to.have.property('isPending')
                        }
                    }
                ]
            }
        ]);
    });

    describe('PUT /api/courses/:id', function() {
        it('should respond with the updated course', function(done) {
            auth.instructor.request(app)
            .put('/api/courses/' + exampleCourse._id)
            .send({
                name: 'Updated Course',
                description: 'This is the updated course'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                expect(err).to.be.an('null');
                var updatedCourse = res.body;
                expect(updatedCourse.name).to.equal('Updated Course');
                expect(updatedCourse.department).to.equal(exampleCourse.department);
                expect(updatedCourse.description).to.equal('This is the updated course');
                done();
            });
        });

    });

    describe('DELETE /api/courses/:id', function() {

        it('should respond with 204 on successful removal', function(done) {
            auth.instructor.request(app)
            .delete('/api/courses/' + exampleCourse._id)
            .expect(204)
            .end(function(err, res) {
                expect(err).to.be.an('null');
                done();
            });
        });
    });

    describe('DELETE and GET /api/courses/:id', function() {

        before((done) => {
            auth.instructor.request(app)
            .delete('/api/courses/' + exampleCourse._id)
            .expect(204)
            .end(function(err, res) {
                if (err) done(err)
                done();
            });
        });

        it('should respond with 404 when course does not exist', function(done) {
            auth.instructor.request(app)
            .delete('/api/courses/' + exampleCourse._id)
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

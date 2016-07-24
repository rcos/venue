'use strict';
var auth = require("../../auth/local/test.integration");
var app = require('../..');
var request = require("supertest");

var newCourse;

describe('Course API:', function() {

    before((done) => {
        auth.init().then(() => done());
    });

    describe('GET /api/courses', function() {
        var courses;

        before(function(done) {
            request(app)
                .get('/api/courses')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    courses = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            expect(courses).to.be.instanceOf(Array);
        });

    });

    var newCourse;
    describe('POST /api/courses', function() {

        before(function(done) {
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
                    if (err) {
                        return done(err);
                    }
                    newCourse = res.body;
                    done();
                });
        });

        it('should respond with the newly created course', function() {
            expect(newCourse.name).to.equal('New Course');
            expect(newCourse.description).to.equal('This is the brand new course!!!');
            expect(newCourse.department).to.equal('TEST');
            expect(newCourse.courseNumber).to.equal(2100);
        });

    });

    describe('GET /api/courses/:id', function() {

        var course;

        beforeEach(function(done) {
            request(app)
            .get('/api/courses/' + newCourse._id)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                course = res.body;
                done();
            });
        });

        it('should respond with the requested course', function() {
            expect(course.name).to.equal('New Course');
            expect(course.description).to.equal('This is the brand new course!!!');
        });

    });

    describe('PUT /api/courses/:id', function() {

        var updatedCourse;

        beforeEach(function(done) {
            auth.instructor.request(app)
            .put('/api/courses/' + newCourse._id)
            .send({
                name: 'Updated Course',
                description: 'This is the updated course!!!'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                updatedCourse = res.body;
                done();
            });
        });

        it('should respond with the updated course', function() {
            expect(updatedCourse.name).to.equal('Updated Course');
            expect(updatedCourse.department).to.equal('TEST');
            expect(updatedCourse.description).to.equal('This is the updated course!!!');
        });

    });

    describe('DELETE /api/courses/:id', function() {

        it('should respond with 204 on successful removal', function(done) {
            auth.instructor.request(app)
            .delete('/api/courses/' + newCourse._id)
            .expect(204)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });

        it('should respond with 404 when course does not exist', function(done) {
            auth.instructor.request(app)
            .delete('/api/courses/' + newCourse._id)
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

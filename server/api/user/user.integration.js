'use strict';

import app from '../..';
import User from './user.model';
import request from 'supertest';

var auth = require("../../auth/local/test.integration");
var superwith = require("../superwith.integration");

import {exampleUser} from '../../config/seed';

describe('User API:', function() {
  var user;

    describe('GET /api/users', function() {
        var users;

        before((done)=>{
            auth.admin.request(app)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                users = res.body;
                done();
            });
        });

        it("should get a list of all users", (done) => {
            expect(users).to.be.a('array');
            done();
        });
    });


    describe('GET /api/users/me with options', function() {
        superwith.test(auth.student.request(app), '/api/users/me', [
            {
                param: 'withSections=true',
                should: 'populate user sections',
                test: (student) => {
                    expect(student.sections).to.be.a('array');
                    expect(student.sections[0]).to.have.property('_id');
                }
            },
            {
                param: 'withEvents=true',
                should: 'populate user events',
                test: (student) => {
                    // TODO it should return an array
                    student.events = Object.keys(student.events).map(k => student.events[k]);
                    expect(student.events).to.be.a('array');
                    expect(student.events[0]).to.have.property('_id');
                }
            },
            {
                param: 'withSectionEvents=true',
                should: 'populate user section events',
                test: (student) => {
                    expect(student.sectionEvents).to.be.a('array');
                    expect(student.sectionEvents[0]).to.have.property('_id');
                }
            },
            {
                param: 'withCourses=true',
                should: 'populate user courses',
                test: (student) => {
                    //TODO should return an array
                    student.courses = Object.keys(student.courses).map(k => student.courses[k]);
                    expect(student.courses).to.be.a('array');
                    expect(student.courses[0]).to.have.property('_id');
                }
            },

        ]);
    });

});

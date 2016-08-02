'use strict';

import app from '../..';
import User from './user.model';
import request from 'supertest';
import SectionEvent from '../sectionevent/sectionevent.model';

var scheduler = require('../../schedule');
var auth = require("../../auth/local/test.integration");
var superwith = require("../superwith.integration");
var mongoose = require('mongoose');

import {exampleStudent, exampleSectionEvent} from '../../config/seed';

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

// Step 1: delete all user notificaionts
// Step 2: update student notificaionts with populate notificaitons
// Step 3: chewck to see if uses have notificaiotns for that event
describe.only('User notification:', function() {
  var user;
  var notificaitonsRemoved = 0;

    describe('update student notificaitons', function() {

      before((done)=>{
        scheduler.cancel({'data.user._id': exampleStudent._id}, (err, numRemoved)=>{
          notificaitonsRemoved = numRemoved;
          done();
        })
      });

      before((done)=>{
        SectionEvent.findByIdAsync(exampleSectionEvent._id)
          .then(se=>{
            return se.getFullEvent()
          })
          .then(fullEvent=>{
            return Promise.all([fullEvent, User.findByIdAsync(exampleStudent._id)]);
           })
           .then(([fullEvent, student]) => {
              student.updateNotifications(fullEvent);
              done();
          });
        });

        it("should have a job set for the student", (done) => {
          scheduler.jobs({'data.user._id': exampleStudent._id}, function(err, jobs) {
            console.log(jobs);
            // Work with jobs (see below)
            done();
          });
        });
    });


});

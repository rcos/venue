'use strict';

import crypto from 'crypto';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';
import async from 'async';
import uuid from 'node-uuid';
import Section from '../section/section.model';
import Course from '../course/course.model';
import Submission from '../submission/submission.model';
import {getSectionsExtra} from '../section/section.controller';
var scheduler = require('../../schedule');

import SectionEvent from '../sectionevent/sectionevent.model';
const authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  lastName: String,
  firstName: String,
  email: {
    type: String,
    lowercase: true,
    select: false
  },
  role: {
    type: String,
    default: 'user'
  },
  isInstructor: Boolean,
  isVerified: Boolean,
  password: {
    type: String,
    select: false
  },
  provider: {
    type: String,
    select: false
  },
  salt: {
    type: String,
    select: false
  },
  facebook: {},
  twitter: {},
  google: {},
  github: {},
  verificationToken: {
    type: String
  },
  preferences: {
    recieveEmails: {
      type: Boolean,
      default: true
    },
    emailNotifyAheadMinutes: {
      type: [{type:Number}],
      default: [0, 30]
    }
  }
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'lastName': this.lastName,
      'firstName': this.firstName,
      'role': this.role,
      'sections': this.sections,
      'isInstructor': this.isInstructor,
      '_id': this._id,
      'isVerified': this.isVerified
    };
  });

UserSchema
    .virtual('isStudent')
    .get(function() {
        return !this.isInstructor;
    })
    .set(function(isStudent){
        this.isInstructor = !isStudent;
    });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('password')
  .validate(function(password) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return password.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOneAsync({ email: value })
      .then(function(user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
      next(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          next(encryptErr);
        }
        this.password = hashedPassword;
        next();
      });
    });
  });

/**
 * Methods
 */
UserSchema.methods = {

  emailUpdate(message){
    message.eventInfo.time.forEach(time=>{
      this.preferences.emailNotifyAheadMinutes.forEach(minutesAhead => {
        var notifyTime = new Date(time.start.getTime() - minutesAhead*60000);
        scheduler.schedule(notifyTime, "sectionEvent reminder", {user:this.toObject(), sectionId: message.section._id, eventInfo: message.eventInfo.toObject()});
      })
    })
  },

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }

      if (this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize, callback) {
    var defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    if (!callback) {
      return crypto.randomBytes(byteSize).toString('base64');
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, salt.toString('base64'));
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      return null;
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                   .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, (err, key) => {
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  },

  getSectionsAsync(opts){
    var sections = [];
    var query;
    if (this.isInstructor){
        query = Section.find({instructors: mongoose.Types.ObjectId(this._id) });
    }
    else{
        query = Section.find({ students : mongoose.Types.ObjectId(this._id)});
    }
    query = getSectionsExtra(query,opts);

    return query.lean().execAsync();
  },
//withEventSectionNumbers
  getEventsAsync(opts){
    var events = [];
    return this.getSectionsAsync().then((sections) => {
      var query = SectionEvent.find({section : {$in: sections}})
      .populate('info');

      if (opts.withEventSections){
        query.populate({
           path: 'section',
           populate: {
             path: 'course',
             model: 'Course'
           }
        });
      }

      return query.lean().execAsync()
      .then((sectionEventsArray)=>{
        var events = {};
        sectionEventsArray.forEach((sectionEvent)=>{
          if(events[sectionEvent.info._id]){
            events[sectionEvent.info._id].sectionEvents.push(sectionEvent);
          }
          else{
            events[sectionEvent.info._id] = sectionEvent.info;
            events[sectionEvent.info._id].sectionEvents = [sectionEvent];
          }
          delete sectionEvent.info;
        })
        return events;
      });
    })
  },

  getSectionEventsAsync(opts){
    var events = [];
    return this.getSectionsAsync().then((sections) => {
      var query = SectionEvent.find({section : {$in: sections}})
      .populate('info');

      if (opts.withEventSections){
        query.populate({
           path: 'section',
           populate: {
             path: 'course',
             model: 'Course'
           }
        });
      }

      return query.execAsync();
    })
  },

  getCoursesAsync(opts){
    return this.getSectionsAsync({withSectionsCourse: true})
      .then((sections) => {
        var courses = {}
        sections.forEach((section)=>{
          if(courses[section.course._id]){
            courses[section.course._id].sections.push(section);
          }
          else{
            courses[section.course._id] = section.course;
            courses[section.course._id].sections = [section];
          }
          delete section.course;
        })
        return courses;
      });
  },

  getSubmissionsAsync(opts){
    var query = Submission.find({submitter: mongoose.Types.ObjectId(this._id)});
    query.populate("instructorApproval.instructor")
    .populate("authors")
    .populate("submitter")
    .populate("sectionEvent");
    query.populate({
      path: 'sectionEvent',
      model: 'SectionEvent',
      populate: {
        path: 'section',
        model: 'Section',
        populate: {
          path: "course",
          model: "Course"
        }
      }
    });
    query.populate({
      path: 'sectionEvent',
      model: 'SectionEvent',
      populate: {
        path: 'info',
        model: 'EventInfo'
      }
    });

    return query.lean().execAsync();
  },

  setVerificationToken() {
    this.verificationToken = uuid.v4();
    this.save();
  },

  // WARNING: This should only be called in testing
  clearNotifications() {
    return scheduler.cancel({'data.user._id': this._id.toString()});
  },

  // WARNING: This should only be called in testing
  getNotifications() {
    return scheduler.jobs({'data.user._id': this._id.toString()});
  },

  updateNotifications(events) {
    if (!Array.isArray(events)){
      events = [events];
    }
    // Remove Events for specified user and SectionEvent
    return Promise.all(events.map(event => {
      return scheduler.cancel({'data.user._id': this._id.toString(), 'data.eventId': event._id.toString()});
    })).then(()=>{
      // For each event/event time/email preference make a new notification.
      return Promise.all(events.map(event => {
        return Promise.all(event.info.times.map(time =>{
          return Promise.all(this.preferences.emailNotifyAheadMinutes.map(minutesAhead => {
            var notifyTime = new Date(time.start.getTime() - minutesAhead*60000);
            return scheduler.schedule(notifyTime, "sectionEvent reminder", {
              user:this.toObject(),
              eventId: event._id.toString(),
              eventInfo:event.info.toObject()
            });
          }));
        }));
      }));
    });
  }
};

export default mongoose.model('User', UserSchema);

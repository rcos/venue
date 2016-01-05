'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
  title: String,
  content: String,
  images: [String], // path to image on static image server?
  time: Date,
  submitter: {type : Schema.Types.ObjectId, ref: 'User'},
  authors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  location: {
    address: String,
    description: String,
    type: [Number],        // [<longitude>, <latitude>]
    index: '2dsphere'      
  }
});

module.exports = mongoose.model('Submission', SubmissionSchema);

'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
  title: String,
  content: String,
  images: [String], // path to image on static image server?
  time: Date,
  authors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  location: String // TODO format?
});

module.exports = mongoose.model('Submission', SubmissionSchema);

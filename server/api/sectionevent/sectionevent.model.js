'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SectionEventSchema = new Schema({
  section: {type: Schema.Types.ObjectId, ref: 'Section'},
  info: {type: Schema.Types.ObjectId, ref: 'EventInfo'},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  additionalNotes: String,
  creationDate: Date
});

module.exports = mongoose.model('SectionEvent', SectionEventSchema);

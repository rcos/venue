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

/**
 * Methods
 */
SectionEventSchema.methods = {

  addSubmission(submissionId, callback){
    this.submissions.push(submissionId);
    this.save( () => {
      callback();
    });
  }

};

module.exports = mongoose.model('SectionEvent', SectionEventSchema);

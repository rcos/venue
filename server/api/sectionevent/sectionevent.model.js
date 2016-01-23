'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import Submission from '../submission/submission.model';

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

  fullRemove(){
    return Submission.find({sectionEvent:this._id}).remove().execAsync()
      .then(()=>{
          return this.removeAsync();
      });
  }
};

module.exports = mongoose.model('SectionEvent', SectionEventSchema);

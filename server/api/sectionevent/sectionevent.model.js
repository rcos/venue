'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import Submission from '../submission/submission.model';
import Section from '../section/section.model';

var SectionEventSchema = new Schema({
  section: {type: Schema.Types.ObjectId, ref: 'Section'},
  info: {type: Schema.Types.ObjectId, ref: 'EventInfo'},
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  submissionInstructions: String,
  creationDate: Date
});


/**
 * Methods
 */
SectionEventSchema.methods = {

  getRelatedUsers(){
    return this.execPopulate({
        path:"section",
        populate: {
            path:"students",
            model:"User"
        }
    }).then(section => {
        console.log("asd", section);
        return section.students
    });
  },

  updateUserNotifications(){
      this.getFullEvent().then(fullEvent => {
          this.getRelatedUsers().then(users => {
              users.forEach(user => {
                  user.updateNotifications([fullEvent]);
              })
          });
      });
  },

  getFullEvent(){
      return new Promise((resolve, reject) => {
          this.populate("info")
          .populate({
              path: 'section',
              populate: {
                  path: 'course',
                  model: 'Course'
              }
          }, (err, evnt) => {
              if (err) return reject(err);
              resolve(evnt);
          });
      });
  },

  fullRemove(){
    return Submission.find({sectionEvent:this._id}).remove().execAsync()
      .then(()=>{
          return this.removeAsync();
      });
  }
};

module.exports = mongoose.model('SectionEvent', SectionEventSchema);

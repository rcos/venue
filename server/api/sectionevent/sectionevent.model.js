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
    return this.populate({
        path:"section",
        populate: {
            path:"students",
            model:"User",
            select: "email preferences firstName lastName"
        }
    }).execPopulate().then(se => se.section.students);
  },

  updateUserNotifications(){
    return this.getFullEvent().then(fullEvent => {
        return this.getRelatedUsers().then(users => {
          return Promise.all(users.map(user => user.updateNotifications(fullEvent)));
        });
    });
  },

  getFullEvent(){
      return this.populate({
        path: "info",
        model: "EventInfo",
        populate: {
          path: "section",
          model: "Section",
          populate: {
            path: 'course',
            model: 'Course'
          }
        }
      })
        .execPopulate().then((event) => {
            if(event.info === null) throw new Error("EventInfo null");
            return Promise.resolve(event);
        });
  },

  fullRemove(){
    return Submission.find({sectionEvent:this._id}).remove().execAsync()
      .then(()=>{
          return this.removeAsync();
      });
  }
};

export default mongoose.model('SectionEvent', SectionEventSchema);

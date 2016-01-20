'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import Section from '../section/section.model';
import SectionEvent from '../sectionevent/sectionevent.model';

var SubmissionSchema = new Schema({
  content: String,
  images: [String], // path to image on static image server?
  time: Date,
  submitter: {type : Schema.Types.ObjectId, ref: 'User'},
  authors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  sectionEvent: {type : Schema.Types.ObjectId, ref: 'SectionEvent'},
  location: {
    address: String,
    description: String,
    geo: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [Number]
    }
  }
});

SubmissionSchema.pre("save",function(next) {
  if ( !this.location.geo.coordinates || this.location.geo.coordinates === 0 ) {
    this.location.geo.coordinates = [42.7285023,-73.6839912];
  }
  next();
});


SubmissionSchema.index({ 'location.geo' : '2dsphere'});

SubmissionSchema.methods = {

  getSectionAsync: function(){
    return SectionEvent.findByIdAsync(this.sectionEvent)
      .then((sectionEvent) => {
        return Section.findByIdAsync(sectionEvent.section);
      });
  }

};

module.exports = mongoose.model('Submission', SubmissionSchema);

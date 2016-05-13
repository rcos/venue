'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
import Section from '../section/section.model';
import SectionEvent from '../sectionevent/sectionevent.model';
var GeoJSON = require('mongoose-geojson-schema');

var SubmissionSchema = new Schema({
  content: String,
  images: [String], // path to image on static image server?
  time: Date,
  submitter: {type : Schema.Types.ObjectId, ref: 'User'},
  authors: [{type : Schema.Types.ObjectId, ref: 'User'}],
  sectionEvent: {type : Schema.Types.ObjectId, ref: 'SectionEvent'},
  verified: Boolean,
  locationMatch: Boolean,
  location: {
    geo: mongoose.Schema.Types.Point
  }
},{ timestamps: true});

SubmissionSchema.index({ 'location.geo' : '2dsphere'});

SubmissionSchema.pre("save",function(next) {
  if ( !this.location.geo.coordinates || this.location.geo.coordinates === 0 ) {
    this.location.geo.coordinates = [42.7285023,-73.6839912];
  }
  next();
});

SubmissionSchema.methods = {

  getSectionAsync: function(){
    return SectionEvent.findByIdAsync(this.sectionEvent)
      .then((sectionEvent) => {
        return Section.findByIdAsync(sectionEvent.section);
      });
  }

};

module.exports = mongoose.model('Submission', SubmissionSchema);

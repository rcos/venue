'use strict';

import {Schema} from 'mongoose';
import uuid from 'node-uuid';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

// Verification token model
var verificationTokenSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: '4h'
    }
});

verificationTokenSchema.methods = {
  createVerificationToken(callback) {
    var verificationToken = this;
    var token = uuid.v4();
    verificationToken.set('token', token);
    verificationToken.save( function (err) {
      if (err) {console.log(err); return callback(err);}
      return callback(null, token);
    });
  }
}

export default mongoose.model('verificationToken', verificationTokenSchema);

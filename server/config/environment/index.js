'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Server base e.g. http://venue.university.edu:9000
  serverURL: process.env.DOMAIN,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session
  secrets: {
    session: process.env.VENUE_SECRET || 'venue-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  // Images Folder
  imageUploadPath: './data/',
  tmpUploadPath: './data/tmp',

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  cas: {
      serverURL: process.env.CAS_SERVER_URL,
      version:   process.env.CAS_VERSION
  },

  schoolEmailSuffix:  process.env.SCHOOL_EMAIL_SUFFIX,

  emailService: process.env.EMAIL_SERVICE,
  smtpLogin:    process.env.SMTP_LOGIN,
  smtpPassword: process.env.SMTP_PASSWORD,

  smtpServer:   process.env.SMTP_SERVER,
  sendgridKey:  process.env.SENDGRID_KEY,
  serverEmail:  process.env.SERVER_EMAIL

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});

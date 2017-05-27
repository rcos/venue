'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'venue-secret',

  PORT:  '9000',

  // Mail Server Settings
  EMAIL_SERVICE:    'none',

  SENDGRID_KEY:     '',
  SERVER_EMAIL:     'venueteam@univserity.edu',

  SMTP_SERVER:      'mail@university.edu',
  SMTP_LOGIN:       'venueteam@university.edu',
  SMTP_PASSWORD:    'password',

  // Images Folder
  imageUploadPath: './data/',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};

'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/venue-dev'
  },

  serverURL: process.env.DOMAIN || 'http://127.0.0.1:9000',

  // Images Folder
  imageUploadPath: './data/',

  // Just log outgoing emails
  emailService: process.env.EMAIL_SERVICE || "MOCK",

  // Seed database on startup
  seedDB: true

};

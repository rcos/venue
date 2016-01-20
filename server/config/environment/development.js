'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/venue-dev'
  },

  // Images Folder
  imageUploadPath: './data/',

  // Seed database on startup
  seedDB: true

};

'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/venue-dev'
  },

  // Submission Images Folder
  imageUploadPath: './data/eventImages/',

  // Seed database on startup
  seedDB: true

};

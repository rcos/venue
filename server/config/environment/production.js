'use strict';

import path from 'path';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          9000,

  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_MONGODB_DB_URL +
          process.env.OPENSHIFT_APP_NAME ||
          'mongodb://127.0.0.1/venue'
  },

  // Images Folder
  imageUploadPath: process.env.DATA_DIRECTORY || (process.env.IN_DOCKER ? '/root/data/' : path.resolve('./dist/data') + '/'),
  tmpUploadPath: (process.env.DATA_DIRECTORY || (process.env.IN_DOCKER ? '/root/data/' : path.resolve('./dist/data') + '/'))+"tmp/"

};

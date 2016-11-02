var seed = require('../config/seed').seed;
var auth = require("../auth/local/test.integration");
var app = require("../");

before(function (done){
  this.timeout(25000);
  if (app.isListening) return done();
  app.on('listening', () => {
    done();
  });
});

before(function (done){
  this.timeout(25000);
  seed().then(() => done());
});

before(function (done){
  this.timeout(25000);
  auth.init().then(() => done());
});

var seed = require('../config/seed').seed;
var auth = require("../auth/local/test.integration");
var app = require("../");

before((done) => {
  if (app.isListening) return done();
  app.on('listening', () => {
    done();
  });
});

before((done) => {
    seed().then(() => done());
});

before((done)=>{
    auth.init().then(() => done());
});

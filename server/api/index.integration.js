var seed = require('../config/seed').seed;
var auth = require("../auth/local/test.integration");
var app = require("../");

console.log("GOT HERE");

before((done) => {
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

import {seed, clearDB} from '../config/testingseed';
var auth = require("../auth/local/test.integration");
var app = require("../");

before(function (done){
  this.timeout(25000);
  if (app.isListening) return done();
  app.on('listening', () => {
    done();
  });
});

beforeEach(function (done){
  this.timeout(25000);
  seed().then(() => done());
});

beforeEach(function (done){
  this.timeout(25000);
  auth.init().then(() => {
    console.log("Auth Init");
    done()
  });
});

afterEach(function (done){
  this.timeout(25000);
  console.log("Clear DB");

  clearDB().then(() => done());
});

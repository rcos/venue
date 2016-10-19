var seed = require('../config/seed').seed;
var auth = require("../auth/local/test.integration");
var app = require("../");

// describe("initialize testing", () => {
//   this.timeout(15000);
//
//   it('app should be running', (done) => {
//     if (app.isListening) return done();
//     app.on('listening', () => {
//       done();
//     });
//   });
//
//   it('database should be seeded', (done) => {
//     seed().then(() => done());
//   });
//
//   it('authentication should be initialized', (done)=>{
//     auth.init().then(() => done());
//   });
// });

before(function (done){
  this.timeout(15000);
  if (app.isListening) return done();
  app.on('listening', () => {
    done();
  });
});

before(function (done){
  this.timeout(15000);
  seed().then(() => done());
});

before(function (done){
  this.timeout(15000);
  auth.init().then(() => done());
});

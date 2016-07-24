var seed = require('../config/seed').seed;

before((done) => {
    seed().then(() => done());
});

var app = require('..');
// var request = require('supertest');
// var superagent = require('superagent');
var auth = require("../auth/local/test.integration");

var instructorAccount = {
  "email": "bob@bob.com",
  "password": "bob"
};

before((done)=>{
    auth.init().then(() => done());
})

describe("simple auth request", () => {
    it("should make an authenticated request", (done) => {
        auth.instructor.request(app)
            .post('/api/courses')
            .send({
                 name: "New Course",
                 description: "Course desc"
             })
             .attach('files[0]', './client/assets/images/empac.jpg')
             .expect(201)
             .end((err, res) => {
                 console.log(res.body);
                 done();
             });
    });
});

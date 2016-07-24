var seed = require('../config/seed').seed;

before((done) => {
    seed().then(() => done());
});

var app = require('..');
var request = require('supertest');
var superagent = require('superagent');

var instructorAccount = {
  "email": "bob@bob.com",
  "password": "bob"
};

describe("simple auth request", ()=>{
    it("should make an authenticated request", (done) => {
        var agent = superagent.agent();
        agent
        .post('http://127.0.0.1:9000/auth/local')
        .send(instructorAccount)
        .end((err, res) => {
            if (err) throw err;
            var token = res.body.token;
            var cookie = res.headers['set-cookie'];
            console.log(token, cookie);
            request(app)
                 .post('/api/courses')
                 .set('Cookie', cookie)
                 .set('Authorization', 'Bearer ' + token)
                 .send({
                     name: "New Course",
                     description: "Course desc"
                 })
                 .attach('files[0]', './client/assets/images/empac.jpg')
                 .expect(201)
                 .end((err, res) => {
                     done();
                 })

        });
    });
});

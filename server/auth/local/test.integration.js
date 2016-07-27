/**
 * Sets up auth for supertest testing.
 */

var app = require('../..');
var request = require('supertest');
var superagent = require('superagent');

var studentAccount = {
  "email": "foo@foo.com",
  "password": "foo"
};
var instructorAccount = {
  "email": "bob@bob.com",
  "password": "bob"
};
var adminAccount = {
    "email": "admin@admin.com",
    "password": "admin"
};

var studentAuth = {}, instructorAuth = {}, adminAuth = {};

module.exports.init = () => {
    return Promise.all([
        getAuth(studentAccount).then((auth) => {
            studentAuth.cookie = auth.cookie;
            studentAuth.token = auth.token;
            return Promise.resolve();
        }),
        getAuth(instructorAccount).then((auth) => {
            instructorAuth.cookie = auth.cookie;
            instructorAuth.token = auth.token;
            return Promise.resolve();
        }),
        getAuth(adminAccount).then((auth) =>  {
            adminAuth.cookie = auth.cookie;
            adminAuth.token = auth.token;
            return Promise.resolve();
        })
    ]);
};

function wrapAuth(auth, req){
    return req.set('Cookie', auth.cookie)
              .set('Authorization', 'Bearer ' + auth.token);
}

function authRequest(auth){
    return (app) => {
        var req = request(app);
        return {
            get: (...args) => wrapAuth(auth, req.get(...args)),
            post: (...args) => wrapAuth(auth, req.post(...args)),
            patch: (...args) => wrapAuth(auth, req.patch(...args)),
            delete: (...args) => wrapAuth(auth, req.delete(...args)),
            put: (...args) => wrapAuth(auth, req.put(...args))
        };
    };
}

module.exports.student = { request: authRequest(studentAuth) };
module.exports.instructor = { request: authRequest(instructorAuth) };
module.exports.admin = { request: authRequest(adminAuth) };

function getAuth(account){
    return new Promise((resolve, reject) => {
        var agent = superagent.agent();
        agent
        .post('http://127.0.0.1:9000/auth/local')
        .send(account)
        .end((err, res) => {
            if (err) throw err;
            resolve({
                token: res.body.token,
                cookie: res.headers['set-cookie']
            });
        });
    })
}

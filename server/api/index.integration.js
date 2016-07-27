var seed = require('../config/seed').seed;
var auth = require("../auth/local/test.integration");

before((done) => {
    seed().then(() => done());
});

before((done)=>{
    auth.init().then(() => done());
});

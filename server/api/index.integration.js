var seed = require('../config/seed').seed;

before((done) => {
    seed().then(() => done());
});

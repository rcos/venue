import passport from 'passport';
import {generate as randomString} from 'randomstring';
import {Strategy as CASStrategy} from 'passport-cas';

function casAuthenticate(User, config, schoolId, done) {
    User.findOne({
        email: schoolId + config.schoolEmailSuffix
    })
    .select('_id email provider salt')
    .execAsync()
    .then(user => {
        if (user) {
            return done(null, user);
        }

        // No user? Create a new one
        User.createAsync({
            provider: 'cas',
            firstName: schoolId,
            lastName: '',
            role: 'user',
            email: schoolId + config.schoolEmailSuffix,
            password: randomString({
                length: 32
            }),
            isVerified: true,
            isInstructor: false
        }).then((user) => {
            return done(null, user);
        }).catch((err) => {
            return done(null, false, {
                message: "An error occurred creating the account"
            });
        })
    })
    .catch(err => done(err));
}

export function setup(User, config) {
    passport.use(new CASStrategy({
        version: config.cas.version,
        ssoBaseURL: config.cas.serverURL,
        serverBaseURL: config.serverURL + '/auth/cas'
    }, function(profile, done) {
        var schoolId = profile.user.toLowerCase();
        return casAuthenticate(User, config, schoolId, done);
    }));
}

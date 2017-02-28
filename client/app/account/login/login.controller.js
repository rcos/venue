'use strict';

export default class LoginController {

  /*@ngInject*/
  constructor(Auth, $location, Settings, ENV, CAS_ENABLED, LOCAL_LOGIN_ENABLED, DEBUG_LOGIN_ENABLED) {

    this.user = {};
    this.errors = {};
    this.submitted = false;
    this.devMode = false;

    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$location = $location;
    this.devMode = ENV == "development";
    this.CAS_ENABLED = CAS_ENABLED;
    this.LOCAL_LOGIN_ENABLED = LOCAL_LOGIN_ENABLED;
    this.DEBUG_LOGIN_ENABLED = DEBUG_LOGIN_ENABLED;

    this.settings = {}
    Settings.current({},(response) => {
      this.settings = response;
    },(error) => {
      this.settings = {};
    });

  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then((user) => {
        // Logged in, redirect to Dashboard
        if(!user.isVerified){
          this.$location.path('/verify/emailVerification');
        }
        else if(!user.isInstructor){
          this.$location.path('/student/dashboard');
        }
        else{
          this.$location.path('/instructor/dashboard');
        }
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

  _devLoginAs(user){
    this.user.email = user + "@"+user+".com";
    this.user.password = user;
    return this.login({$valid:true});
  }

}

'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  devMode = false;
  //end-non-standard

  constructor(Auth, $location, ENV, CAS_ENABLED, LOCAL_LOGIN_ENABLED, DEBUG_LOGIN_ENABLED) {
    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$location = $location;
    this.devMode = ENV == "development";
    this.CAS_ENABLED = CAS_ENABLED;
    this.LOCAL_LOGIN_ENABLED = LOCAL_LOGIN_ENABLED;
    this.DEBUG_LOGIN_ENABLED = DEBUG_LOGIN_ENABLED;
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

  goToForgotPassword(){
    this.$location.path("/verify/forgotPassword");
  };

  _devLoginAs(user){
    this.user.email = user + "@"+user+".com";
    this.user.password = user;
    return this.login({$valid:true});
  }

}

angular.module('venueApp')
  .controller('LoginController', LoginController);

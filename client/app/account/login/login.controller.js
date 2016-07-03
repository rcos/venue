'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $location) {
    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$location = $location;
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
    var email = user + "@"+user+".com";
    var pass = user;
    this.Auth.login({
      email: email,
      password: pass
    }).then(() => {
      this.getCurrentUser((user) => {
        // Logged in, redirect to Dashboard
        if(!user.isInstructor){
          this.$location.path('/student/dashboard');
        }
        else{
          this.$location.path('/instructor/dashboard');
        }
      });
    }).catch(err => {
      this.errors.other = err.message;
    });
  }

}

angular.module('venueApp')
  .controller('LoginController', LoginController);

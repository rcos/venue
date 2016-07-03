'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  devMode = false;
  //end-non-standard

  constructor(Auth, $location, ENV) {
    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$location = $location;
    this.devMode = ENV == "development";
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        this.getCurrentUser((user) => {
          // Logged in, redirect to Dashboard
          if(!user.isInstructor){
            this.$location.path('/student/dashboard');
          }
          else{
            this.$location.path('/instructor/dashboard');
          }
        });

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

angular.module('venueApp')
  .controller('LoginController', LoginController);

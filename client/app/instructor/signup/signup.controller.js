'use strict';

class InstructorSignupCtrl {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  form = {};
  //end-non-standard

  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
  }

  register(form) {
      console.log('hisadsasd');
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        isInstructor: true
      })
      .then(() => {
          this.success = true;
      })
      .catch(err => {
          console.error(err.data);
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('venueApp')
  .controller('InstructorSignupCtrl', InstructorSignupCtrl);

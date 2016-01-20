'use strict';

angular.module('venueApp')
  .controller('StudentSubmissionsCtrl', function ($scope, User, Auth, Submission) {
    User.get({'withSections' : true}, (user)=>{
      console.log(user.sections);
      user.sections.forEach((section) => {
        Submission.getAll({"withSection": section._id}, (submissions) => {
          console.log(submissions);
        });
      });
    });
  });

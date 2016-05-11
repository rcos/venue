'use strict';

angular.module('venueApp')
  .controller('VerifyStudentsCtrl', function ($scope, $location, Auth, User, Section) {

    User.get({withSections:true, withSectionsCourse:true, withSectionsPendingStudents:true}, (user)=>{
      $scope.user = user;
      $scope.sections = user.sections;
    });

    $scope.viewSection = function(section){
      $location.path("/courses/"+section.course._id + "/sections/" + section._id);
    };


  });

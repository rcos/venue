'use strict';

angular.module('venueApp')
  .controller('CourseViewCtrl', ($scope, Course, User, Auth, $routeParams) => {
    Course.get({id: $routeParams.id, withSections:true, withSectionInstructors: true}, course => {
      $scope.course = course;
    });

    $scope.enroll = function(section){
      User.enroll({_id: Auth.getCurrentUser()._id, sectionid: section._id});
    };
  });

'use strict';

angular.module('venueApp')
  .controller('CourseViewCtrl', ($scope, Course, User, Auth, $routeParams) => {
    Auth.getCurrentUser((user) => {
      loadCourses();
    });

    $scope.enroll = function(section){
      User.enroll({_id: Auth.getCurrentUser()._id, sectionid: section._id}, ()=>{
        loadCourses();
      })
    };
    $scope.unenroll = function(section){
      User.unenroll({_id: Auth.getCurrentUser()._id, sectionid: section._id}, ()=>{
        loadCourses();
      })
    };

    function loadCourses(){
      Course.get({
        id: $routeParams.id,
        withSections:true,
        withSectionInstructors: true,
        withSectionEnrollmentStatus: true,
        studentid: Auth.getCurrentUser()._id
      }, course => {
        $scope.course = course;
      });
    }

  });

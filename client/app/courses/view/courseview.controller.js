'use strict';

angular.module('venueApp')
  .controller('CourseViewCtrl', ($scope, Course, $location, User, Auth, $routeParams) => {
    Auth.getCurrentUser((user) => {
      $scope.isStudent = !user.isInstructor;
      $scope.isInstructor = user.isInstructor;
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
    $scope.editCourse = function(){
      $location.path($location.path() + "/edit");
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

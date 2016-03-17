'use strict';

angular.module('venueApp')
  .controller('CourseViewCtrl', ($scope, Course, $location, User, Auth, $routeParams) => {
    Auth.getCurrentUser((user) => {
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
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

    $scope.editSection = function(section){
      $location.path($location.path() + "/sections/" + section._id + "/edit");
    };

    $scope.createSection = function(){
      $location.path($location.path() +"/sections/create");
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
      }, err =>{
        $location.path('/courses')
      });
    }

  });

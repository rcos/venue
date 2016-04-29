'use strict';

angular.module('venueApp')
.controller('SectionEditCtrl', function ($scope, $location, $routeParams, User, Auth, Course, Section) {
  var loadSection = function(){
    Section.get({
      id: $routeParams.sectionId,
      withSectionsCourse:true,
      withSectionsEvent: true,
      withSectionsInstructors: true,
      withSectionsStudents: true,
      withSectionsPendingStudents: true
    }, section => {
      $scope.course = section.course;
      $scope.section = section;
    }, () =>{
      $location.path('/courses');
    });
    }
  Auth.getCurrentUser((user) => {
    $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
    $scope.isInstructor = user.isInstructor;
    loadSection();
  });

  $scope.editCourse = function(){
    $location.path('/courses/'+$routeParams.id+'/edit');
  };
  $scope.viewCourse = function(){
    $location.path('/courses/'+$routeParams.id);
  };

  $scope.editSection = function(){
    $location.path($location.path() + '/edit');
  };

  $scope.createSection = function(){
    $location.path('/courses/'+$routeParams.id+'/sections/create');
  };

});

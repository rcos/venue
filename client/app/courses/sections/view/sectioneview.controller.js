'use strict';

angular.module('venueApp')
  .controller('SectionViewCtrl', ($scope, $location, $routeParams, User, Auth, Course, Section) => {
    var loadSection = function(){
      Section.get({
        id: $routeParams.sectionId,
        withSectionsCourse:true,
        withSectionsEvent: true,
        withSectionsInstructors: true,
        withSectionsStudents: true,
        withSectionsPendingStudents: true,
        withEnrollmentStatus: true,
        studentId: $scope.user._id
      }, section => {
        $scope.course = section.course;
        $scope.section = section;
      }, () =>{
        $location.path('/courses');
      });
      }
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
      $scope.isInstructor = user.isInstructor;
      loadSection();
    });

    $scope.enroll = function(){
      User.enroll({_id: $scope.user._id, sectionid: $scope.section._id}, ()=>{
        loadSection();
      });
    };
    $scope.unenroll = function(){
      User.unenroll({_id: $scope.user._id, sectionid: $scope.section._id}, ()=>{
        loadSection();
      });
    };
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

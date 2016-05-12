'use strict';

angular.module('venueApp')
  .controller('CourseViewCtrl', ($scope, $location, $http, $routeParams, Auth, User, Course, Section) => {
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
      $scope.isInstructor = user.isInstructor;
      loadCourses();
    });

    $scope.getImageUrl = function(){
      if($scope.coursesLoaded){
        if(! $scope.imgRetrieve && $scope.coursesLoaded && $scope.course.imageURLs[0].startsWith('/api/')){
          $scope.imgRetrieve = true;
          $http.get($scope.course.imageURLs[0], {responseType: 'arraybuffer'}, )
          .then((response) => {
            var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
            $scope.imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
            return $scope.imageUrl;
          });
        }
        else if($scope.imgRetrieve){
          return $scope.imageUrl;
        }
        else{
          return $scope.course.imageURLs[0];
        }
      }
    }

    $scope.enroll = function(section){
      User.enroll({_id: $scope.user._id, sectionid: section._id}, ()=>{
        loadCourses();
      })
    };
    $scope.unenroll = function(section){
      User.unenroll({_id: $scope.user._id, sectionid: section._id}, ()=>{
        loadCourses();
      })
    };
    $scope.editCourse = function(){
      $location.path($location.path() + "/edit");
    };

    $scope.editSection = function(section){
      $location.path($location.path() + "/sections/" + section._id + "/edit");
    };
    $scope.viewSection = function(section){
      if($scope.isInstructor){
        $location.path("/instructor" + $location.path()+ "/sections/" + section._id);
      }
      else{
        $location.path($location.path()+ "/sections/" + section._id);
      }

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
        studentid: $scope.user._id
      }, course => {
        $scope.course = course;
        $scope.coursesLoaded = true;
        $scope.getImageUrl();
      }, err =>{
        $location.path('/courses')
      });
    }

  });

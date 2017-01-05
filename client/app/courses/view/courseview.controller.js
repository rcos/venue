'use strict';
export default class CourseViewCtrl {

  /*@ngInject*/
  constructor($scope, $location, $http, $routeParams, Auth, User, Course, Section) {
    $scope.isStudent = false;
    $scope.isInstructor = false;
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      if (user.hasOwnProperty('role')){
        $scope.isStudent = (!Auth.isInstructorSync()) && Auth.isLoggedInSync();
        $scope.isInstructor = Auth.isInstructorSync();
      }
      loadCourses();
    });

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
      return "/courses/"+ $routeParams.id + "/edit";
    };

    $scope.editSection = function(section){
      return "/courses/"+ $routeParams.id + "/sections/" + section._id + "/edit"
    };
    $scope.viewSection = function(section){
      if($scope.isInstructor){
        return "/instructor/courses/"+ $routeParams.id + "/sections/" + section._id
      }
      else{
        return "/courses/"+ $routeParams.id + "/sections/" + section._id
      }

    };

    $scope.createSection = function(){
      return "/courses/"+ $routeParams.id + "/sections/create"
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
      }, () =>{
        $location.path('/courses')
      });
    }

  }
}

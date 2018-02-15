'use strict';
export default class CourseViewCtrl {

  /*@ngInject*/
  constructor($scope, $location, $http, $routeParams, Auth, User, Course, Section) {
    loadCourse();

    $scope.enroll = function(section){
      User.enroll({_id: $scope.user._id, sectionid: section._id}, ()=>{
        loadCourse();
      })
    };
    $scope.unenroll = function(section){
      User.unenroll({_id: $scope.user._id, sectionid: section._id}, ()=>{
        loadCourse();
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

    function loadCourse(){
      var user = Auth.getCurrentUserSync().$promise;
      if (user) {
        user.then((user) => {
          Course.get({
            id: $routeParams.id,
            withSections:true,
            withSectionInstructors: true,
            withSectionEnrollmentStatus: true,
            studentid: user._id,
            checkRoles: true
          }, course => {
            $scope.course = course;
            $scope.coursesLoaded = true;
            $scope.isSupervisor = course.roleDict['supervisor'];
            $scope.isInstructor = course.roleDict['instructor'];
            $scope.isStudent = course.roleDict['student'];
          }, () =>{
            $location.path('/courses')
          });
        })
      } else { // if user is not logged in
        Course.get({
          id: $routeParams.id,
          withSections:true,
          withSectionInstructors: true,
          withSectionEnrollmentStatus: true,
          checkRoles: true
        }, course => {
          $scope.course = course;
          $scope.coursesLoaded = true;
          $scope.isSupervisor = course.roleDict['supervisor'];
          $scope.isInstructor = course.roleDict['instructor'];
          $scope.isStudent = course.roleDict['student'];
        }, () =>{
          $location.path('/courses')
        });
      }
      
      
      
    }

  }
}

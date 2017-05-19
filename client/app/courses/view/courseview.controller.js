'use strict';
export default class CourseViewCtrl {

  /*@ngInject*/
  constructor($scope, $location, $http, $routeParams, Auth, User, Course, Section,SweetAlert){
    $scope.isStudent = false;
    $scope.isInstructor = false;
    $scope.same_creator = false;
    $scope.once = 1;
    var creator;
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
    $scope.deleteCourse = function(){

      var courseid = $routeParams.id;
      SweetAlert.swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this course!",
        type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete the course!",
         cancelButtonText: "Cancel",
         closeOnConfirm: false,
         closeOnCancel: false },
         function(isConfirm){
           if (isConfirm) {
             SweetAlert.swal("Deleted!", "Your course has been deleted.", "success");
             Course.delete({id: courseid}, (res) => {
               $location.path("/instructor/dashboard");
               })
           } else {
             SweetAlert.swal("Cancelled", "Course is not deleted.", "error");
           }
         });
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
      if($scope.course.creator == $scope.user._id){
        $scope.same_creator = true;
      }
      }, () =>{
        $location.path('/courses')
      });
    }

  }
}

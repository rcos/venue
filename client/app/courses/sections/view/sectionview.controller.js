'use strict';
export default class SectionViewCtrl {

  /*@ngInject*/
  constructor($scope, $location, $routeParams, User, Auth, Course, Submission, Section) {
    var loadSection = function(){
      Section.get({
        id: $routeParams.sectionId,
        withSectionsCourse:true,
        withSectionsEvent: true,
        withSectionsInstructors: true,
        withSectionsAssistants: true,
        withSectionsStudents: true,
        withEnrollmentStatus: true,
        studentId: $scope.user._id
      }, section => {
        $scope.course = section.course;
        $scope.section = section;
        //console.log(section.teachingAssistants)
      }, () =>{
        $location.path('/courses');
      });
      }
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
      $scope.isInstructor = user.isInstructor;
      if ($scope.isInstructor){
        $location.path('instructor/courses/'+$routeParams.id+'/sections/'+$routeParams.sectionId);
      }
      loadSection();
      
    });

    $scope.selecteEvent = function(event){
      $scope.sectionEventSubmissions(event);
    };

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
    $scope.viewCourse = function(){
       //console.log(section)
      $location.path('/courses/'+$routeParams.id);
    };
  }
}

'use strict';
export default class SectionEditCtrl {

  /*@ngInject*/
  constructor($scope, $location, $routeParams, User, Auth, Course, Section) {
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

  }
}

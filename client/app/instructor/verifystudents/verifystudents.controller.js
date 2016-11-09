'use strict';
export default class VerifyStudentsCtrl {

  /*@ngInject*/
  constructor($scope, $location, Auth, User, Section) {
    User.get({withSections:true, withSectionsCourse:true, withSectionsPendingStudents:true}, (user)=>{
      $scope.user = user;
      $scope.sections = user.sections;
    });

    $scope.viewSection = function(section){
      return "/instructor/courses/"+section.course._id + "/sections/" + section._id;
    };


  }
}

'use strict';
export default class StudentSubmissionsCtrl {

  /*@ngInject*/
  constructor($scope, $location, User, Auth, Submission) {
    Submission.getAll({'onlyInstructor': 'me', 'withStudents': true, 'withSection': true, 'withSectionCourse': true}, (submissions)=>{
      $scope.submissions = submissions;
    });

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };
  }
}

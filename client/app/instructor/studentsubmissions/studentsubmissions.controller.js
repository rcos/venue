'use strict';
export default class StudentSubmissionsCtrl {

  /*@ngInject*/
  constructor($scope, $location, User, Auth, Submission) {
    $scope.refreshSubmissions = function() {
      Submission.getAll({'onlyInstructor': 'me', 'withStudents': true, 'withSection': true, 'withSectionCourse': true}, (submissions)=>{
        $scope.submissions = submissions;
      });
    }
    $scope.refreshSubmissions();

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };
  }
}

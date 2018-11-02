'use strict';
export default class GradingCtrl {

  /*@ngInject*/
  constructor($scope, $location, User, Auth, Submission) {
    $scope.refreshSubmissions = function() {
      Submission.getAll({}, (submissions)=>{
        $scope.submissions = submissions;
      });
    }
    $scope.refreshSubmissions();

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };
  }
}

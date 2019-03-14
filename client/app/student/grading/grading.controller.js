'use strict';
export default class GradingCtrl {

  /*@ngInject*/
  constructor($scope, $location, User, Auth, Submission) {
    $scope.current_user = Auth.getCurrentUserSync();
    // $scope.ta_sections = Auth.getCurrentUserSync().taSections;
    // this.getCurrentUser = Auth.getCurrentUserSync;

    //This retreives the appropriate submissions with this user as the TA
    //Doesn't work yet
    $scope.refreshSubmissions = function() {
      Submission.getAll({'onlyTA':'me', 'withStudents': true, 'withSection':true, 'withSectionCourse':true}, (submissions)=>{
        $scope.submissions = submissions;
      });
    }
    // $scope.refreshSubmissions = function() {
    //   Submission.getAll({}, (submissions)=>{
    //     $scope.submissions = submissions;
    //   });
    // }
    $scope.refreshSubmissions();

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };
  }
}

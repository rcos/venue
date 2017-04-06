'use strict';
export default class StudentSubmissionsCtrl {

  /*@ngInject*/
  constructor($scope, $location, $uibModal, User, Auth, Submission) {
    Submission.getAll({'onlyInstructor': 'me', 'withStudents': true, 'withSection': true, 'withSectionCourse': true}, (submissions)=>{
      $scope.submissions = submissions;
    });

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };
    $scope.editSubmission = (submission) => {
      console.log("editSubmission")
      var modalInstance = $uibModal.open({
        template: require('../../../components/submissionEdit/submissionEdit.html'),
        controller: 'SubmissionEditCtrl',
        size: 'lg',
        // backdrop : 'static',

        resolve: {
          submissionId: function () {
            return  submission._id;
          },
        }
      });

      modalInstance.result.then(function (changedSubmission) {
        // $window.location.reload();
        submission = changedSubmission;
      }, function(){

      });
    }

  }
}

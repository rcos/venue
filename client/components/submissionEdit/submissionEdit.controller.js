'use strict';
export function SubmissionEditCtrl($scope, $filter, $uibModalInstance,  Auth, Submission, Section, SectionEvent){
    "ngInject";
    $scope.viewMode = 'small';
    $scope.submissionFilter = 'submitted';
    $scope.isInstructor = false;
    $scope.selectedSections = [];
    $scope.selectedEvents = [];
    $scope.allEvents = {};
    console.log("$scope.submissionId",$scope.$resolve.submissionId);
    Auth.getCurrentUser((user) => {
      if (user.isInstructor){
        $scope.isInstructor = true;
      }
    })

    Submission.get({ id: $scope.$resolve.submissionId, withSection: true, withSectionCourse: true}, (submission)=>{
      console.log(submission)
      $scope.submission = submission;
      if ($scope.isInstructor){
        for (var a = 0; a < submission.instructorApproval.length; a++){
          if (submission.instructorApproval[a].instructor._id == $scope._id){
            $scope.userVerification = submission.instructorApproval[a];
          }
        }
      }
    });

    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.save = function() {
      $uibModalInstance.close(submission);
    };

  };

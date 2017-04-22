'use strict';
export function SubmissionEditCtrl($scope, $filter, $uibModalInstance,  Auth, Submission, Section, SectionEvent){
    "ngInject";
    $scope.viewMode = 'small';
    $scope.submissionFilter = 'submitted';
    $scope.isInstructor = false;
    $scope.selectedSections = [];
    $scope.selectedEvents = [];
    $scope.allEvents = {};
    $scope.editingVerification = false;
    $scope.thisInstructionVerification = {};
    Auth.getCurrentUser((user) => {
      if (user.isInstructor){
        $scope.isInstructor = true;
        $scope.user=user
      }
      getSubmission();
    })

    var getSubmission = function(){
      Submission.get({ id: $scope.$resolve.submissionId, withSection: true, withSectionCourse: true}, (submission)=>{
        $scope.submission = submission;
        if ($scope.isInstructor){
          $scope.alreadyVerified = false;
          for (var a = 0; a < submission.instructorApproval.length; a++){
            if (submission.instructorApproval[a].instructor._id == $scope.user._id){
              $scope.thisInstructionVerification = submission.instructorApproval[a];
              $scope.alreadyVerified = true;
              submission.instructorApproval.splice(a,1);
              break;
            }
          }
          if ($scope.alreadyVerified){
            submission.instructorApproval.unshift($scope.thisInstructionVerification)
          }
        }
      });
    };

    $scope.addVerify = function(){
      $scope.editingVerification = true;
      $scope.verifyEdit = $scope.submission.instructorVerification;
;
      $scope.verifyComments = "";

      if ($scope.alreadyVerified){
        $scope.verifyComments = $scope.thisInstructionVerification.comments;
      }
    };
    $scope.cancelVerify = function(){
      $scope.editingVerification = false;
    };

    $scope.saveVerify = function(form){

    }
    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function() {
      $uibModalInstance.close(submission);
    };

  };

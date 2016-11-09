'use strict';
export default class EventsCtrl {
  /*@ngInject*/
  constructor($scope, $location, $routeParams, SectionEvent, Auth) {
    $scope.assignment = {};
    Auth.getCurrentUser((user) => {$scope.user = user});
    $scope.eventId = $routeParams.id;

    $scope.sectionStudent = false;
    $scope.sectionInstructor = false;

    $scope.updateEvent = function(){
      $scope.event = SectionEvent.get({
        id: $routeParams.id,
        withEventInfo: true,
        withEventInfoAuthor: true,
        withSectionCourse: true,
        withSectionInstructors: true,
        withAuthor: true,
        withSection: true
      },
        sectionEvent => {
          $scope.event = sectionEvent;
          if (sectionEvent.section.students.indexOf($scope.user._id) !== -1)
          {
            $scope.sectionStudent = true;
          }
          if (sectionEvent.section.instructors.map((elem)=>elem._id).indexOf($scope.user._id) !== -1)
          {
            $scope.sectionInstructor = true;
          }

        },
        err => {
          $scope.err = err;
        });
    };

    $scope.eventChanged = function(){
      $scope.editting = false;
      $scope.updateEvent();
    };

    $scope.updateEvent();

    $scope.viewEventUpload = function(){
      return "/student/upload/" + $scope.eventId;
    };

    $scope.deleteEvent = function(event){
      $scope.confirm = true;
    };

    $scope.confirmDeleteEventAssignment = function(event){
      $scope.confirm = false;
      SectionEvent.delete({id:event._id}, (response)=>{
        $location.path("/instructor/events");
      })
    };

    $scope.cancelDeleteEventAssignment = function(event){
      $scope.confirm = false;
    };

    $scope.editAssignemnt = function(){
      $scope.assignment = { submissionInstructions : $scope.event.submissionInstructions.slice(0)};
      $scope.assignmentEdit = true;
    };

    $scope.updateEventAssignment = function(form){
        $scope.submitted = true;
        if (form.$valid){
          var sectionEvent = {
            _id: $scope.event._id,
            submissionInstructions: $scope.assignment.submissionInstructions
          };
          SectionEvent.update(sectionEvent).$promise
          .then((course) => {
            $scope.assignmentEdit = false;
            $scope.updateEvent();
          })
          .catch(err => {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, (error, field) => {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        }
      };
  }
}

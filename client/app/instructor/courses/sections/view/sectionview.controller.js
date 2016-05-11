'use strict';

angular.module('venueApp')
  .controller('InstructorSectionViewCtrl', ($scope, $location, $routeParams, User, Auth, Course, Submission, Section) => {
    componentHandler.upgradeDom();
    function loadCurrentUserSection(){
      Section.get({
        id: $routeParams.sectionId,
        withSectionsCourse:true,
        withSectionsEvent: true,
        withSectionsInstructors: true,
        withSectionsStudents: true,
        withSectionsPendingStudents: true,
        withEnrollmentStatus: true,
        studentId: $scope.user._id
      }, section => {
        $scope.course = section.course;
        $scope.section = section;
        console.log(section);
        if(section.events.length > 0){
          $scope.loadSectionEventSubmissions(section.events[0]);
        }
        // TODO: automate by first index of events for Section.
      }, () =>{
        $location.path('/courses');
      });
    }

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
      $scope.isInstructor = user.isInstructor;
      loadCurrentUserSection();
    });

    $scope.loadSectionEventSubmissions = function(event){
      var sectionEvent = event.sectionEvents.find((sectEvent)=>{
        return sectEvent.section._id == $routeParams.sectionId;
      })
      $scope.selectedEventId = event._id;
      console.log($scope.selectedEventId);
      Submission.getAll({'onlySectionEvent': sectionEvent._id, 'withStudents': true}, (submissions)=>{
        $scope.submissions = submissions;
        console.log("got new submissions");
        console.log(submissions);
        findStudentSubmission();
      });
    };

    function findStudentSubmission(){
      for(var i=0; i < $scope.section.students.length; i++){
        $scope.section.students[i].submission = '';
        for(var j=0; j < $scope.submissions.length; j++){
          if($scope.section.students[i]._id == $scope.submissions[j].submitter._id){
            $scope.section.students[i].submission = $scope.submissions[j];
          }
        }
      }
    }

    $scope.selectEvent = function(event){
      $scope.selectedEventId = event._id;
      $scope.loadSectionEventSubmissions(event);
    };

    $scope.editCourse = function(){
      $location.path('/courses/'+$routeParams.id+'/edit');
    };

    $scope.viewCourse = function(){
      $location.path('/courses/'+$routeParams.id);
    };

    $scope.editSection = function(){
      $location.path($location.path() + '/edit');
    };

  });

'use strict';

angular.module('venueApp')
  .controller('SectionViewCtrl', ($scope, $location, $routeParams, User, Auth, Course, Submission, Section) => {
    var loadSection = function(){
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
        // TODO: automate by first index of events for Section.
        $scope.loadSectionEventSubmissions(section.events[0].sectionEvents[0]);
      }, () =>{
        $location.path('/courses');
      });
      }
    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
      $scope.isInstructor = user.isInstructor;
      loadSection();
    });

    $scope.loadSectionEventSubmissions = function(sectionEvent){
      Submission.getAll({'onlySectionEvent': sectionEvent._id, 'withStudents': true}, (submissions)=>{
        $scope.submissions = submissions;
        findStudentSubmission();
      });
    };

    function findStudentSubmission(){
      for(var i=0; i < $scope.section.students.length; i++){
        for(var j=0; j < $scope.submissions.length; j++){
          if($scope.section.students[i]._id == $scope.submissions[j].submitter._id){
            $scope.section.students[i].submission = $scope.submissions[j];
          }
        }
      }
    }

    $scope.selecteEvent = function(event){
      $scope.sectionEventSubmissions(event);
    };

    $scope.enroll = function(){
      User.enroll({_id: $scope.user._id, sectionid: $scope.section._id}, ()=>{
        loadSection();
      });
    };
    $scope.unenroll = function(){
      User.unenroll({_id: $scope.user._id, sectionid: $scope.section._id}, ()=>{
        loadSection();
      });
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

    $scope.studentManagement = function(){
      $location.path($location.path() + '/studentmanagement');
    };

    $scope.createSection = function(){
      $location.path('/courses/'+$routeParams.id+'/sections/create');
    };

  });

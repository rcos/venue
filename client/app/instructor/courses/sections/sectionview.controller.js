'use strict';
export default class InstructorSectionViewCtrl implements OnInit{

  // This updates material lite with dynamic elements that otherwise aren't
  // captured
  ngOnInit() {
    componentHandler.upgradeDom();
  }

  /*@ngInject*/
  constructor($scope, $location, $routeParams, Auth, Course, Submission, Section) {
    // This updates material lite with dynamic elements that otherwise aren't
    // captured
    // Current event selected by instructor
    $scope.currentEventSelection = null;

    // Loads section information for the current page
    function loadPageSection(){
      Section.get({
        id: $routeParams.sectionId,
        withSectionsCourse:true,
        withSectionsEvent: true,
        withSectionsInstructors: true,
        withSectionsStudents: true,
        withSectionsPendingStudents: true,
        withSectionsAssistants: true,
        withEnrollmentStatus: true,
        studentId: $scope.user._id
      }, section => {
        $scope.course = section.course;
        $scope.section = section;
      }, () =>{
        $location.path('/courses');
      });
    }

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      $scope.isStudent = (!user.isInstructor) && Auth.isLoggedIn();
      $scope.isInstructor = user.isInstructor;
      if ($scope.isStudent){
        $location.path('courses/'+$routeParams.id+'/sections/'+$routeParams.sectionId);
      }
      loadPageSection();
      loadCourse();
    });

    var findStudentSubmission = function(){
      for(var i=0; i < $scope.section.students.length; i++){
        $scope.section.students[i].submission = '';
        for(var j=0; j < $scope.submissions.length; j++){
          if($scope.section.students[i]._id === $scope.submissions[j].submitter._id){
            $scope.section.students[i].submission = $scope.submissions[j];
          }
        }
      }
    };

    $scope.goToEvent = (event) => {
      var sectionEvent = event.sectionEvents.find((sectEvent)=>{
        return sectEvent.section._id === $routeParams.sectionId;
      });
      $location.path("/events/" + sectionEvent._id);
    };

    $scope.loadSectionEventSubmissions = function(event){
      $scope.currentEventSelection = event;
      var sectionEvent = event.sectionEvents.find((sectEvent)=>{
        return sectEvent.section._id === $routeParams.sectionId;
      });
      $scope.selectedEventId = event._id;
      Submission.getAll({'onlySectionEvent': sectionEvent._id, 'withStudents': true}, (submissions)=>{
        $scope.submissions = submissions;
        findStudentSubmission();
      });
    };

    $scope.verifyPendingStudent = (pendingStudent) => {
      var section = $scope.section;
      var promise;
      promise = Section.update({id: section._id}, {pendingStudent: pendingStudent._id}).$promise;

      promise
        .then((section) => {
          loadPageSection();
        })
        .catch(err => {
          alert("Student with id: " + pendingStudent._id + " did not save to section with id: " + section._id);
        });
    };

    $scope.ignorePendingStudent = (pendingStudent) => {
      var section = $scope.section;
      Section.update({id: section._id}, {removePendingStudent: pendingStudent._id}, () => {
          loadPageSection();
        });
    };

    $scope.removeStudent = (pendingStudent) => {
      var section = $scope.section;
      Section.update({id: section._id}, {removeStudent: pendingStudent._id}, () => {
          loadPageSection();
        });
    };

    $scope.selectEvent = function(event){
      $scope.selectedEventId = event._id;
      $scope.loadSectionEventSubmissions(event);
    };

    $scope.viewEditSection = function(){
      return '/courses/' + $routeParams.id + '/sections/' + $routeParams.sectionId + '/edit'
    };

    $scope.selectStudent = function(student){
      $scope.selectedStudent = student;
    };

    function loadCourse(){
      var user = Auth.getCurrentUserSync().$promise;
      if (user) {
        user.then((user) => {
          Course.get({
            id: $routeParams.id,
            studentid: user._id,
            checkRoles: true
          }, course => {
            $scope.isSupervisor = course.roleDict['supervisor'];
            $scope.isInstructor = course.roleDict['instructor'];
            $scope.isStudent = course.roleDict['student'];
          });
        })
      } else {
        Course.get({
          id: $routeParams.id,
          checkRoles: true
        }, course => {
          $scope.isSupervisor = course.roleDict['supervisor'];
          $scope.isInstructor = course.roleDict['instructor'];
          $scope.isStudent = course.roleDict['student'];
        });
      }

    }

  }

  ngOnInit(): any {
    componentHandler.upgradeDom();
  }
}

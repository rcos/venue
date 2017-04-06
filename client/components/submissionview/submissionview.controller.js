'use strict';
export function SubmissionViewCtrl($scope, $filter, $uibModal, Auth, Submission, Section, SectionEvent){
    "ngInject";
    $scope.viewMode = 'small';
    $scope.submissionFilter = 'submitted';
    $scope.isInstructor = false;
    Auth.getCurrentUser((user) => {
      if (user.isInstructor){
        $scope.isInstructor = true;
      }
    })
    $scope.selectedSections = [];
    $scope.selectedEvents = [];
    $scope.allEvents = {};

    var updateSectionEvents = function(){
      if ($scope.eventId){
        SectionEvent.get({id: $scope.eventId, withEventInfo:true},(sectionEvent) => {
          $scope.mainSectionEvent = sectionEvent;

          // Get section events that have been assigned the same event info and were assigned in sections that
          // this instructor teaches
          SectionEvent.getAll({ withEventInfo: true, onlyUserSections: 'me', onlyEvent: sectionEvent.info._id, withSection:true, withSectionStudents: true}, processSectionEvents);
        });
      }
      else{
        SectionEvent.getAll({ withEventInfo: true, onlyUserSections: 'me', withSection:true, withSectionStudents: true}, processSectionEvents);
      }
    }

    var processSectionEvents = function(instructorSEs){
      $scope.allEvents = Object.keys(instructorSEs)
          .map(k => instructorSEs[k])
          .filter((event) => event && event._id);

      $scope.allSectionEvents =
        Object.keys(instructorSEs) // Convert to list of keys
          // get all section events, array is now  ~[[SectionEvent, SectionEvent], [SectionEvent], ...]
          .map((k) => {
            var value = instructorSEs[k];
            var sectionEvents = []
            if (value._id){
              sectionEvents = value.sectionEvents;
              sectionEvents.forEach((se) => {
                se.info = {
                  _id: value._id,
                  description: value.description,
                  id: value.id,
                  title: value.title
                }
              })
            }
            return sectionEvents;
          })
          // Filter out bad keys (these come up b/c there are promise object keys)
          .filter(a => a)
          // Flatten the array to make it [SectionEvent, SectionEvent, SectionEvent, ...]
          .reduce((a,b) => a.concat(b), [])
          .map((se) => {
            se.selected = se._id == $scope.eventId;
            if (se.selected) $scope.selectedSections.push(se.section);
            return se;
          });
      if (!$scope.eventId){
        $scope.selectedSections = [];
        $scope.allSectionEvents.forEach((se) => {
          se.selected = true;
          $scope.selectedSections.push(se.section)
        });
      }
      $scope.selectedEvents = [];
      $scope.allEvents.forEach((event) => {
          event.selected = true;
          $scope.selectedEvents.push(event);
      });

      Promise.all($scope.allSectionEvents.map(
        (se) =>  Submission.getAll({
          onlySectionEvent: se._id,
          withSection:true,
          withSectionCourse:true
        }).$promise
      )).then( (sectionSubmissions) => {
        $scope.submissions = sectionSubmissions.reduce((a,b) => a.concat(b), []).filter(a => a);
        associateStudentsWithSubmissions();
        $scope.$apply();
      });
    }

    var associateStudentsWithSubmissions = function(){
      $scope.allStudents = $scope.allSectionEvents.map((se) => se.section.students)
        .reduce((a,b) => a.concat(b))
        .map((student) => {
          student.submissions = $scope.submissions.filter(
            (submission) => submission.submitter._id == student._id
          );
          return student;
        });

      $scope.submissions.forEach(
        (s) => {s.submitter.name = `${s.submitter.firstName} ${s.submitter.lastName}`}
      );
      $scope.editSubmission($scope.submissions[0]); //TODO : remove
      // console.log("What is happening?")
      // Create empty submissions for students that did not submit for each section event
      $scope.allSectionEvents.forEach((se) => {
        var studentsInSection = se.section.students;
        var studentsThatDidNotSubmit = studentsInSection.filter(
          (student) => student.submissions.filter((sub) => sub.sectionEvent._id == se._id).length == 0
        );
        studentsThatDidNotSubmit.forEach((student) => {
          student.name = student.firstName + ' ' + student.lastName;
          $scope.submissions.push({
            submitter: student,
            didNotSubmit: true,
            images: [],
            content: "",
            sectionEvent: se
          });
        });
      });
    }

    // ------------------
    // UI Event Triggers
    // ------------------

    $scope.toggleSectionEvent = (se) => {
      se.selected = !se.selected;
      if (se.selected){
        $scope.selectedSections.push(se.section);
      }else{
        $scope.selectedSections.splice($scope.selectedSections.indexOf(se.section), 1);
      }
    };

    $scope.toggleEvent = (event) => {
      event.selected = !event.selected;
      if (event.selected){
        $scope.selectedEvents.push(event);
      }else{
        $scope.selectedEvents.splice($scope.selectedEvents.indexOf(event), 1);
      }
    };

    $scope.setViewMode = (viewMode) => {
      $scope.viewMode = viewMode;
    };

    $scope.setSubmissionFilter = (filter) => {
      $scope.submissionFilter = filter;
    };

    $scope.getDataAsCSV = () => {
      var csv = [];
      csv.push(['Student Name', 'Submitted', 'Validated', 'Course', 'Submission Content', 'Image']);
      csv = csv.concat(
        $filter('visibleSubmission')($scope.submissions,$scope.selectedSections ,$scope.submissionFilter , $scope.searchName).map((sub) =>
          [sub.submitter.name, !sub.didNotSubmit ? 'yes' : 'no', sub.valid ? 'yes': 'no',
          sub.sectionEvent.section.course.department + sub.sectionEvent.section.course.courseNumber,
          sub.content, sub.images.join(' ')])
        );
      return csv;
    };

    $scope.editSubmission = (submission) => {
      console.log("editSubmission")
      var modalInstance = $uibModal.open({
        template: require('../submissionEdit/submissionEdit.html'),
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


    updateSectionEvents();

  };

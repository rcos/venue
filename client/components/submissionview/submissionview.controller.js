'use strict';

angular.module('venueApp')
  .filter('visibleSubmission', function(){
    return (subs, selectedSections, submissionFilter, searchName) => {
      if (!subs) return [];
      return subs.filter((sub) => {
        if (!sub) return false;
        if (selectedSections.filter((sec) => sec._id == sub.sectionEvent.section._id).length == 0) return false;
        if (sub.didNotSubmit && submissionFilter == "submitted") return false;
        if (!sub.valid && submissionFilter == "validated") return false;
        var submitterName = (sub.submitter.firstName + " " + sub.submitter.lastName).toLowerCase();
        if (searchName && searchName != "" && submitterName.indexOf(searchName) == -1) return false;

        return true;
      });
    };
  })
  .controller('SubmissionViewCtrl', function($scope, $filter, Auth, Submission, Section, SectionEvent){

    $scope.viewMode = 'small';
    $scope.submissionFilter = 'submitted';

    $scope.selectedSections = [];

    SectionEvent.get({id: $scope.eventId, withEventInfo:true}, (sectionEvent) => {

      $scope.mainSectionEvent = sectionEvent;

      function loadAllSubmissions(){
        Promise.all($scope.allSectionEvents.map(
          (se) =>  Submission.getAll({onlySectionEvent: se._id, withSection:true, withSectionCourse:true}).$promise
        )).then( sectionSubmissions => {
          $scope.submissions = sectionSubmissions.reduce((a,b) => a.concat(b), []).filter(a => a);
          associateStudentsWithSubmissions();
          $scope.$apply();
        });
      }

      function associateStudentsWithSubmissions(){
          $scope.allStudents = $scope.allSectionEvents.map((se) => {
            return se.section.students;
          }).reduce((a,b) => a.concat(b)).map((student) => {
            student.submissions = $scope.submissions.filter((submission) => submission.submitter._id == student._id);
            return student;
          });

          $scope.submissions.forEach(s => {s.submitter.name = `${s.submitter.firstName} ${s.submitter.lastName}`});

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

      // Get section events that have been assigned the same event info and were assigned in sections that
      // this instructor teaches
      SectionEvent.getAll({ withEventInfo: true, onlyUserSections: 'me', onlyEvent: sectionEvent.info._id, withSection:true, withSectionStudents: true}, (instructorSEs) => {
        $scope.allSectionEvents =
          Object.keys(instructorSEs) // Convert to list of keys
              // get all section events, array is now  ~[[SectionEvent, SectionEvent], [SectionEvent], ...]
              .map(k => instructorSEs[k].sectionEvents)
              // Filter out bad keys (these come up b/c there are promise object keys)
              .filter(a => a)
              // Flatten the array to make it [SectionEvent, SectionEvent, SectionEvent, ...]
              .reduce((a,b) => a.concat(b), [])
              .map((se) => {
                se.selected = se._id == $scope.eventId;
                if (se.selected) $scope.selectedSections.push(se.section);
                return se;
              });
        loadAllSubmissions();
      });

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

    });
  });

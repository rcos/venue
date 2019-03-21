'use strict';
export function SubmissionViewCtrl($scope, $filter, Auth, Submission, Section, SectionEvent){
    "ngInject";
    $scope.viewMode = 'small';
    $scope.submissionFilter = 'submitted';
    $scope.isInstructor = false;
    //determine whether the user is an instructor or not
    Auth.getCurrentUser((user) => {
      if (user.isInstructor){
        $scope.isInstructor = true;
      }
    });
    $scope.selectedSections = [];
    $scope.selectedEvents = [];
    $scope.allEvents = {};

    //continually checks to see if someone is inputting a new submission
    var submissionsWatch = $scope.$watch("$parent.$parent.$parent.submissions", function() {
      $scope.submissions = $scope.$parent.$parent.$parent.submissions;
    });

    //function to get the events for the current instructor
    var updateSectionEvents = function(){
      if ($scope.eventId){
        SectionEvent.get({id: $scope.eventId, withEventInfo:true},(sectionEvent) => {
          $scope.mainSectionEvent = sectionEvent;

          //get the event with the specified id and the section of that event that is assigned to the instructor
          SectionEvent.getAll({ withEventInfo: true, onlyUserSections: 'me', onlyEvent: sectionEvent.info._id, withSection:true, withSectionStudents: true}, processSectionEvents);
        });
      }
      //getting all the events and sections of those events that are assigned to the instructor
      else{
        SectionEvent.getAll({ withEventInfo: true, onlyUserSections: 'me', withSection:true, withSectionStudents: true}, processSectionEvents);
      }
    }

    //creating a map of all the events for the given instructor
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
      //if the selected event does not equal the current eventID
      if (!$scope.eventId){
        //create an empty array for the selectedSections
        $scope.selectedSections = [];
        //for the selected event, put it in the selectedSections array and set its selected variable to true
        $scope.allSectionEvents.forEach((se) => {
          se.selected = true;
          $scope.selectedSections.push(se.section)
        });
      }
      //pushing the events selected into an array
      $scope.selectedEvents = [];
      $scope.allEvents.forEach((event) => {
          event.selected = true;
          $scope.selectedEvents.push(event);
      });

      //promise that we only provide the correct section of the course
      //then we go through the submissions for that section and call associateStudentsWithSubmissions()
      //to assign the students to their submission
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
      //creating a map of all the students in the event
      $scope.allStudents = $scope.allSectionEvents.map((se) => se.section.students)
        .reduce((a,b) => a.concat(b))
        //for each student find their submission and then find the id for the submission
        //and return it to the map
        .map((student) => {
          student.submissions = $scope.submissions.filter(
            (submission) => submission.submitter._id == student._id
          );
          return student;
        });

      //assigning each student to the correct sumbission
      $scope.submissions.forEach(
        (s) => {s.submitter.name = `${s.submitter.firstName} ${s.submitter.lastName}`}
      );

      // Checking for students in current section that did not make a submission
      // if they did not submit then make their sumbission empty
      $scope.allSectionEvents.forEach((se) => {
        var studentsInSection = se.section.students;
        //find students that did not submit
        var studentsThatDidNotSubmit = studentsInSection.filter(
          (student) => student.submissions.filter((sub) => sub.sectionEvent._id == se._id).length == 0
        );
        //creating an empty submission
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

    $scope.validateSubmission = function(s){
      Submission.patch({
        _id: s._id,
        verified: true
      }, (updatedSubmission) => {
        s.verified = true;
      });
    };

    updateSectionEvents();

  };

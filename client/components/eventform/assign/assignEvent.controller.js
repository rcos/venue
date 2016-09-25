// https://github.com/angular-ui/angular-google-maps/blob/master/example/assets/scripts/controllers/issue-624-drawing-manager.js
'use strict';

export default class AssignEventFormCtrl {
  /*@ngInject*/
  constructor($scope, Auth, EventInfo, User, SectionEvent, Upload){
    $scope.event = {};
    $scope.eventInfo = $scope.eventContainer.info;

    User.get({withSections:true, withSectionCourse:true}, (user) => {
      var coursesObj = {};
      user.sections.forEach((section) => {
        var course = coursesObj[section.course._id] || section.course;
        course.sections = course.sections || [];
        course.sections.push(section);
        coursesObj[section.course._id] = course;
      });
      $scope.courses = _.values(coursesObj);
    });

    $scope.isActiveCourse = function(course){
      return course.sections.every((section) => section.active);
    };

    $scope.selectCourse = function(course){
      if ($scope.isActiveCourse(course)){
        course.sections.forEach((section) => {
          section.active = false;
        });
      }else{
        course.sections.forEach((section) => {
          section.active = true;
        });
      }
    };

    $scope.onSectionClick = function(section){
      section.active = !section.active;
    };

    function getSectionIds(){
      window.courses = $scope.courses;
      var sections = $scope.courses
        .reduce((prev,course) => prev.concat(course.sections), [])
        .filter((section)=>section.active)
        .map((section) => section._id);
      return sections;
    }

    $scope.submitEventAssignment = function(form){
        $scope.submitted = true;
        if(getSectionIds().length == 0){
          $scope.eventAssignmentSectionsError = true;
          return;
        }
        if (form.$valid){
          var sections = getSectionIds();
          var createdSuccess = 0;
          var createSectionEventsPromises = [];
          sections.forEach((sectionId)=>{
            var sectionEvent = {
              section: sectionId,
              info: $scope.eventInfo._id,
              author: Auth.getCurrentUser()._id,
              submissionInstructions: $scope.event.submissionInstructions
            };
            createSectionEventsPromises.push(SectionEvent.create(sectionEvent))
            Promise.all(createSectionEventsPromises)
              .then((course) => {
                $scope.event.assignmentId = course._id;
                $scope.success = true;
                if ($scope.onSubmit){
                  $scope.onSubmit();
                }
              })
              .catch(err => {
                err = err.data;
                $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, (error, field) => {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
                });
              })
          });

        }
      };
  }
}

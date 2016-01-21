

'use strict';

angular.module('venueApp')
  .controller('EventFormCtrl', function($scope, Auth, EventInfo, User, SectionEvent, Upload){
    var eventInfoId = null;
    $scope.courseCreated = false;
    $scope.selectingEvent = true;
    $scope.event = {};
    $scope.event.startDate = new Date();
    $scope.event.endDate = new Date();
    $scope.event.startDateOpen = false;
    $scope.event.endDateOpen = false;
    EventInfo.getAll({}, (eventinfos) => {
      $scope.eventinfos = eventinfos;
    });

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

    $scope.useEvent = (event)=>{
      eventInfoId = event._id;
      $scope.selectingEvent = false;
      $scope.eventInfo = event;
    };

    $scope.createEventInfo = (form)=>{
      $scope.submitted = true;
      if (form.$valid && $scope.files){
        $scope.eventInfo = {
          title: $scope.event.title,
          description: $scope.event.description,
          times:{
            start: $scope.event.startDate,
            end: $scope.event.endDate
          },
          files: $scope.files,
          location: {
            address: "TODO",
            description: "TODO",
            geo: {
              type: 'Point',
              coordinates: [0,0]
            }
          }
        };
        Upload.upload({
            url: '/api/eventinfos/',
            data: $scope.eventInfo,
            objectKey: '.k',
            arrayKey: '[i]'
        }).success( (response) => {
          $scope.selectingEvent = false;
          $scope.eventInfo.imageURLs = response.imageURLs;
        }).catch(err => {
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
    $scope.openCalendar = function(e, prop) {
      e.preventDefault();
      e.stopPropagation();

      $scope.event[prop] = true;
  };

    $scope.isActiveCourse = (course)=>{
      return course.sections.every((section) => section.active);
    };

    $scope.selectCourse = (course)=>{
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

    $scope.submitEventAssignment = (form)=>{
        $scope.submitted = true;
        getSectionIds().forEach((sectionId)=>{
          var sectionEvent = {
            section: sectionId,
            info: $scope.eventInfo._id,
            author: Auth.getCurrentUser()._id,
            additionalNotes: $scope.event.additionalNotes
          };
          SectionEvent.create(sectionEvent).$promise
            .then((course) => {
              $scope.success = true;
            })
            .catch(err => {
              // TODO directly notify for errors b/c there are multiple sections
              err = err.data;
              $scope.errors = {};

              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, (error, field) => {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
              });
            })
        });
      };
  });

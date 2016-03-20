

'use strict';

angular.module('venueApp')
  .controller('EventFormCtrl', function($scope, Auth, EventInfo, User, SectionEvent, Upload, uiGmapGoogleMapApi){
    var eventInfoId = null;
    $scope.courseCreated = false;
    $scope.selectingEvent = true;
    $scope.event = {};
    $scope.event.startDate = new Date();
    $scope.event.endDate = new Date();
    $scope.event.startDateOpen = false;
    $scope.event.endDateOpen = false;
    $scope.success = false;

    $scope.place = {};
    $scope.showPlaceDetails = function(param) {
      $scope.place = param;
    }

    $scope.toggleMap = function () {
      $scope.event.searchbox.options.visible = !$scope.event.searchbox.options.visible
    };

    uiGmapGoogleMapApi.then(function(maps) {
      maps.visualRefresh = true;
      $scope.defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(42.7766, -73.5380),
        new google.maps.LatLng(42.6757, -73.8292));

        $scope.event.map.bounds = {
          northeast: {
            latitude:$scope.defaultBounds.getNorthEast().lat(),
            longitude:$scope.defaultBounds.getNorthEast().lng()
          },
          southwest: {
            latitude:$scope.defaultBounds.getSouthWest().lat(),
            longitude:-$scope.defaultBounds.getSouthWest().lng()

          }
        }
        $scope.event.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(),     $scope.defaultBounds.getSouthWest());

    });

    $scope.selected= {
      options: {
        visible:false

      },
      templateurl:'window.tpl.html',
      templateparameter: {}
    };

    $scope.event.map= {
      control: {},
      center: {
        latitude: 42.7285023,
        longitude:-73.6839912
      },
      zoom: 12,
      dragging: false,
      bounds: {},
      markers: [],
      idkey: 'place_id',
      events: {
        idle: function (map) {

        },
        dragend: function(map) {
          //update the search box bounds after dragging the map
          var bounds = map.getBounds();
          var ne = bounds.getNorthEast();
          var sw = bounds.getSouthWest();
          $scope.event.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
        }
      }
    };
    var places = [];

    $scope.event.searchbox= {
      template: 'searchbox.tpl.html',
      position:'top-left',
      options: {
        bounds: {},
        visible: true
      },
      events: {
        places_changed: function (searchBox) {

          if (searchBox){
            places = searchBox.getPlaces()
          }

          if (places.length == 0) {
            return;
          }
          // For each place, get the icon, place name, and location.

          var newMarkers = [];
          var bounds = new google.maps.LatLngBounds();
          for (var i = 0, place; place = places[i]; i++) {
            // Create a marker for each place.
            var marker = {
              id:i,
              place_id: place.place_id,
              name: place.name,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              formatted_address: place.formatted_address,
              options: {
                visible:false
              },
              templateurl:'window.tpl.html',
              templateparameter: place,
              closeClick: function() {
                $scope.event.selected.options.visible = false;
                marker.options.visble = false;
                return $scope.$apply();
              },
              onClicked: function() {
                $scope.event.selected.options.visible = false;
                $scope.event.selected = marker;
                $scope.event.selected.options.visible = true;
              }
            };
            newMarkers.push(marker);

            bounds.extend(place.geometry.location);
          }


          $scope.event.map.bounds = {
            northeast: {
              latitude: bounds.getNorthEast().lat(),
              longitude: bounds.getNorthEast().lng()
            },
            southwest: {
              latitude: bounds.getSouthWest().lat(),
              longitude: bounds.getSouthWest().lng()
            }
          }

          $scope.event.map.markers = newMarkers;
        }
      }
    };


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
          times:[{
            start: $scope.event.startDate,
            end: $scope.event.endDate
          }],
          files: $scope.files,
          location: {
            address: $scope.event.map.markers[0].formatted_address,
            description: $scope.event.map.markers[0].name,
            geo: {
              type: 'Point',
              coordinates: [
                $scope.event.map.center.longitude,
                $scope.event.map.center.latitude
              ]
            },
            radius: Math.abs($scope.event.map.bounds.northeast.longitude-$scope.event.map.bounds.southwest.longitude)
          },
          imageURL: $scope.event.imageURL,

        };
        Upload.upload({
            url: '/api/eventinfos/',
            data: $scope.eventInfo,
            objectKey: '.k',
            arrayKey: '[i]'
        }).success( (response) => {
          $scope.selectingEvent = false;
          $scope.eventInfo.imageURLs = response.imageURLs;
          eventInfoId = response._id;
          $scope.eventInfo = response;
        }).catch(err => {
            err = err.data;
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
              $scope.submitted = false;

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

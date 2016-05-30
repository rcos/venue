// https://github.com/angular-ui/angular-google-maps/blob/master/example/assets/scripts/controllers/issue-624-drawing-manager.js
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
    $scope.event.location = {};
    $scope.success = false;
    $scope.mapLoaded = false;
    $scope.allShapes = [];
    var selectedShape = null;

    $scope.place = {};

    $scope.toggleMap = function () {
      $scope.event.searchbox.options.visible = !$scope.event.searchbox.options.visible
    };
    $scope.event.map= {
      control: {},
      center: {
        latitude: 42.7285023,
        longitude:-73.6839912
      },
      zoom: 12,
      dragging: false,
      drawing: false,
      bounds: {},
      markers: [],
      idkey: 'place_id',
      options: {scrollwheel: false}
    };

    $scope.event.searchbox= {
      template: 'searchbox.tpl.html',
      position:'TOP_CENTER',
      options: {
        bounds: {},
        visible: true
      },
      places: [],
      events: {
        places_changed: function (searchBox) {
          if (searchBox){
            $scope.event.searchbox.places = searchBox.getPlaces();
          }
          if ($scope.event.searchbox.places.length === 0) {
            return;
          }
          // For each place, get the icon, place name, and location.
          var bounds = new google.maps.LatLngBounds();

          $scope.event.location.address = $scope.event.searchbox.places[0].formatted_address;
          $scope.event.location.description = $scope.event.searchbox.places[0].name;

          for (var i = 0; i < $scope.event.searchbox.places.length; i++) {
            var place = $scope.event.searchbox.places[i];
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
        }
      }
    };

    function clearSelection() {
      if (selectedShape) {
        selectedShape.setEditable(false);
        selectedShape = null;
      }
    }

    function setSelection(shape) {
      clearSelection();
      selectedShape = shape;
      shape.setEditable(true);
    }

    function deleteSelectedShape() {
      if (selectedShape) {
        selectedShape.setMap(null);
      }
    }

    function deleteAllShape() {
      for (var i = 0; i < $scope.allShapes.length; i++) {
        $scope.allShapes[i].overlay.setMap(null);
      }
      $scope.allShapes = [];
    }

    uiGmapGoogleMapApi.then(function(maps) {
      $scope.mapLoaded = true;
      maps.visualRefresh = true;
      $scope.defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(42.7766, -73.5380),
        new google.maps.LatLng(42.6757, -73.8292));

        $scope.event.map.events = {
          overlaycomplete: function (dm, name, scope, objs) {
            var e = objs[0];
            $scope.allShapes.push(e);
            var newShape = e.overlay;
            newShape.type = e.type;
            google.maps.event.addListener(newShape, 'click', function() {
              setSelection(newShape);
            });
            setSelection(newShape);


          }
        };

        $scope.deleteButton = function(){
          deleteSelectedShape();
        };

        $scope.deleteAllButton = function(){
          deleteAllShape();
        };

        $scope.event.map.bounds = {
          northeast: {
            latitude:$scope.defaultBounds.getNorthEast().lat(),
            longitude:$scope.defaultBounds.getNorthEast().lng()
          },
          southwest: {
            latitude:$scope.defaultBounds.getSouthWest().lat(),
            longitude:-$scope.defaultBounds.getSouthWest().lng()
          }
        };

        $scope.event.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());

        $scope.event.selected = {
          options: {
            visible:false
          },
          templateurl:'window.tpl.html',
          templateparameter: {}
        };

        $scope.event.map.drawingManager = {};
        $scope.event.map.drawingManager.options = {
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON,
            ]
          }
        };

    });


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
      // For each place, get the icon, place name, and location.
      var bounds = new google.maps.LatLngBounds();
      //Loop through each polygon that was drawn
      for (var a = 0; a < $scope.allShapes.length ; a++){
        var shape = $scope.allShapes[a].overlay; // get the shape

        //Loop through each point in the shape
        for (var b = 0; b < shape.getPath().getLength() ; b++){
          //Add the point to the bounds - so that you can see the entire location
          bounds.extend(shape.getPath().getAt(b));
        }
      }

      // Set the bounds to view and save to the one we just defined
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

      //Save all the shapes in the proper form for geojson
      var allShapes = [];
      //Loop through each polygon that was drawn
      for (var a = 0; a < $scope.allShapes.length ; a++){
        var shape = $scope.allShapes[a].overlay; // get the shape

        // If it is a line or a point, don't add it
        if (shape.getPath().getLength() < 3){
          continue;
        }

        var poly = []; //Save the polygon (in a seperate array because geojson allows multiple loops)

        var line = []; //Save the coordinates of the shape (closed polygon)

        for (var b = 0; b < shape.getPath().getLength() ; b++){
          // add each point to the coordinates array
          var coordsPair = [
            shape.getPath().getAt(b).lng(),
            shape.getPath().getAt(b).lat()
          ];
          line.push(coordsPair);
        }
        //Add the first point to the end to close the shape
        line.push([shape.getPath().getAt(0).lng(), shape.getPath().getAt(0).lat()]);

        //Add the coordinates array to the polygon
        poly.push(line);

        //Add the polygon to the array of all coordinates
        allShapes.push(poly);
      }

      // Save the event information and send it to the api endpoint
      // Don't do it if the form is invalid or there are no shapes drawn
      if (form.$valid && $scope.file && allShapes.length){
        $scope.eventInfo = {
          title: $scope.event.title,
          description: $scope.event.description,
          times:[{
            start: $scope.event.startDate,
            end: $scope.event.endDate
          }],
          files: [$scope.file],
          location: {
            address: $scope.event.location.address,
            description: $scope.event.location.description,
            geo: {
              type: 'Point',
              coordinates: [
                $scope.event.map.center.longitude,
                $scope.event.map.center.latitude
              ]
            },
            radius: Math.abs($scope.event.map.bounds.northeast.longitude-$scope.event.map.bounds.southwest.longitude),
            geobounds: {
              type: 'MultiPolygon',
              coordinates: allShapes,
            },
          },
          imageURL: $scope.event.imageURL,
        };

        //Upload the event
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
        if(getSectionIds().length == 0){
          $scope.eventAssignmentSectionsError = true;
          return;
        }
        getSectionIds().forEach((sectionId)=>{
          var sectionEvent = {
            section: sectionId,
            info: $scope.eventInfo._id,
            author: Auth.getCurrentUser()._id,
            submissionInstructions: $scope.event.submissionInstructions
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

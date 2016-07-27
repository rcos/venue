// https://github.com/angular-ui/angular-google-maps/blob/master/example/assets/scripts/controllers/issue-624-drawing-manager.js
'use strict';

angular.module('venueApp')
  .controller('CreateEventFormCtrl', function($scope, Auth, EventInfo, User, SectionEvent, Upload, uiGmapGoogleMapApi){
    var eventInfoId = null;
    $scope.today = new Date();
    $scope.today.setHours(0,0,0,0);

    $scope.startDate = new Date();
    $scope.courseCreated = false;
    $scope.selectingEvent = true;

    $scope.success = false;
    $scope.mapLoaded = false;
    $scope.allShapes = [];
    $scope.place = {};
    var selectedShape = null;

    if ($scope.updating){
      $scope.eventInfo.id = $scope.event._id;
    }


    $scope.init = () => {
      $scope.event = $scope.eventContainer.info;
      if (!$scope.updating){
        $scope.event.startDate = new Date();
        $scope.event.endDate = new Date();
        $scope.event.endDate.setHours($scope.event.endDate.getHours()+1);
        $scope.event.startDateOpen = false;
        $scope.event.endDateOpen = false;
        $scope.event.location = {};
      }else{
        $scope.event.startDate = new Date($scope.event.times[0].start);
        $scope.event.endDate = new Date($scope.event.times[0].end);
      }

      $scope.event.searchbox = {
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

      $scope.event.map = {
        control: {},
        center: {
          latitude: $scope.updating ? $scope.event.location.geo.coordinates[1]: 42.7285023,
          longitude:$scope.updating ? $scope.event.location.geo.coordinates[0] : -73.6839912
        },
        zoom: 12,
        dragging: false,
        drawing: false,
        bounds: {},
        markers: [],
        idkey: 'place_id',
        options: {scrollwheel: false}
      };
    };

    $scope.toggleMap = function () {
      $scope.event.searchbox.options.visible = !$scope.event.searchbox.options.visible
    };


    // Deselect the current selection
    function clearSelection() {
      if (selectedShape) {
        selectedShape.setEditable(false);
        selectedShape = null;
      }
    }

    // Select a new object
    function setSelection(shape) {
      clearSelection();
      selectedShape = shape;
      shape.setEditable(true);
    }

    // Delete the current selection from the map
    function deleteSelectedShape() {
      if (selectedShape) {
        for (var i = 0; i < $scope.allShapes.length; i++) {
          if ($scope.allShapes[i].overlay === selectedShape){
            $scope.allShapes.splice(i,1); //Remove from allshapes array
          }
        }
        selectedShape.setMap(null); //remove from map
      }
      selectedShape = null;
    }

    // Delete all the shapes from the map
    function deleteAllShape() {
      for (var i = 0; i < $scope.allShapes.length; i++) {
        $scope.allShapes[i].overlay.setMap(null);
      }
      $scope.allShapes = [];
      selectedShape = null;
    }

    // Wait for the api to load
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.mapLoaded = true;
      maps.visualRefresh = true;
      // Set default bounds to be RPI
      $scope.defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(42.7766, -73.5380),
        new google.maps.LatLng(42.6757, -73.8292));

        // Set functionality based on api events
        $scope.event.map.events = {
          // When a shape is drawn
          overlaycomplete: function (dm, name, scope, objs) {
            var e = objs[0];
            $scope.allShapes.push(e); // Save the shape
            var newShape = e.overlay;
            newShape.type = e.type;

            // When the shape is clicked, set it as editable
            google.maps.event.addListener(newShape, 'click', function() {
              setSelection(newShape);
            });

            // Immediatly set the drawn shape as editable
            setSelection(newShape);
          }
        };

        // Add functionality to the delete button to delete the current selection
        $scope.deleteButton = function(){
          deleteSelectedShape();
        };

        // Add functionality to the delete all button to delete all shapes
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
      if (form.$valid && ($scope.updating || $scope.file) && allShapes.length){
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
            method: 'POST',
            objectKey: '.k',
            arrayKey: '[i]'
        }).success( (response) => {
          $scope.selectingEvent = false;
          $scope.creatingEvent = false;
          $scope.eventInfo.imageURLs = response.imageURLs;
          eventInfoId = response._id;
          $scope.eventInfo = response;
          $scope.submitted = false;
        }).catch(err => {
            err = err.data;
          });
    };

    $scope.openCalendar = function(e, prop) {
      e.preventDefault();
      e.stopPropagation();

      $scope.event[prop] = true;
  };
});

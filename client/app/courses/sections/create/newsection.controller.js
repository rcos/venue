'use strict';

angular.module('venueApp')
  .controller('NewSectionCtrl', function ($scope, Course, $http, $routeParams) {
    Course.get({id: $routeParams.id}, (course) => {
      $scope.course = course;
      $scope.coursesLoaded  = true;

    });
    $scope.getImageUrl = function(){
      if($scope.coursesLoaded){
        if(! $scope.imgRetrieve && $scope.coursesLoaded && $scope.course.imageURLs[0].startsWith('/api/')){
          $scope.imgRetrieve = true;
          $http.get($scope.course.imageURLs[0], {responseType: 'arraybuffer'}, )
          .then((response) => {
            var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
            $scope.imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
            return $scope.imageUrl;
          });
        }
        else if($scope.imgRetrieve){
          return $scope.imageUrl;
        }
        else{
          return $scope.course.imageURLs[0];
        }
      }
    }
  });

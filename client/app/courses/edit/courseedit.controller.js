'use strict';

angular.module('venueApp')
  .controller('CourseEditCtrl', function ($scope, Course, $http, $routeParams) {
    Course.get({id: $routeParams.id}, (course) => {
      $scope.course = course;
      $scope.coursesLoaded  = true;
    });

    $scope.getImageUrl = function(){
      if($scope.coursesLoaded){
        if(! $scope.imgRetrieve && $scope.coursesLoaded && $scope.course.imageURLs[0].startsWith('/api/')){
          $scope.imgRetrieve = true;
          console.log("In");
          $http.get($scope.course.imageURLs[0], {responseType: 'arraybuffer'}, )
          .then((response) => {
            var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
            $scope.imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
            return $scope.imageUrl;
          });
        }
        else if($scope.imgRetrieve){
          console.log("good");
          return $scope.imageUrl;
        }
        else{
          console.log("regular");
          return $scope.course.imageURLs[0];
        }
      }
    }

  });

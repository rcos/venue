'use strict';

angular.module('venueApp')
  .directive('courseBanner', function ($http) {
    return {
      restrict: 'A',
      scope: {
        course: '=',
      },
      link: function (scope, element, attrs) {
        scope.$watch('course', function(){
          if(scope.course && scope.course.imageURLs){
            if(scope.course.imageURLs.length > 0 && scope.course.imageURLs[0].startsWith('/api/')){
              $http.get(scope.course.imageURLs[0], {responseType: 'arraybuffer'}, )
              .then((response) => {
                var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
                var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
                scope.img = imageUrl;
                element[0].style.backgroundImage = 'url('+imageUrl+')';
              })
            }
            else{
              element[0].style.backgroundImage = 'url('+scope.course.imageURLs[0]+')';
            }
          }
        });
      }
    };
  });

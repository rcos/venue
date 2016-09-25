'use strict';
const angular = require('angular');

export default angular.module('venueApp', [])
  .directive('pictureBanner', function ($http) {
    return {
      restrict: 'A',
      scope: {
        imageurls: '=',
      },
      link: function (scope, element, attrs) {
        scope.$watch('course', function(){
          if(scope.imageurls){
            if(scope.imageurls.length > 0 && scope.imageurls[0].startsWith('/api/')){
              $http.get(scope.imageurls[0], {responseType: 'arraybuffer'})
              .then(function(response){
                var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
                var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
                scope.img = imageUrl;
                element[0].style.backgroundImage = 'url('+imageUrl+')';
              })
            }
            else{
              element[0].style.backgroundImage = 'url('+scope.imageurls[0]+')';
            }
          }
        });
      }
    };
  })
  .name;

'use strict';

angular.module('venueApp')
  .directive('httpSrc', ($http) => {
      var directive = {
        link: link,
        restrict: 'A'
      };
      return directive;

      function link(scope, element, attrs) {
        attrs.$observe('httpSrc', (value) => {
          if (value[0] == "/"){
            $http.get(attrs.httpSrc, {responseType: 'arraybuffer'}, )
              .then((response) => {
                var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
                var ImageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
                attrs.$set('src', ImageUrl);
              });
          }else{
            attrs.$set('src', value);
          }
        });
      }
  });

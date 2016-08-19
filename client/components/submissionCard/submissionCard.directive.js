'use strict';

angular.module('venueApp')
  .directive('submissionCard', ($http,$compile, $location) => {
    return {
      templateUrl: 'components/submissionCard/submissionCard.html',
      restrict: 'EA',
      scope: {
        selected: '=',
        preview: '=',
        data: '=',
        short: '=',
        sections: '=',
        click: '&',
        expanded: '='
      },
      link: function (scope, element, attrs) {
        scope.$watch('data', function(){
          if(scope.data){
            $http.get(scope.data.images[0], {responseType: 'arraybuffer'})
            .then((response) => {
              var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
              var ImageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
              scope.img = ImageUrl;
              scope.imgShow = true;
            })
          }
        });
      },
      controller: function ($scope, $element) {
      }
    };
  });

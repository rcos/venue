'use strict';

angular.module('venueApp')
  .directive('submissionCard', ($http,$compile) => {
    return {
      templateUrl: 'components/submissionCard/submissionCard.html',
      restrict: 'EA',
      scope: {
        data: '=',
        short: '=',
        sections: '=',
        click: '&'
      },
      link: function (scope, element, attrs) {
        $http.get(scope.data.images[0], {responseType: 'arraybuffer'}, )
        .then((response) => {
          var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
          var ImageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
          scope.img = ImageUrl;
          scope.imgShow = true;
        })
      },
      controller: function ($scope, $element) {
      }
    };
  });

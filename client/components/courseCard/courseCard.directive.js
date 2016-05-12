'use strict';

angular.module('venueApp')
  .directive('courseCard', function ($http) {
    return {
      templateUrl: 'components/courseCard/courseCard.html',
      restrict: 'EA',
      scope: {
        data: '=',
        short: '=',
        sections: '=',
        click: '&'
      },
      link: function (scope, element, attrs) {
        scope.$watch('data', function(){
          if(scope.data && scope.data.imageURLs[0]){
            if(scope.data.imageURLs.length > 0 && scope.data.imageURLs[0].startsWith('/api/')){
              $http.get(scope.data.imageURLs[0], {responseType: 'arraybuffer'}, )
              .then((response) => {
                var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
                var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
                scope.img = imageUrl;
                var title = element[0].querySelector('.course-name')
                title.style.backgroundImage = 'url('+scope.img+')';
                scope.imgShow = true;
              })
            }
            else{
              var title = element[0].querySelector('.course-name')
              title.style.backgroundImage = 'url('+scope.data.imageURLs[0]+')';
            }
          }
        });
      },
      controller: function ($scope, $element) {
      }
    };
  });

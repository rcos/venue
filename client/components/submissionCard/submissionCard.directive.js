'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';

export default angular.module('directives.submissionCard', [showImage])
  .directive('submissionCard', function($http,$compile, $location){
    "ngInject";
    return {
      template: require('./submissionCard.html'),
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
      controller: function ($scope, $element, Submission) {
        $scope.validateSubmission1 = function(s, event){
          Submission.patch({
            _id: s._id,
            verified: true
          }, (updatedSubmission) => {
            s.verified = true;
          });
          event.stopPropagation();
        };
      }
    };
  })
  .name;

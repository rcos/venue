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
        //conitually checking for a new submission
        scope.$watch('data', function(){
          //if there is a new submission, then create a url as well as an image
          //for the submission and display it
          if(scope.data){
            $http.get(scope.data.images[0], {responseType: 'arraybuffer'})
            .then((response) => {
              var imageBlob = new Blob([response.data], { type: response.headers('Content-Type') });
              var ImageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
              //setting image to its newly created url
              scope.img = ImageUrl;
              scope.imgShow = true;
            })
          }
        });
      },
      controller: function ($scope, $element, Submission, Auth) {
        //check if the user is a student or an instructor
        $scope.isInstructor = false;
        Auth.getCurrentUser((user) => {
          if (user.isInstructor){
            $scope.isInstructor = true;
          }
        });
        // FUNCTION TO CHECK IF A SUBMISSION HAS BEEN VALIDATED
        //IF IT HAS BEEN THEN UPDATE VARIABLES
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

'use strict';
const angular = require('angular');
import showImage from '../showImage/showImage.directive';
import pictureBanner from '../pictureBanner/pictureBanner.directive';

export default angular.module('directives.courseCard', [showImage, pictureBanner, 'dibari.angular-ellipsis'])
  .directive('courseCard', function ($http) {
    return {
      template: require('./courseCard.html'),
      restrict: 'EA',
      scope: {
        data: '=',
        short: '=',
        sections: '=',
        expandedsection: "="
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope, $element, Auth) {
        $scope.isInstructor = Auth.isInstructorSync();

        $scope.viewCourse = function(course){
          return "/courses/" + course._id;
        };
        $scope.viewSection = (course, section) => {
          if($scope.isInstructor){
            return "/instructor/courses/"+ course._id + "/sections/" + section._id;
          }
          else{
            return "/courses/"+ course._id + "/sections/" + section._id;
          }
        };

      }
    };
  })
  .name;

'use strict';

angular.module('venueApp')
  .directive('submissionview', function () {
    return {
      templateUrl: 'components/submissionview/submissionview.html',
      controller: 'SubmissionViewCtrl',
      restrict: 'E',
      scope: {
        eventId: "="
      },
      link: function (scope, element, attrs) {
      }
    };
  });

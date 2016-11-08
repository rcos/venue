'use strict';
const angular = require('angular');
import {
  SubmissionViewCtrl
} from './submissionview.controller';
import showImage from '../showImage/showImage.directive';

export default angular.module('directives.submissionview', [showImage])
  .controller('SubmissionViewCtrl', SubmissionViewCtrl)
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
  })
  .filter('visibleSubmission', function(){
    return (subs, selectedSections, event, submissionFilter, searchName) => {
      if (!subs) return [];
      return subs.filter((sub) => {
        if (!sub) return false;
        if (selectedSections.filter((sec) => sec._id == sub.sectionEvent.section._id).length == 0) return false;
        if (event && event._id !== sub.sectionEvent.info._id) return false;
        if (sub.didNotSubmit && submissionFilter == "submitted") return false;
        if (!sub.valid && submissionFilter == "validated") return false;
        var submitterName = (sub.submitter.firstName + " " + sub.submitter.lastName).toLowerCase();
        if (searchName && searchName != "" && submitterName.indexOf(searchName) == -1) return false;

        return true;
      });
    };
  })
  .name;

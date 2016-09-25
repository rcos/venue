'use strict';
const angular = require('angular');

/*@ngInject*/
export function SubmissionResource($resource) {
    var Submission = $resource('/api/submissions/:id', {
      id: '@_id'
    }, {
      get: {
        method: 'GET'
      },
      getAll: {
        method: 'GET',
        isArray:true
      },
      getNumber: {
        method: 'GET',
        isArray:false,
        params:{ onlyNumber : true }
      },
      submit: {
        method: 'POST'
      },
      put: {
        method: 'PUT'
      },
      patch: {
        method: 'PATCH'
      },
      delete: {
        method: 'DELETE'
      }
    });
    return Submission;
}

export default angular.module('venueApp.SubmissionFactory', [])
  .factory('Submission', SubmissionResource)
  .name;

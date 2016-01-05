'use strict';


(function() {

  function SubmissionResource($resource) {
    return $resource('/api/submissions/:id', {
      id: '@_id'
    }, {
      getAll: {
        method: 'GET',
        param: {
          id: ""
        }
      },
      getAll: {
        method: 'GET',
        isArray:true
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
      },
    });
  }


  angular.module('venueApp')
    .factory('Submission', SubmissionResource);

  })();

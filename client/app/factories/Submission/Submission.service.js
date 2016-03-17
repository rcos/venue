'use strict';


(function() {

  function SubmissionResource($resource) {
    return $resource('/api/submissions/:id', {
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
      },
    });
  }


  angular.module('venueApp')
    .factory('Submission', SubmissionResource);

  })();

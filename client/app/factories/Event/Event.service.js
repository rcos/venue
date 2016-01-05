'use strict';

(function() {

  function EventResource($resource, $http) {
    var Event = $resource('/api/courses/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST'
      },
      get: {
        method: 'GET'
      },
      getAll: {
        method: 'GET',
        isArray:true
      },
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    });
    return Event;
  }

  angular.module('venueApp.auth')
    .factory('Event', EventResource);

  })();

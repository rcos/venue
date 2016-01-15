'use strict';

(function() {

  function EventInfoResource($resource) {
    var EventInfo = $resource('/api/eventinfos/:id/:controller', {
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
    return EventInfo;
  }

  angular.module('venueApp')
    .factory('EventInfo', EventInfoResource);

  })();

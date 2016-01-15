'use strict';

(function() {

  function SectionEventResource($resource) {
    var SectionEvent = $resource('/api/sectionevents/:id/:controller', {
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
    return SectionEvent;
  }

  angular.module('venueApp')
    .factory('SectionEvent', SectionEventResource);

  })();

'use strict';
const angular = require('angular');

/*@ngInject*/
export function SectionEventResource($resource) {
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
        isArray:false
      },
      getNumber: {
        method: 'GET',
        isArray:false,
        params:{ onlyNumber : true }
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

export default angular.module('venueApp.SectionEventFactory', [])
  .factory('SectionEvent', SectionEventResource)
  .name;

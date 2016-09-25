'use strict';
const angular = require('angular');

/*@ngInject*/
export function EventInfoResource($resource) {
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

export default angular.module('venueApp.EventInfoFactory', [])
  .factory('EventInfo', EventInfoResource)
  .name;

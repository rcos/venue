'use strict';
const angular = require('angular');

/*@ngInject*/
export function SettingsResource($resource) {
    var Settings = $resource('/api/settings/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST'
      },
      current: {
        method: 'GET',
        params: {
          controller: 'current'
        }
      },
      login: {
        method: 'PUT'
      },
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    });
    return Settings;
}

export default angular.module('venueApp.SettingsFactory', [])
  .factory('Settings', SettingsResource)
  .name;

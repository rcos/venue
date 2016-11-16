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
      setLogin: {
        method: 'PUT',
        params: {
          controller: 'login'
        }

      },
      setSemester: {
        method: 'PUT',
        params: {
          controller: 'semester'
        }
      },
      setCurrent: {
        method: 'PUT',
        params: {
          controller: 'current'
        }

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

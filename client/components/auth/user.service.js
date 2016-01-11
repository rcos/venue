'use strict';

(function() {

function UserResource($resource) {
  var User = $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    },
    enroll: {
      method: 'PUT',
      params: {
        controller: 'enroll'
      }
    },
    getSections: {
      method: 'GET',
      params: {
        controller:'sections'
      },
      isArray: true
    },
    getEvents: {
      method: 'GET',
      params: {
        controller:'events'
      },
      isArray: true
    },
    getSections: {
      method: 'GET',
      params: {
        controller:'sections'
      }
    }
  });

  return User;
}

angular.module('venueApp.auth')
  .factory('User', UserResource);

})();

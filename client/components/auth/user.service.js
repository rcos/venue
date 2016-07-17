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
    getAll: {
      method: 'GET',
      params: {
        id: '',
        controller: ''
      }
    },
    verify: {
      method: 'GET',
      params: {
        id: 'verify'
      }
    },
    resendEmail: {
      method: 'POST',
      params: {
        id: 'resendEmail'
      }
    },
    resetPassword: {
      method: 'POST',
      params: {
        id: 'resetPassword'
      }
    },
    enroll: {
      method: 'PUT',
      params: {
        controller: 'enroll'
      }
    },
    unenroll: {
      method: 'PUT',
      params: {
        controller: 'unenroll'
      }
    }
  });

  return User;
}

angular.module('venueApp.auth')
  .factory('User', UserResource);

})();

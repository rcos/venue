'use strict';

export function UserResource($resource) {
  'ngInject';

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
    getAllInstructors: {
      method: 'GET',
      params: {
        id:'instructors',
        controller: ''
      },
      isArray:true
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
    updateEmailPreferences: {
      method: 'POST',
      params: {
        controller: 'emailPreferences'
      }
    },
    resetPassword: {
      method: 'POST',
      params: {
        id: 'resetPassword'
      }
    },
    updateInstructorStatus: {
      method: 'PUT',
      params: {
        controller: 'updateInstructorStatus'
      }
    },
    updateAdminStatus: {
      method: 'PUT',
      params: {
        controller: 'updateAdminStatus'
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
    },
    updateTASections: {
      method: 'PUT',
      params: {
        controller: 'updateTASections'
      }
    }, 
    update: {
      method: 'PUT'
    },
  });
  return User;
}
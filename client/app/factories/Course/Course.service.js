'use strict';

(function() {

  function CourseResource($resource) {
    var Course = $resource('/api/courses/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST'
      },
      getAll: {
        method: 'GET',
        isArray:true
      },
      fullSections: {
        method: 'GET',
        isArray:true,
        params:{
          controller: 'fullsections',
        }
      },
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    });
    return Course;
  }

  angular.module('venueApp.auth')
    .factory('Course', CourseResource);

  })();

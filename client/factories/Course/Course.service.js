'use strict';
const angular = require('angular');

/*@ngInject*/
export function CourseResource($resource) {
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
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    });
    return Course;
}

export default angular.module('venueApp.CourseFactory', [])
  .factory('Course', CourseResource)
  .name;

'use strict';
const angular = require('angular');

/*@ngInject*/
export function SectionResource($resource) {
    var Section = $resource('/api/sections/:id/:controller', {
      id: '@_id'
    }, {
      create: {
        method: 'POST'
      },
      getAll: {
        method: 'GET',
        isArray:true
      },
      getStudentInfo: {
        method: 'GET',
        params:{
          controller:'getStudentInfo'
        },
        isArray: true
      },
      fullEvents: {
        method: 'GET',
        params:{
          controller: 'fullEvents'
        },
        isArray:true
      },
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    });
    return Section;
}

export default angular.module('venueApp.SectionFactory', [])
  .factory('Section', SectionResource)
  .name;

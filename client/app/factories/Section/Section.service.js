'use strict';

angular.module('venueApp')
  .factory('Section', function () {
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
  });

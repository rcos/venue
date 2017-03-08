'use strict';
const angular = require('angular');

export default angular.module('directives.dateFilter', [])
  .filter("dateAfter", function() {
    return function(items, from) {
      if (!items || !from){
        return items;
      }
      var df = from;
      var result = [];
      for (var i=0; i<items.length; i++){
        var current = items[i];
        for (var j=0; j<current.times.length; j++){
          var tf = new Date(current.times[j].end);
          if (tf > df)  {
            result.push(current);
            break;
          }
        }
      }
      return result;
    };
  })
  .filter("dateBefore", function() {
    return function(items, from) {
      if (!items || !from){
        return items;
      }
      var df = from;
      var result = [];
      for (var i=0; i<items.length; i++){
        var current = items[i];
        for (var j=0; j<current.times.length; j++){
          var tf = new Date(current.times[j].end);
          if (tf < df)  {
            result.push(current);
            break;
          }
        }
      }
      return result;
    };
  })
  .name;

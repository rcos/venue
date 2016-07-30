'use strict';

angular.module('venueApp')
  .controller('NewEventCtrl', function ($scope) {
    $scope.event = {info:{}};
    $scope.stage = {
      select: true,
      create: false,
      assign: false,
      done: false
    }
    $scope.doneSelect = function(create){
      $scope.stage.select = false;

      if (create){
        $scope.stage.create = true;
      }
      else{

        $scope.stage.assign = true;
      }
    }
    $scope.doneCreate = function(){

      $scope.stage.create = false;
      $scope.stage.assign = true;

    }
    $scope.doneAssign = function(){

      $scope.stage.assign = false;
      $scope.stage.done = true;
    }
  });

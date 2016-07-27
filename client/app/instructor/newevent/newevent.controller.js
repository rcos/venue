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
      console.log("doneSelect")

      if (create){
        console.log("doneSelect create")
        $scope.stage.create = true;
      }
      else{
        console.log("doneSelect assign")

        $scope.stage.assign = true;
      }
    }
    $scope.doneCreate = function(){
      console.log("doneCreate assign")

      $scope.stage.create = false;
      $scope.stage.assign = true;

    }
    $scope.doneAssign = function(){
      console.log("doneAssign assign")

      $scope.stage.assign = false;
      $scope.stage.done = true;
    }
  });

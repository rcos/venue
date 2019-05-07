'use strict';
export default class NewEventCtrl {

  /*@ngInject*/
  constructor($scope) {
    $scope.event = {info:{}};
    $scope.stage = {
      select: false,
      create: true,
      assign: false,
      done: false
    }
    $scope.doneSelect = function(create){
      $scope.stage.select = false;

      if (create){
        $scope.stage.create = true;
      }
      else {
        $scope.stage.assign = true;
      }
    }
    $scope.doneCreate = function(){

      $scope.stage.create = false;
      $scope.stage.assign = true;
      $scope.stage.done = true;

    }
  }
}

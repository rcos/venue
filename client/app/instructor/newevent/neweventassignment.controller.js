'use strict';
export default class NewEventAsgmtCtrl {

  /*@ngInject*/
  constructor($scope) {
    $scope.event = {info:{}};
    $scope.stage = {
      select: false,
      create: false,
      assign: true,
      done: false
    }
    $scope.doneAssign = function(){

      $scope.stage.assign = false;
      $scope.stage.done = true;

    }
  }
}

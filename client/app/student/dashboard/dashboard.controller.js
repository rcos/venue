'use strict';
export default class StudentDashboardCtrl {

  /*@ngInject*/
  constructor($scope, $location, $routeParams, User, Auth) {
    $scope.user = {};
    $scope.courses = [];
    $scope.events = [];
    $scope.anyEvents = true;
    $scope.today = new Date();
    Auth.getCurrentUser((user) => {
      $scope.user = user;

      User.get({id: user._id, withSubmissions:true, withEvents: true, withEventSections: true}, (user) => {
        $scope.user = user;
        $scope.anySubmissions = angular.equals(user.submissions,{})?0:1
        var eventsList = [];
        for (var key in $scope.user.events) {
            // skip loop if the property is from prototype
            if (!$scope.user.events.hasOwnProperty(key) || !$scope.user.events[key]._id) continue;
            eventsList.push($scope.user.events[key]);
        }
        $scope.user.events = eventsList;
        $scope.anyEvents = angular.equals(user.events, {})?0:1
      });
    });

    $scope.goToUploadForEvent = (event) => {
      $location.path("/student/upload/" + event.sections[0]._id);
    };

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };

    $scope.goToEvent = (event) => {
      $location.path("/events/" + event._id);
    };
  }
}

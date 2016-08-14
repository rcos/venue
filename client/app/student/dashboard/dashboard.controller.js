'use strict';

angular.module('venueApp')
  .controller('StudentDashboardCtrl', ($scope, $location, $routeParams, User, Auth) => {

    $scope.user = {};
    $scope.courses = [];
    $scope.events = [];

    Auth.getCurrentUser((user) => {
      $scope.user = user;

      User.get({id: user._id, withCourses:true, withEvents: true, withEventSections: true}, (user) => {
        $scope.user = user;
        $scope.anyCourses = angular.equals(user.courses,{})?0:1

        $scope.anyEvents = angular.equals(user.events, {})?0:1

      });
    });

    $scope.goToUploadForEvent = (event) => {
      $location.path("/student/upload/" + event.sections[0]._id);
    };

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
  });

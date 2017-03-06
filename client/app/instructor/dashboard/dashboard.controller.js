'use strict';
export default class InstructorDashboardCtrl {

  /*@ngInject*/
  constructor($scope, $routeParams, $location, User, Auth, Util) {
    $scope.today = new Date();
    User.get({withCourses:true, withEvents: true, withEventSections: true, withSections:true, withSectionsCourse:true, withSectionsPendingStudents:true}, (user) => {
      $scope.user = user;
      var eventsList = [];
      for (var key in $scope.user.events) {
          // skip loop if the property is from prototype
          if (!$scope.user.events.hasOwnProperty(key) || !$scope.user.events[key]._id) continue;
          eventsList.push($scope.user.events[key]);
      }
      $scope.events = eventsList;

      $scope.courses = user.courses;
      $scope.sections = user.sections;
      $scope.anyCourses = angular.equals(user.courses,{})?0:1;
      $scope.anyEvents = angular.equals(user.events, {})?0:1;
      $scope.anyPending = false;

      for (var a = 0; a < $scope.sections.length; a++){
        if ($scope.sections[a].pendingStudents.length > 0){
          $scope.anyPending = true
          break;
        }
      }
    });

    $scope.goToCourse = (course) => {
      $location.path("/courses/" + course._id);
    };
    $scope.viewSection = function(section){
      return "/instructor/courses/"+section.course._id + "/sections/" + section._id;
    };

  }
}

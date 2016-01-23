'use strict';

angular.module('venueApp')
  .controller('InstructorEventsCtrl', ($scope, $routeParams, User, Auth, SectionEvent) => {

    $scope.user = {};
    $scope.events = [];

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      User.get({id: user._id, withSections:true, withEvents: true, withSectionsCourse:true}, (usr) => {
        $scope.user = usr;
        $scope.events = usr.events;
      });
    });

    $scope.deleteEvent = (event)=> {
      if (confirm("This will also delete all sections submissions") == true) {
        SectionEvent.delete({id:event._id}, (response)=>{
          var index = $scope.events.indexOf(event);
          $scope.events.splice(index, 1);
        })
      }
    }

  });

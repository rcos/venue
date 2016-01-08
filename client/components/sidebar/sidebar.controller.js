angular.module('venueApp')
  .controller('SidebarController', ($scope, $location, Auth) => {

    $scope.page = $location.path();

    Auth.getCurrentUser((user) => {
      $scope.user = user;
    });

    $scope.isActive = (pageview) => {
      return pageview == $scope.page;
    }

  });

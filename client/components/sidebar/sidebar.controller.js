angular.module('venueApp')
  .controller('SidebarController', ($scope, $location, Auth) => {

    $scope.page = $location.path();

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      console.log($scope.user);

    });

    console.log($scope.page)

    $scope.isActive = (pageview) => {
      console.log(pageview);
      console.log( $scope.page);
      return pageview == $scope.page;
    }

  });

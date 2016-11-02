'use strict';
export function SidebarController($scope, $location, Auth) {
    "ngInject";
    $scope.page = $location.path();

    Auth.getCurrentUser((user) => {
      $scope.user = user;
    });

    $scope.isActive = (pageview) => {
      return pageview == $scope.page;
    }

  };

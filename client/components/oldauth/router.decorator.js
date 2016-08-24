'use strict';

(function() {

angular.module('venueApp.auth')
  .run(function($rootScope, $location, Auth) {    
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$routeChangeStart', function(event, next) {    
      if(!next.authenticate) {
        return;
      }

      if(typeof next.authenticate === 'string') {
        Auth.hasRole(next.authenticate, _.noop).then(has => {
          if(has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(is => {
            $location.path(is ? '/' : '/login');
          });
        });
      } else {
        Auth.isLoggedIn(_.noop).then(is => {
          if(is) {
            return;
          }

          event.preventDefault();
          $location.path('/');
        });
      }
    });
  });

})();

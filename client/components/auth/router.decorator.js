'use strict';

import * as _ from 'lodash';

export function routerDecorator($rootScope, $location, Auth) {
  'ngInject';
  // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role

  $rootScope.$on('$routeChangeStart', function(event, next) {
    if (!next.authenticate) {
      return;
    }

    if (typeof next.authenticate === 'string') {
      if (next.authenticate === 'student'){
        return Auth.isStudent()
          .then(has => {
            if (has) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn()
              .then(is => {
                $location.path(is ? '/' : '/login');
              });
          });
      }
      else if (next.authenticate === 'instructor'){
        return Auth.isInstructor()
          .then(has => {
            if (has) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn()
              .then(is => {
                $location.path(is ? '/' : '/login');
              });
          });
      }
      else{
        return Auth.hasRole(next.authenticate)
          .then(has => {
            if (has) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn()
              .then(is => {
                $location.path(is ? '/' : '/login');
              });
          });
      }
    } else {
      return Auth.isLoggedIn()
        .then(is => {
          if (is) {
            return;
          }

          event.preventDefault();
          $location.path('/login');
        });
    }
  });
};

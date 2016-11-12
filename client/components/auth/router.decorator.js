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
          .then(isStudent => {
            if (isStudent) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn()
              .then(isLoggedIn => {
                $location.path(isLoggedIn ? '/' : '/login');
              });
          });
      }
      else if (next.authenticate === 'instructor'){
        return Auth.isInstructor()
          .then(isInstructor => {
            if (isInstructor) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn()
              .then(isLoggedIn => {
                $location.path(isLoggedIn ? '/' : '/login');
              });
          });
      }
      else{
        return Auth.hasRole(next.authenticate)
          .then(hasRole => {
            if (hasRole) {
              return;
            }

            event.preventDefault();
            return Auth.isLoggedIn()
              .then(isLoggedIn => {
                $location.path(isLoggedIn ? '/' : '/login');
              });
          });
      }
    } else {
      return Auth.isLoggedIn()
        .then(isLoggedIn => {
          if (isLoggedIn) {
            return;
          }

          event.preventDefault();
          $location.path('/login');
        });
    }
  });
};

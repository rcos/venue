'use strict';

export default function routes($stateProvider) {
  'ngInject';

  console.log("using routes");

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });
};

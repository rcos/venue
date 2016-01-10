Best practices for commiting changes:

* If you generate any code, it should be included in a separate commit from your changes
* If you create a major feature branch that others will be submitting pull request to, prepend it with `feature-`
* When merging pull requests, always leave a message for the contributor
* All changes should be submitted in a pull request to develop (or to a feature branch and then to develop).  Changes to develop should pass all tests. Occasionally changes from develop will be pull requested to master.
* Follow the `.editorconfig`
* Angular controllers should be formatted in the notation:
```
  angular.module('venueApp')
    .controller('someCtrl', ($scope, otherDependencies) => {
      // controller methods
    })
```

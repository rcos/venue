Best practices for commiting changes:

* If you generate any code, if should be included in a seperate commit from your changes
* If you create a major feature branch that others will be subitting pull request to, prepend it with `feature-`
* When merging pull requests, always leave a message for the contributor
* All changes should be sumbitted in a pull request to develop (or to a feature branch and then to develop).  Changes to develop should ass all tests. Occasionally changes from develop will be pull reqested to master.
* Follow the `.editorconfig`
* Angular controllers should be formatted in the notation:
```
  angular.module('venueApp')
    .controller('someCtrl', ($scope, otherDependencies) => {
      // controller methods
    })
```

'use strict';
export default class CourseSearchCtrl {

  /*@ngInject*/
  constructor($scope, Course, Auth, $location) {
    Auth.getCurrentUser((user) => {$scope.user = user});

    Course.getAll(function(courses){
        $scope.courses = courses.map(course => {
          course.deptAndNum = course.department + " " + course.courseNumber;
          return course;
        });
    });
    $scope.openCourse = course => {
      $location.path("/courses/" + course._id);
    };
  }
}

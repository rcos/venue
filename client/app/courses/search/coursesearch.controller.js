'use strict';

angular.module('venueApp')
  .controller('CourseSearchCtrl', ($scope, Course, $location) => {
    Course.getAll(function(courses){
        $scope.courses = courses.map(course => {
          course.deptAndNum = course.department + " " + course.courseNumber;
          return course;
        });
    });
    $scope.openCourse = course => {
      $location.path("/courses/" + course._id);
    };
  });

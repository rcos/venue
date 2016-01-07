'use strict';

angular.module('venueApp')
  .controller('CoursesCtrl', ($scope, Course) => {
    Course.getAll(function(courses){
        $scope.courses = courses.map(course => {
          course.deptAndNum = course.department + " " + course.courseNumber;
          return course;
        });
    })
  });

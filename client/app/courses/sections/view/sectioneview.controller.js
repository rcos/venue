'use strict';

angular.module('venueApp')
  .controller('SectionViewCtrl', ($scope, Course, $location, User, Auth, $routeParams) => {
    $scope.enroll = function(section){
      User.enroll({_id: Auth.getCurrentUser()._id, sectionid: section._id}, ()=>{
        setCurrentSection();
      })
    };
    $scope.unenroll = function(section){
      User.unenroll({_id: Auth.getCurrentUser()._id, sectionid: section._id}, ()=>{
        setCurrentSection();
      })
    };

    $scope.editSection = function(section){
      $location.path($location.path() + "/edit");
    };

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      Course.get({
        id: $routeParams.id,
        withSections:true
      }, course => {
        $scope.course = course;
        setCurrentSection();
      });
    });

    function setCurrentSection(){
      var currentSection;
      $scope.course.sections.forEach((section, index)=>{
        if(section._id == $routeParams.sectionId){
          currentSection = index;
        }
      });
      $scope.section = $scope.course.sections.splice(currentSection, 1)[0];
      $scope.section.sectionNumbers = $scope.section.sectionNumbers.toString();
      $scope.isInstructor = $scope.section.instructors.some((instr)=>{
        return instr == $scope.user._id;
      })
      $scope.section.instructors.splice($scope.user, 1);
    }


  });

angular.module('venueApp')
  .controller('SectionFormController', ($scope, $location, $routeParams, Auth, Course, Section) => {

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      Course.get({
        id: $routeParams.id,
        withSections:true
      }, course => {
        $scope.course = course;
        if($scope.updating == "true"){
          setCurrentSection();
        }
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
      $scope.section.sectionNumbersText = $scope.section.sectionNumbers.toString();
      $scope.$watch('section.sectionNumbers', function(newValue, oldValue) {
        console.log("Loaded section Numbers")
        $scope.section.sectionNumbersText = $scope.section.sectionNumbers.toString();
      });

      $scope.isInstructor = $scope.section.instructors.some((instr)=>{
        return instr == $scope.user._id;
      })
      $scope.section.instructors.splice($scope.user, 1);
    }

    $scope.submitForm = (form)=>{
      $scope.submitted = true;
      var section = {
        course: $scope.course._id,
        sectionNumbers:$scope.section.sectionNumbersText.split(',').map(Number).sort(),
        enrollmentPolicy: $scope.section.enrollmentPolicy
      }
      if (form.$valid) {
        var promise;
        if ($scope.updating == "true"){
          if($scope.isInstructor){
            $scope.section.instructors.push($scope.user);
          }
          section.instructors = $scope.section.instructors;
          promise = Section.update({id:$routeParams.sectionId}, section).$promise;
        }else{
          if($scope.isInstructor){
            section.instructors = [$scope.user._id];
          }
          promise = Section.create(section).$promise;
        }
        promise
          .then((section) => {
            $location.path('/instructor/courses/' +  $routeParams.id + "/sections/" +  section._id);
          })
          .catch(err => {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, (error, field) => {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };

    $scope.deleteSection = (section) => {
      if (confirm("Are you sure you'd like to delete this section? Submissions from this section will be lost!")){
        Section.delete({id: section._id}, (res) => {
          // TODO show a page showing the delete was successful
          $location.path("/courses/" + section.course._id);
        });
      }
    };

  });

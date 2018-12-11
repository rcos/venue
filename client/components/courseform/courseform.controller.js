'use strict';
export function CourseFormCtrl ($scope, Auth, Course, Upload, User){
    "ngInject";
    $scope.courseCreated = false;
    $scope.prevSearchText = "";
    $scope.courseAcronyms = new RegExp(['(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:',
    '(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:(?:',
    '(?:ARCH)|(?:(?:ARTS))|(?:(?:ASTR))|(?:(?:BCBP))|(?:(?:BIOL))|(?:(?:BMED))|',
    '(?:(?:CHEM))|(?:(?:CHME))|(?:(?:CISH))|(?:(?:CIVL))|(?:(?:COGS))|(?:(?:COMM))|',
    '(?:(?:CSCI))|(?:(?:ECON))|(?:(?:ECSE))|(?:(?:ENGR))|(?:(?:ENVE))|(?:(?:ERTH))|',
    '(?:(?:ESCI))|(?:(?:GSAS))|(?:(?:IENV))|(?:(?:IHSS))|(?:(?:ISCI))|(?:(?:ISYE))|',
    '(?:(?:ITWS))|(?:(?:LANG))|(?:(?:LGHT))|(?:(?:LITR))|(?:(?:MANE))|(?:(?:MATH))|',
    '(?:(?:Math))|(?:(?:MATP))|(?:(?:MGMT))|(?:(?:MTLE))|(?:(?:PHIL))|(?:(?:PHYS))|',
    '(?:(?:PSYC))|(?:(?:STSH))|(?:(?:STSS))|(?:(?:USAF))|(?:(?:USAR))|(?:(?:USNA))|',
    '(?:(?:WRIT)))))))))))))))))))))))))))))))))))))))))))'].join(''));

    Auth.getCurrentUser((user) => {
      $scope.user = user;
      
        User.getAllInstructors({
          validOnly: true
        }, allInstructors => {
          allInstructors.sort(i => i.name);
          $scope.allInstructors = allInstructors.map(instructor => {
            instructor.name = instructor.firstName + " " + instructor.lastName;
            instructor.current = false;
            if (!$scope.updating) {
              if (instructor._id==$scope.user._id) {
                $scope.supervisor = instructor;
                instructor.current = true;
              }
            }
            return instructor;
          })
          $scope.isSupervisor = true;
          if ($scope.updating) {
            var coursesLoadedWatch = $scope.$watch("coursesLoaded", function() {
              if ($scope.coursesLoaded) {
                angular.forEach($scope.allInstructors, function(instructor) {
                  if (instructor._id==$scope.course.supervisorId) {
                    $scope.supervisor = instructor;
                    instructor.current=true;
                  }
                });
                if ($scope.user._id != $scope.course.supervisorId) {
                  $scope.isSupervisor = false;
                }
                coursesLoadedWatch();  // ends the watch
              }
            });
          }
          
        });
    });
    
    $scope.submitForm = (form)=>{
        $scope.submitted = true;
        if (form.$valid) {
          var promise;
          if ($scope.updating){
            var course = JSON.parse(JSON.stringify($scope.course));
            course.supervisorId = $scope.supervisor._id;
            course.files = [$scope.file];
            promise =  Upload.upload({
                url: '/api/courses/'+$scope.course._id,
                data: course,
                method: 'PUT',
                objectKey: '.k',
                arrayKey: '[i]'
            }).then((course) => {
              return course.data
            });
          }else{
            // promise = Course.create($scope.course).$promise;
            $scope.course.supervisorId = $scope.supervisor._id;
            $scope.course.files = [$scope.file];
            promise =  Upload.upload({
                url: '/api/courses/',
                data: $scope.course,
                objectKey: '.k',
                arrayKey: '[i]'
            }).then((course) => {
              return course.data
            });
          }
          promise
              .then((course) => {
                $scope.course = course;
                $scope.success = true;
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

    $scope.filterSearch = function(searchText){
      // Creates an array of instructors that matches the input string
      // searchText is the input string
      $scope.showAddButton = false;
      $scope.showInstructorList = searchText.length > 0;
      
      if (searchText.length > $scope.prevSearchText.length) {
        $scope.newFilteredInstructors = [];
        angular.forEach($scope.filteredInstructors, function(instructor){
          if(instructor.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
            $scope.newFilteredInstructors.push(instructor);
          }
        });
        $scope.filteredInstructors = $scope.newFilteredInstructors;
      } else {
        $scope.filteredInstructors = [];
        angular.forEach($scope.allInstructors, function(instructor){
          if(instructor.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
            $scope.filteredInstructors.push(instructor);
          }
        });
      }
      $scope.prevSearchText = searchText;
    }

    $scope.selectInstructor = function(instructor){
      // Select an instructor
      $scope.searchText = instructor.name;
      $scope.showAddButton = true;
      $scope.loadedInstructor = instructor;
      $scope.showInstructorList = false;
    }

    $scope.addInstructor = function(){
      // Add the selected instructor to the section
      $scope.supervisor.current = false;
      $scope.supervisor = $scope.loadedInstructor;
      $scope.loadedInstructor.current = true;
      $scope.showAddButton = false;
      $scope.searchText = "";
    }
    
  };

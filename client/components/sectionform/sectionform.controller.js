'use strict';
export function SectionFormController($scope, $location, $routeParams, $filter, Auth, User, Course, Section){
    "ngInject";
    $scope.prevSearchText = "";
    $scope.prevTASearchText = "";
    Auth.getCurrentUser((user) => {
      $scope.creating = $scope.updating != "true";
      $scope.user = user;
      Course.get({
        id: $routeParams.id,
        studentid: user._id,
        checkRoles: true,
        withSections: true
      }, course => {
        $scope.isSupervisor = course.roleDict['supervisor'];
        $scope.isInstructor = course.roleDict['instructor'];
        $scope.isStudent = course.roleDict['student'];
        $scope.course = course;
        
        if(!$scope.creating){
          setCurrentSection();
          var instructorDict = {};
          angular.forEach($scope.section.instructors, function(sectInstructor) {
            instructorDict[sectInstructor.firstName + sectInstructor.lastName] = 1;
          });
        }
        $scope.instructorCount = 1;


      

        Section.getStudentInfo({
          id: $scope.section._id
        }, (allStudents) => {
          allStudents = $filter('orderBy')(allStudents, 'firstName+lastName');
          console.log(allStudents)
          $scope.allStudents = allStudents.map(student => {
            student.name = student.firstName + " " + student.lastName;
            return student;

          })
          
        });

        
       
        User.getAllInstructors({
          validOnly: true
        }, allInstructors => {
          allInstructors =  $filter('orderBy')(allInstructors, 'firstName+lastName');
          $scope.allInstructors = allInstructors.map(instructor => {
            instructor.name = instructor.firstName + " " + instructor.lastName;
            instructor.inSection = false;
            instructor.orderNum = 0;
            if (!$scope.creating){
              if (instructorDict[instructor.firstName+instructor.lastName]) {
                instructor.inSection = true;
                instructor.orderNum = $scope.instructorCount;
                $scope.instructorCount += 1;
              }
            } else {
              if (instructor._id==user._id) {
                instructor.inSection = true;
              }
            }
            return instructor;
          });
        });
        
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
      $scope.section.assistants = $scope.section.teachingAssistants;
      $scope.$watch('section.sectionNumbers', function(newValue, oldValue) {
        $scope.section.sectionNumbersText = $scope.section.sectionNumbers.toString();
      });
    }

    $scope.submitForm = (form)=>{
      $scope.submitted = true;
      var sectionNumbers = $scope.section.sectionNumbersText.split(',').map(Number);
      angular.forEach(sectionNumbers, function(sectionNum) {
        var section = {
          course: $scope.course._id,
          sectionNumbers:[sectionNum],
          enrollmentPolicy: $scope.section.enrollmentPolicy
        }
        if (form.$valid && $scope.section.enrollmentPolicy) {
          var promise;
          section.instructors = [];
          angular.forEach($scope.allInstructors, function(instructor) {
            if (instructor.inSection) {
              section.instructors.push(instructor._id);
            }
          });
          if ($scope.updating == "true"){
            promise = Section.update({id:$routeParams.sectionId}, section).$promise;
          }else{
            promise = Section.create(section).$promise;
          }
          promise
            .then((section) => {
              if (sectionNumbers.length > 1) {
                $location.path('/courses/' +  $routeParams.id);
              } else {
                $location.path('/instructor/courses/' +  $routeParams.id + "/sections/" +  section._id);
              }
            })
            .catch(err => {
              alert("You do not have permission.");
              err = err.data;
              $scope.errors = {};
              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, (error, field) => {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
              });
            });
        }
      });
    };

    $scope.removeCurrent = function(instructor){
      if (confirm("Are you sure you want to remove " + instructor.name + " from this section?")){
        instructor.inSection = false;
      }
    }

    $scope.filterSearch = function(searchText){
      // Creates an array of instructors that matches the input string
      // searchText is the input string
      $scope.showAddButton = false;
      $scope.showInstructorList = searchText.length > 0;
      console.log($scope.showInstructorList)
      
      if (searchText.length > $scope.prevSearchText.length) {
        $scope.newFilteredInstructors = [];
        console.log($scope.filteredInstructors)
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
      console.log($scope.filteredInstructors)
      $scope.prevSearchText = searchText;
    }

    $scope.filterTASearch = function(searchTA){

      //Creates an array of students that match the input string
      //searchText is the input string

      $scope.addTA = false;
      $scope.showStudentList = searchTA.length > 0;
      console.log($scope.showStudentList)

      if (searchTA.length > $scope.prevTASearchText.length) { 
        console.log("new filter!")
        $scope.newFilteredStudents = [];
        console.log($scope.filteredStudents)
        angular.forEach($scope.filteredStudents, function(student){
          if(student.name.toLowerCase().indexOf(searchTA.toLowerCase()) >= 0){
            $scope.newFilteredStudents.push(student);
          }
        });
        
        $scope.filteredStudents = $scope.newFilteredStudents;
        
        $scope.filteredStudents= [];
        
        angular.forEach($scope.allStudents, function(student){
          console.log(student)
          if(student.name.toLowerCase().indexOf(searchTA.toLowerCase()) >= 0){

            $scope.filteredStudents.push(student);
          }

        });
      }
      console.log($scope.filteredStudents)
      $scope.prevTASearchText = searchTA;

    }

    $scope.selectInstructor = function(instructor){
      // Select an instructor
      $scope.searchText = instructor.name;
      $scope.showAddButton = true;
      $scope.loadedInstructor = instructor;
      $scope.showInstructorList = false;
    }

    $scope.selectStudent = function(student){
      //Select a teachin assistant
      $scope.searchTA = student.name;
      $scope.addTA = true;
      $scope.loadedStudent = student;
      $scope.showStudentList = false;
    }

    $scope.addInstructor = function(){
      // Add the selected instructor to the section
      $scope.loadedInstructor.inSection = true;
      $scope.loadedInstructor.orderNum = $scope.instructorCount;
      $scope.instructorCount += 1;
      $scope.searchText = "";
      $scope.showAddButton = false;
    }

    $scope.addTA = function(){
      // Makes the selected stuent a teaching assistant
      $scope.loadedStudent.isTAFor.append($scope.course.id);
      $scope.loadedStudent.orderNum = 1;
      $scope.studentCount += 1;
      $scope.searchTA = "";
      $scope.searchTA = false;

      
    }

    $scope.deleteSection = (section) => {
      if (confirm("Are you sure you'd like to delete this section? Submissions from this section will be lost!")){
        Section.delete({
          id: section._id,
          course: $scope.course._id
        }, (res) => {
          // TODO show a page showing the delete was successful
          $location.path("/courses/" + $scope.course._id);
        });
      }
    };

  };

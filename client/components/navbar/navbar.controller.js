'use strict';

export default class NavbarComponent {
  /*@ngInject*/
  constructor($location, Auth, $window, Submission) {
    this.$location = $location;
    this.isStudent = false;
    this.isInstructor = false;
    //this.isTA = true;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.isStudent = Auth.isStudentSync;
    this.isInstructor = Auth.isInstructorSync;
    this.isTA = Auth.isTASync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.isCollapsed = true;
    this.numPendingSubmissions = 0;

    // check if the instructor has any pending submissions
    if(this.isInstructor){
        this.refreshSubmissions = function() {
            Submission.getAll({'onlyInstructor': 'me', 'withStudents': true, 'withSection': true, 'withSectionCourse': true}, (submissions)=>{
                var pendingSubmissions = 0;
                submissions.forEach(function(submission){
                    if(!submission.verified){
                        pendingSubmissions++;
                        console.log("Submission not verified");
                    }
                });
                this.numPendingSubmissions = pendingSubmissions;
            });
        }
        this.refreshSubmissions();
    }

    this.help = () => {
        if (this.user.firstName && this.isStudent()){
            $window.location.href = "https://github.com/rcos/venue/wiki/Student-How-to";
        }else if (this.isInstructor()){
            $window.location.href = "https://github.com/rcos/venue/wiki/Instructor-How-to";
        }else{
            $window.location.href = "https://github.com/rcos/venue/wiki";
        }
    };
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

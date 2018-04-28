'use strict';

export default class NavbarComponent {
  /*@ngInject*/
  constructor($location, Auth, $window) {
    this.$location = $location;
    this.isStudent = false;
    this.isInstructor = false;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.isStudent = Auth.isStudentSync;
    this.isInstructor = Auth.isInstructorSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.isCollapsed = true;
    this.newPath = "/";

    if (this.isLoggedIn) {
      if (this.isStudent) {
        this.newPath = "/student/dashboard";
      }
      if (this.isInstructor) {
        this.newPath = "/instructor/dashboard";
      }
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

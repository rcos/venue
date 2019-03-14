'use strict';

export default class NavbarComponent {
  /*@ngInject*/
  constructor($location, Auth, $window) {
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

'use strict';

export default class NavbarComponent {
  /*@ngInject*/
  constructor($location, Auth, $window) {
    this.$location = $location;
    this.loggedin = false;
    this.isAdmin = false;
    this.isStudent = false;
    this.isInstructor = false;

    Auth.isLoggedIn((result) => {
      this.loggedin = result;
      if (this.loggedin){
        Auth.isAdmin((result) => {
          this.isAdmin = result;
        })
        Auth.getCurrentUser((user) => {
          this.isStudent = !user.isInstructor;
          this.isInstructor = user.isInstructor;
          this.user = user;
        });
      }
    });

    this.isCollapsed = true;

    this.help = () => {
        if (this.user.firstName && this.isStudent){
            $window.location.href = "https://github.com/rcos/venue/wiki/Student-How-to";
        }else if (this.isInstructor){
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

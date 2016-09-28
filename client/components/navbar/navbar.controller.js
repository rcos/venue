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


    this.menu = [
    {
      'title': 'Dashboard',
      'link': '/student/dashboard',
      'forInstructor': false
    },{
      'title': 'Dashboard',
      'link': '/instructor/dashboard',
      'forInstructor': true
    },{
      'title': 'Upload',
      'link': '/student/upload',
      'forInstructor': false
    },{
      'title': 'Create Event',
      'link': '/instructor/newevent',
      'forInstructor': true
    },{
      'title': 'Events',
      'link': '/instructor/events',
      'forInstructor': true
    },{
      'title': 'Events',
      'link': '/student/events',
      'forInstructor': false
    },{
      'title': 'Search Courses',
      'link': '/courses',
      "noauth": true
    }];

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

  isMenuAccessible(navItem){
    if (!this.isLoggedIn && !navItem.noauth) return false;
    if (navItem.forInstructor === undefined) return true;
    if (this.isStudent && (!navItem.forInstructor)) return true;
    if (this.isInstructor && (navItem.forInstructor)) return true;
    return false;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

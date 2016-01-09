'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/',
    "noauth": true
  }, {
    'title': 'Search Courses',
    'link': '/courses',
    "noauth": true
  },{
    'title': 'Dashboard',
    'link': '/student/dashboard',
    'forInstructor': false
  },{
    'title': 'Dashboard',
    'link': '/instructor/dashbord',
    'forInstructor': true
  },{
    'title': 'Upload',
    'link': '/student/upload',
    'forInstructor': false
  },{
    'title': 'Create Event',
    'link': '/instructor/newevent',
    'forInstructor': true
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.getCurrentUser((user) => {
      this.isStudent = !user.isInstructor;
      this.isInstructor = user.isInstructor;
      this.user = user;
    });
  }

  isMenuAccessible(navItem){
    if (!this.isLoggedIn() && !navItem.noauth) return false;
    if (navItem.forInstructor === undefined) return true;
    if (this.isStudent && (!navItem.forInstructor)) return true;
    if (this.isInstructor && (navItem.forInstructor)) return true;
    return false;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('venueApp')
  .controller('NavbarController', NavbarController);

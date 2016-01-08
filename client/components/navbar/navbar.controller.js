'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  }, {
    'title': 'Courses',
    'link': '/courses'
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

  isMenuAccessible(forInstructor){
    // console.log(user, forInstructor. user.isStudent, user.isInstructor);
    if (forInstructor === undefined) return true;
    if (this.isStudent && (!forInstructor)) return true;
    if (this.isInstructor && (forInstructor)) return true;
    return false;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('venueApp')
  .controller('NavbarController', NavbarController);

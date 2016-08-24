'use strict';

export class NavbarComponent {

  constructor($location, Auth, $window) {
    'ngInject';

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

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
    //end-non-standard

    this.getCurrentUser((user) => {
      this.isStudent = !user.isInstructor;
      this.isInstructor = user.isInstructor;
      this.user = user;
    });

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

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;

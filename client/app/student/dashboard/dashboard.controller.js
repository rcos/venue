
'use strict';

class DashboardCtrl {
  //start-non-standard

  user = {};
  courses = [];
  events = {};
  $scope = this;

  //end-non-standard

  constructor(Auth, $location, $routeParams, User, Course, Event, $scope) {
    // $scope.test = "hello";

    this.Auth = Auth;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.User = User;
    this.Course = Course;
    this.Event = Event;
    this.getUser();
  }

  getUser(){
    this.User.getCourses()
      .$promise.then((crs) => {
        this.courses.push(crs);
        console.log(this.courses)
        this.getEvents(crs.events)
      });
    // this.Auth.getCurrentUser((usr) => {
    //   console.log(usr);
    //   this.user = usr;
    //   this.getCourses(usr.courses);
    // });
  }

  //
  // getCourses(courses){
  //   for(var course in courses){
  //     this.Course.get({ id: courses[course] })
  //       .$promise.then((crs) => {
  //
  //         this.courses.push(crs);
  //         console.log(this.courses)
  //         this.getEvents(crs.events)
  //       });
  //   }
  // }
  //
  // getEvents(events){
  //   events.forEach( (evt) => {
  //
  //       this.Event.get({id:evt})
  //       .$promise.then((evnt) => {
  //         console.log(evt);
  //
  //         // if(evt !in this.events){
  //
  //           this.events[evt] = evnt;
  //           console.log(evt);
  //           console.log(! this.events[evt]);
  //           console.log(evt);
  //         // }
  //       });
  //   });
  // }
}

angular.module('venueApp')
  .controller('DashboardCtrl', DashboardCtrl);


/**
// 'use strict';

// angular.module('venueApp')
//   .controller('DashboardCtrl', function (this, $routeParams, User, Auth, Course, Event) {
//     this.message = 'Hello';
//
//
//     Auth.getCurrentUser(function(user){
//       this.user = user;
//       getCourses(user.courses);1
//       // getEvents(user.courses);
//       console.log(user);
//     });
//
//     function getCourses(courses){
//       for(var course in courses){
//         Course.get({ id: courses[course] })
//           .$promise.then( function(crs){
//             console.log(crs);
//
//             this.courses.push(crs);
//             getEvents(crs.events)
//           });
//       }
//     }
//
//     function getEvents(events){
//       for(var i=0; i< events.length; i++){
//
//           Event.get({id:events[i]})
//           .$promise.then( function(evt){
//
//             console.log(this.events[events[i]]);
//
//             if(events[i] in this.events){
//
//               this.events[events[i]] = evt;
//               console.log(events[i]);
//               console.log(! this.events[events[i]]);
//               console.log(evt);
//             }
//           });
//
//       }
//     }
//
//   });
*/

'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor($http, $route, User, Upload) {
    this.users = User.query();
    this.User = User;
    this.$http = $http;
    this.$route = $route;
  }

  uploadUserCSV(file){
    if (!file){
      console.log("null file");
      return;
    }

    Upload.upload({
        url: '/api/users/csv',
        data: {
          files: [file]
        },
        objectKey: '.k',
        arrayKey: '[i]'
    }).success(((response) => {
      this.csvResults = response.join("<br/>");
      this.users = this.User.query();
      this.users.sort(( a , b) => {
        return a.lastName > b.lastName;
      })
    }));
  }

  delete(user) {
    console.log("User",user);
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  addInstr(user) {
    this.User.promoteToInstructor({userId: user._id}, () => {
      this.users = this.User.query();
      this.users.sort(( a , b) => {
        return a.lastName > b.lastName;
      })
    })
  }

  reseed() {
      if (confirm("This clear the database, are you sure?") &&
          confirm("You cannot revert this operation, are you really sure?")){

          this.$http.post("/api/misc/reseed",{}, () => {
              this.$route.reload();
          });

      }
  }
}

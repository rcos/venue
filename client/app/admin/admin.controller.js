'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor($http, $route, User, Upload, Settings, ENV, CAS_ENABLED, LOCAL_LOGIN_ENABLED, DEBUG_LOGIN_ENABLED) {
    this.users = User.query();
    this.User = User;
    this.$http = $http;
    this.Upload = Upload;
    this.$route = $route;
    this.sortorder = 'lastName';
    this.settings = {};

    this.devMode = ENV == "development";
    this.CAS_ENABLED = CAS_ENABLED;
    this.LOCAL_LOGIN_ENABLED = LOCAL_LOGIN_ENABLED;
    this.DEBUG_LOGIN_ENABLED = DEBUG_LOGIN_ENABLED;

    Settings.current({},(response) => {
      this.settings = response;
    },(error) => {
      this.settings = {};
    });
  }

  toggleLogin(type){
    var update = {};
    update[type] = !this.settings.login[type]
    this.$http.put('/api/settings/login', update)
    .success(() => {
      this.settings.login[type] = !this.settings.login[type]
    }).error(() => {
    });
  }

  uploadUserCSV(file){
    if (!file){
      //console.log("null file");
      return;
    }

    this.Upload.upload({
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
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  updateInstr(user, value) {
    this.User.updateInstructorStatus({userId: user._id, status:value}, () => {
      this.users = this.User.query();
    })
  }

  updateAdmin(user, value) {
    this.User.updateAdminStatus({userId: user._id, status:value}, () => {
      this.users = this.User.query();
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

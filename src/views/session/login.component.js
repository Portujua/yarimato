;(() => {

  class LoginController {
    constructor(Auth, PageService, RecoveryPasswordService, $location) {
      this.Auth = Auth;
      this.credentials = {
        username: null,
        password: null,
      }

      this.PageService = PageService;
      this.RecoveryPasswordService = RecoveryPasswordService;
      this.$location = $location;
    }

    $onInit() {
      this.Auth.logout();
      let qs = this.$location.search();

      if (!_.isEmpty(qs)) {

        this.RecoveryPasswordService.validateExpirationToken({ resetToken: qs.resetToken })
          .then((response) => {
            this.newPassword(qs.resetToken);
          }, () => {
          });

      }
    }


    login(credentials) {
      this.isLoading = true;
      this.isError = false;

      this.Auth.login(credentials)
        .then((response) => {
          this.Auth.goHome();
        }, (response) => {
          this.isError = true;
        }).finally(() => {
        this.isLoading = false;
      });
    }

    recoveryPassword() {
      this.RecoveryPasswordService.openCreateModal()
        .then((response) => {
          this.load();
        }, () => {
        });


    }

    newPassword(token) {

      this.RecoveryPasswordService.openNewPasswordModal(token)
        .then((response) => {
          this.load();
        }, () => {
        });

    }


  }

  angular.module('app')
    .component('login', {
      templateUrl: 'views/session/login.html',
      controller: LoginController,
    });

})();

(() => {
  class RootController {
    constructor(Auth) {
      this.session = Auth.getSession();
    }

    $onInit() {
      //
    }
  }

  angular.module('app').component('root', {
    templateUrl: 'views/root/root.html',
    controller: RootController
  });
})();

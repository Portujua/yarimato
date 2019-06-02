(() => {
  class HomeController {
    constructor(HomeService) {
      this.HomeService = HomeService;
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }
  }

  angular.module('app').component('home', {
    templateUrl: 'views/home/home.html',
    controller: HomeController,
    controllerAs: '$ctrl',
    bindings: {
      tabId: '@'
    }
  });
})();

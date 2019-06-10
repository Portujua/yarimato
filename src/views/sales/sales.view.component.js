(() => {
  class SalesViewController extends BaseController {
    constructor(SaleService, Sale) {
      super();
      this.SaleService = SaleService;
      this.Sale = Sale;

      this.data = new this.Sale({});
    }

    $onInit() {
      if (_.isEmpty(this.resolve.id)) {
        console.error('No ID provided for Sale View modal.');
        this.cancel('Not ID provided.');
      }

      this.load();
    }

    load() {
      this.loadingPromise = this.SaleService.get(this.resolve.id).then((response) => {
        this.data = new this.Sale(response.data);
      })
    }

    close(reason = {}) {
      this.modalInstance.close(reason);
    }

    cancel(reason = {}) {
      this.modalInstance.dismiss(reason);
    }
  }

  angular.module('app').component('salesView', {
    templateUrl: 'views/sales/sales.view.html',
    controller: SalesViewController,
    controllerAs: '$ctrl',
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();

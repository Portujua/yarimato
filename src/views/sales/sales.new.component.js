(() => {
  class SalesNewController extends BaseController {
    constructor(ProductService, SaleService, Sale) {
      super();
      this.ProductService = ProductService;
      this.SaleService = SaleService;
      this.Sale = Sale;

      this.data = new this.Sale({});
    }

    $onInit() {
      this.load();
    }

    load() {
      this.loadingPromise = this.ProductService.list().then((response) => {
        this.products = response.data;
      })
    }

    close(reason = {}) {
      this.modalInstance.close(reason);
    }

    cancel(reason = {}) {
      this.modalInstance.dismiss(reason);
    }

    save() {
      this.isSaving = true;

      this.loadingPromise = this.SaleService.create(this.data.payload()).then((response) => {
        this.close(response);
      }).finally(() => {
        this.isSaving = false;
      })
    }
  }

  angular.module('app').component('salesNew', {
    templateUrl: 'views/sales/sales.new.html',
    controller: SalesNewController,
    controllerAs: '$ctrl',
    bindings: {
      modalInstance: '<'
    }
  });
})();

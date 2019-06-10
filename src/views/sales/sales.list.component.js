(() => {
  class SalesListController extends BaseController {
    constructor(NgTableParams, SaleService) {
      super();
      this.NgTableParams = NgTableParams;
      this.SaleService = SaleService;
    }

    $onInit() {
      this.load();
    }

    load(keyword = '') {
      this.loadingPromise = this.SaleService.list().then((response) => {
        this.data = response.data;
      })
    }

    create() {
      this.SaleService.openCreateModal().then((response) => {
        this.load();
      })
    }

    view(sale) {
      this.SaleService.openViewModal(sale._id).then((response) => {
        this.load();
      })
    }
  }

  angular.module('app').component('salesList', {
    templateUrl: 'views/sales/sales.list.html',
    controller: SalesListController,
    controllerAs: '$ctrl',
    bindings: {
    }
  });
})();

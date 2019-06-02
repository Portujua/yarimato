(() => {
  class ProductsNewController extends BaseController {
    constructor(ProductService, Product) {
      super();
      this.ProductService = ProductService;
      this.Product = Product;

      this.data = new this.Product({});
    }

    $onInit() {
      this.load();
    }

    load() {
      //
    }

    close(reason = {}) {
      this.modalInstance.close(reason);
    }

    cancel(reason = {}) {
      this.modalInstance.dismiss(reason);
    }

    save() {
      this.isSaving = true;

      this.loadingPromise = this.ProductService.create(this.data.payload()).then((response) => {
        this.close(response);
      }).finally(() => {
        this.isSaving = false;
      })
    }
  }

  angular.module('app').component('productsNew', {
    templateUrl: 'views/products/products.new.html',
    controller: ProductsNewController,
    controllerAs: '$ctrl',
    bindings: {
      modalInstance: '<'
    }
  });
})();

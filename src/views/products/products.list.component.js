(() => {
  class ProductsListController extends BaseController {
    constructor(NgTableParams, ProductService, Product) {
      super();
      this.NgTableParams = NgTableParams;
      this.ProductService = ProductService;
      this.Product = Product;
    }

    $onInit() {
      this.load();
    }

    load(keyword = '') {
      this.loadingPromise = this.ProductService.list({ keyword }).then((response) => {
        this.data = response.data;
      })
    }

    save(value, _item, field) {
      let item = new this.Product(_item);
      item[field] = value;

      this.loadingPromise = this.ProductService.update(item._id, item.payload(field)).then((response) => {
        item = response.data;
      })
    }

    create() {
      this.ProductService.openCreateModal().then((response) => {
        this.load();
      })
    }
  }

  angular.module('app').component('productsList', {
    templateUrl: 'views/products/products.list.html',
    controller: ProductsListController,
    controllerAs: '$ctrl',
    bindings: {
    }
  });
})();

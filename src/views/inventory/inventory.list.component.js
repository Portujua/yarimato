(() => {
  class InventoryListController extends BaseController {
    constructor(NgTableParams, InventoryService, ProductService) {
      super();
      this.NgTableParams = NgTableParams;
      this.InventoryService = InventoryService;
      this.ProductService = ProductService;

      this.selectedProduct = null;
    }

    $onInit() {
      this.load();
    }

    load(keyword = '') {
      this.loadingPromise = this.ProductService.list().then((response) => {
        this.products = response.data;
      })
    }

    loadInventory() {
      this.loadingPromise = this.InventoryService.list(this.selectedProduct._id).then((response) => {
        this.inventory = response.data;
      })
    }

    save(value, _item, field) {
      let item = new this.Product(_item);
      item[field] = value;

      this.loadingPromise = this.InventoryService.update(item._id, item.payload(field)).then((response) => {
        item = response.data;
      })
    }

    create() {
      this.InventoryService.openCreateModal(this.selectedProduct).then((response) => {
        this.refresh();
      })
    }

    refresh(keyword = '') {
      if (!_.isNull(this.selectedProduct) && !_.isUndefined(this.selectedProduct)) {
        this.loadInventory();
      } else {
        this.load(keyword);
      }
    }
  }

  angular.module('app').component('inventoryList', {
    templateUrl: 'views/inventory/inventory.list.html',
    controller: InventoryListController,
    controllerAs: '$ctrl',
    bindings: {
    }
  });
})();

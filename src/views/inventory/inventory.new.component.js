(() => {
  class InventoryNewController extends BaseController {
    constructor(InventoryService, UserService, Inventory) {
      super();
      this.InventoryService = InventoryService;
      this.UserService = UserService;
      this.Inventory = Inventory;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.product = this.resolve.product;
      this.data = new this.Inventory({ product: this.product });

      this.loadingPromise = this.UserService.listOwners().then((response) => {
        this.owners = response.data;
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

      this.loadingPromise = this.InventoryService.create(this.product._id, this.data.payload()).then((response) => {
        this.close(response);
      }).finally(() => {
        this.isSaving = false;
      })
    }
  }

  angular.module('app').component('inventoryNew', {
    templateUrl: 'views/inventory/inventory.new.html',
    controller: InventoryNewController,
    controllerAs: '$ctrl',
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();

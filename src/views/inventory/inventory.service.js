(() => {
  class InventoryService extends BaseService {
    constructor($uibModal, RESTful, Message) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
      this.Message = Message;
    }

    list(productId, query = {}) {
      return this.RESTful.get(`products/${productId}/inventory`, query);
    }

    update(id, payload) {
      return this.RESTful.put(`inventory/${id}`, payload)
    }

    create(productId, payload) {
      return this.RESTful.post(`products/${productId}/inventory`, payload);
    }

    openCreateModal(product) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'inventoryNew',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'full',
        resolve: {
          product: () => product
        }
      });

      return modalInstance.result;
    }
  }

  angular.module('app').service('InventoryService', InventoryService);
})();

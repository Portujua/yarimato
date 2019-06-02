(() => {
  class ProductService extends BaseService {
    constructor($uibModal, RESTful, Message) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
      this.Message = Message;
    }

    list(query = {}) {
      return this.RESTful.get('products', query);
    }

    update(id, payload) {
      return this.RESTful.put(`products/${id}`, payload)
    }

    create(payload) {
      return this.RESTful.post('products', payload);
    }

    openCreateModal() {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'productsNew',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'full',
        resolve: {}
      });

      return modalInstance.result;
    }
  }

  angular.module('app').service('ProductService', ProductService);
})();

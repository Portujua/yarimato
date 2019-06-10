(() => {
  class SaleService extends BaseService {
    constructor($uibModal, RESTful, Message) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
      this.Message = Message;
    }

    list(query = {}) {
      return this.RESTful.get('sales', query);
    }

    create(payload) {
      return this.RESTful.post('sales', payload);
    }

    get(id) {
      return this.RESTful.get(`sales/${id}`)
    }

    openViewModal(id) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'salesView',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'full',
        resolve: {
          id: () => id
        }
      });

      return modalInstance.result;
    }

    openCreateModal() {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'salesNew',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'full',
        resolve: {
        }
      });

      return modalInstance.result;
    }
  }

  angular.module('app').service('SaleService', SaleService);
})();

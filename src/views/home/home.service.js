(() => {
  class HomeService extends BaseService {
    constructor($uibModal, RESTful, Message) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
      this.Message = Message;
    }

    getSidebarButton() {
      return {
        title: 'Dashboard',
        icon: 'fa-tachometer',
        order: -1,
        tab: {
          id: 'home',
          title: 'Dashboard',
          component: 'home',
          icon: 'fa-tachometer',
          isPinned: true,
          order: -1,
          isThin: true
        }
      };
    }

    openSettings() {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'homeSettingsView',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'md',
        resolve: {}
      });

      return modalInstance.result;
    }

    listMyDashboardItems() {
      return this.RESTful.get('me/dashboard-entries', { selected: true });
    }

    listAvailableDashboardItems() {
      return this.RESTful.get('dashboard-entries', { available: true, expand: '.permission' });
    }

    saveDashboard(payload) {
      return this.RESTful.post('me/dashboard-entries', payload).then((response) => {
        this.Message.update('home setting');
      });
    }

    getSummary() {
      return this.RESTful.get('dashboard-entries/summary');
    }

    updateDashboard(payload) {
      return this.RESTful.put('me/dashboard-entries/bulk', payload).then((response) => {
        this.Message.update('Dashboard');
      });
    }
  }

  angular.module('app').service('HomeService', HomeService);
})();

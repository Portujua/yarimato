(() => {
  class UserService extends BaseService {
    constructor($uibModal, RESTful) {
      super();
      this.$uibModal = $uibModal;
      this.RESTful = RESTful;
    }

    listOwners() {
      return this.RESTful.get('users/owners');
    }
  }

  angular.module('app').service('UserService', UserService);
})();

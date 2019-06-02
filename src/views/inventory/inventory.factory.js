angular.module('app').factory('Inventory', () => {
  class Inventory extends BaseFactory {
    constructor({ _id = null, product = null, amount = null, createdAt = null, owner = null }) {
      super({
        _id, product, amount, createdAt, owner
      });
    }

    payload(field = null) {
      if (!_.isNull(field)) {
        return { [field]: this[field] };
      }

      return {
        product: this.product._id,
        amount: this.amount,
        owner: this.owner
      }
    }
  }

  return Inventory;
});

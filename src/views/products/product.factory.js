angular.module('app').factory('Product', () => {
  class Product extends BaseFactory {
    constructor({ _id = null, name = null, price = null }) {
      super({
        _id, name, price
      });
    }

    payload(field = null) {
      if (!_.isNull(field)) {
        return { [field]: this[field] };
      }

      return {
        name: this.name,
        price: this.price
      }
    }
  }

  return Product;
});

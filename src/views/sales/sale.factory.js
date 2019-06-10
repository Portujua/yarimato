angular.module('app').factory('Sale', () => {
  class Sale extends BaseFactory {
    constructor({ _id = null, product = null, unitPrice = null, amount = null, createdAt = null, inventoriesUsed = null, profit = 0, totalInventoryPrice = 0 }) {
      super({
        _id, product, unitPrice, amount, createdAt, inventoriesUsed, profit, totalInventoryPrice
      });

      if (!_.isNull(this.inventoriesUsed) && _.isArray(this.inventoriesUsed)) {
        this.totalInventoryPrice = 0
        _.each(this.inventoriesUsed, (item) => {
          this.totalInventoryPrice += item.amount * item.inventory.price
        })

        this.profit = this.unitPrice * this.amount - this.totalInventoryPrice
      }
    }

    payload(field = null) {
      if (!_.isNull(field)) {
        return { [field]: this[field] };
      }

      return {
        product: this.product._id,
        unitPrice: this.unitPrice,
        amount: this.amount
      }
    }
  }

  return Sale;
});

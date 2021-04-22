const path = require('path');

const { models: modelsPath } = config.path;

// Model
const Address = require(path.join(modelsPath, '/Address'));
const Category = require(path.join(modelsPath, '/Category'));
const Order = require(path.join(modelsPath, '/Order'));
const OrderItem = require(path.join(modelsPath, '/OrderItem'));
const Product = require(path.join(modelsPath, '/Product'));
const User = require(path.join(modelsPath, '/User'));

// Base Controller
class Controller {
  constructor() {
    this.bindMethods();
  }

  // * validators (array of middlewares) - order matters
  validators = [];

  // * models for later references to them
  model = {
    Address,
    Category,
    Order,
    OrderItem,
    Product,
    User,
  };

  bindMethods() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
      if (this[key] instanceof Function && key !== 'constructor')
        this[key] = this[key].bind(this);
    });
  }

  // * single item - override this for your custom outputs
  transform(item) {
    return item;
  }

  // * multiple items
  transformCollection(items) {
    return items.map(this.transform);
  }
}

module.exports = Controller;

// Base Controller
class Controller {
  constructor() {
    this.bindMethods();
  }

  // * models for later references to them
  models = {};

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

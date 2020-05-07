export default class ShoppingCar {
  objectDom = null;
  productAdded = [];
  constructor(idTarget) {
    this.objectDom = document.querySelector(`#${idTarget}`);
  }

  addProduct = (product) => {
    this.productAdded.push(product);
  };
}

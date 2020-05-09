import Product from "../entities/product/product";
import ProductsData from "../data/products.data";
import Utils from "../utils/utils";

export default class ShoppingcarController {
  objectDomCarList = null;
  prodAdded = {};
  constructor() {
    this.objectDomCarList = document.querySelector(".carlist-products");
  }

  addProduct = (idProduct) => {
    const product = this.setProduct(idProduct);

    if (product.quantity === 1) {
      const textProduct = `<div class="product-name" id="product-name-${
        product.id
      }">${product.name}</div>
        <div class="product-quantity" id="product-quantity-${product.id}">${
        product.quantity
      }</div>
        <div class="product-price" id="product-price-${
          product.id
        }">${Utils.formatCurrency(product.price)}</div>`;
      let divProductItem = document.createElement("div");
      divProductItem.classList.add("carlist-product-item");
      divProductItem.innerHTML = textProduct;
      this.objectDomCarList.appendChild(divProductItem);
    } else {
      document.querySelector(`#product-name-${product.id}`).innerHTML =
        product.name;
      document.querySelector(`#product-quantity-${product.id}`).innerHTML =
        product.quantity;
      document.querySelector(`#product-price-${product.id}`).innerHTML =
      Utils.formatCurrency(product.price);
    }
  };

  setProduct = (idProduct) => {
    const product = ProductsData.find((prod) => prod.id === idProduct);
    if (this.prodAdded[product.id]) {
      this.prodAdded[product.id].quantity++;
      this.prodAdded[product.id].price += this.prodAdded[product.id].price;
    } else {
      this.prodAdded[product.id] = new Product(
        product.id,
        product.name,
        product.price,
        1
      );
    }
    return this.prodAdded[product.id];
  };
}

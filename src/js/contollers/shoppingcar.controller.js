import Product from "../models/product/product";
import ProductsData from "../data/products.data";
import Utils from "../utils/utils";

/**
 * ShoppingcarController
 * Features of Car list products selected
 */
export default class ShoppingcarController {
  objectDomCarList = null;
  prodAdded = {};
  constructor() {
    this.objectDomCarList = document.querySelector(".carlist-products");
  }

  /**
   * AddProduct
   * Create dom and insert or update dynamic on html
   * Update total
   * idProduct:string
   */
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
      divProductItem.id = `product-item-${product.id}`;
      divProductItem.classList.add("carlist-product-item");

      const divDelete = document.createElement("div");
      divDelete.className = "product-delete";
      const buttonDelete = document.createElement("button");
      buttonDelete.id = product.id;
      buttonDelete.className = "product-delete";
      buttonDelete.innerHTML = "Borrar";
      buttonDelete.onclick = this.deleteProduct;
      divDelete.appendChild(buttonDelete);
      divProductItem.innerHTML = textProduct;
      divProductItem.appendChild(divDelete);
      this.objectDomCarList.appendChild(divProductItem);
    } else {
      document.querySelector(`#product-name-${product.id}`).innerHTML =
        product.name;
      document.querySelector(`#product-quantity-${product.id}`).innerHTML =
        product.quantity;
      document.querySelector(
        `#product-price-${product.id}`
      ).innerHTML = Utils.formatCurrency(product.price);
    }
    // update the total
    this.setTotal();
  };

  /**
   * deleteProduct
   * Remove item of array and html
   * Update total
   */
  deleteProduct = (event) => {
    delete this.prodAdded[event.target.id];
    document.querySelector(`#product-item-${event.target.id}`).remove();
    this.setTotal();
  };

  /**
   * setProduct
   * with idproduct prameter where data of ProductData array
   * add product
   * return new Product;
   */
  setProduct = (idProduct) => {
    const product = ProductsData.find((prod) => prod.id === idProduct);
    if (this.prodAdded[product.id]) {
      this.prodAdded[product.id].quantity++;
      this.prodAdded[product.id].price += product.price;
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

  /**
   * setTotal
   * Iterate product added and get the total
   * Set the total in html
   */
  setTotal = (idProduct) => {
    let total = 0;
    for (let product in this.prodAdded) {
      total += this.prodAdded[product].price;
    }
    document.querySelector(".total").innerHTML = Utils.formatCurrency(total);
  };
}

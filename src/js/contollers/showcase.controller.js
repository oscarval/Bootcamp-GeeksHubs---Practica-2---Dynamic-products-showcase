import Product from "../entities/product/product";
import DragDropController from "./dragdrop.controller";
import ShoppingcarController from "./shoppingcar.controller";

import Utils from "../utils/utils";
export default class ShowcaseController {
  pathImg = "./assets/img";
  productList = [];
  dragDropController = new DragDropController();
  shoppingcarController = new ShoppingcarController();
  objectDomDropTarget;
  constructor(productsData) {
    this.productList = productsData.map((product) => {
      const productPriceDom = document.querySelector(`.${product.id}-price`);
      const productImgDom = document.querySelector(`#${product.id}`);
      productPriceDom.innerHTML = Utils.formatCurrency(product.price);
      productImgDom.src = `${this.pathImg}/${product.img}`;
      return new Product(product.id, product.name, product.price);
    });
  }

  initialDragDrop = (idDropTarget) => {
    // init drag targets and listeners
    document.addEventListener("dragstart", this.onDragStart);
    document.addEventListener("dragover", this.onDragOver);
    document.addEventListener("dragend", this.onDragEnd, false);

    // init drop target
    this.objectDomDropTarget = document.querySelector(`#${idDropTarget}`);
    // init drop event listeners
    this.objectDomDropTarget.addEventListener(
      "dragover",
      this.onDropOver,
      false
    );
    this.objectDomDropTarget.addEventListener(
      "dragleave",
      this.onDragLeave,
      false
    );
    document.addEventListener("drop", this.onDrop, false);
  };

  onDragStart = (e) => {
    this.dragDropController.onDragStart(e, e.target);
  };

  onDragLeave = (e) => {
    e.preventDefault();
    this.dragDropController.removeClass(this.objectDomDropTarget);
  };

  onDragOver = (e) => {
    this.dragDropController.onDragOver(e);
  };

  onDropOver = (e) => {
    e.preventDefault();
    this.dragDropController.addClass(this.objectDomDropTarget);
  };

  onDragEnd = (e) => {
    this.dragDropController.onDragEnd(e, e.target);
  };

  onDrop = (e) => {
    if (
      e.target.id === this.objectDomDropTarget.id ||
      e.path[1].id === this.objectDomDropTarget.id
    ) {
      this.dragDropController.onDrop(e, this.objectDomDropTarget);
      const productId = e.dataTransfer.getData("Text");
      if (productId) {
        this.shoppingcarController.addProduct(productId);
      }
    }
  };
}

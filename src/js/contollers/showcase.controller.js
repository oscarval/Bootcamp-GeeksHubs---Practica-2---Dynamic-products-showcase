import Product from "../entities/product/product";
import DragDropController from "./dragdrop.controller";

export default class ShowcaseController {
  productList = [];
  dragDropController = new DragDropController();
  objectDomDropTarget;
  constructor(productsData) {
    this.productList = productsData.map((product) => {
      return new Product(product.id, product.name, product.price);
    });
  }

  initialDragDrop = (idDropTarget) => {
    // init drag targets and listeners
    this.productList.forEach((product) => {
      let objectDom = document.querySelector(`#${product.id}`);
      objectDom.addEventListener("dragstart", this.onDragStart, false);
      objectDom.addEventListener("dragover", this.onDragOver, false);
      // objectDom.addEventListener("dragleave", this.onDragleave, false);
      objectDom.addEventListener("dragend", this.onDragEnd, false);
    });

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
      this.onDragleave,
      false
    );
    this.objectDomDropTarget.addEventListener("drop", this.onDrop, false);
  };

  onDragStart = (e) => {
    this.dragDropController.onDragStart(e, e.target);
  };

  onDragleave = (e) => {
    this.dragDropController.removeClass(this.objectDomDropTarget);
  };

  onDragOver = (e) => {
    this.dragDropController.onDragOver(e);
  };

  onDropOver = (e) => {
    this.dragDropController.addClass(this.objectDomDropTarget);
  };

  onDragEnd = (e) => {
    this.dragDropController.onDragEnd(e, e.target);
  };

  onDrop = (e) => {
    this.dragDropController.onDrop(e, this.objectDomDropTarget);
  };
}

import Product from "../entities/product/product";
import DragDropController from "./dragdrop.controller";
import ShoppingcarController from "./shoppingcar.controller";

export default class ShowcaseController {
  productList = [];
  dragDropController = new DragDropController();
  shoppingcarController = new ShoppingcarController();
  objectDomDropTarget;
  constructor(productsData) {
    this.productList = productsData.map((product) => {
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
    document.addEventListener("drop", this.onDrop, false);
  };

  onDragStart = (e) => {
    this.dragDropController.onDragStart(e, e.target);
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
    this.dragDropController.onDrop(e, this.objectDomDropTarget);
    const productId = event.dataTransfer.getData("Text");
    if(productId){
      this.shoppingcarController.addProduct(productId);
    }
  };
}

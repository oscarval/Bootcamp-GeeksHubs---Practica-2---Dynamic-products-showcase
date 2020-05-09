/**
 * DragDropController class
 * Basic use of drag and drop events
 */
export default class DragDropController {
  constructor() {}

  onDragStart = (e, objectDom) => {
    e.dataTransfer.setData("Text", e.target.id);
    this.addClass(objectDom);
  };

  onDragOver = (e) => {
    e.preventDefault(); // Necessary. Allows us to drop.
  };

  onDragEnd = (e, objectDom) => {
    e.preventDefault();
    this.removeClass(objectDom);
  };

  onDrop = (e, objectDomDropTarget) => {
    e.preventDefault();
    this.removeClass(objectDomDropTarget);
  };

  addClass = (objectTarget) => {
    objectTarget.classList.add("onDragStart");
  };

  removeClass = (objectTarget) => {
    objectTarget.classList.remove("onDragStart");
  };
}

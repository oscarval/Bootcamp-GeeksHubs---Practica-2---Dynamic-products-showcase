export default class DragDropController {
  constructor() {}

  onDragStart = (e, objectDom) => {
    this.addClass(objectDom);
  };

  onDragOver = (e) => {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = "move"; // See the section on the DataTransfer object.
    return false;
  };

  onDragEnd = (e, objectDom) => {
    this.removeClass(objectDom);
  };

  onDrop = (e, objectDomDropTarget) => {
    this.removeClass(objectDomDropTarget);
  };

  addClass = (objectTarget) => {
    objectTarget.classList.add("onDragStart");
  };

  removeClass = (objectTarget) => {
    objectTarget.classList.remove("onDragStart");
  };
}

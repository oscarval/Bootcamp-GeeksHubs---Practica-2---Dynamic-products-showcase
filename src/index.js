/* imports */
import "./styles/index.scss";
import ProductsData from "./js/data/products.data";
import ShowcaseController from "./js/contollers/showcase.controller";

/* init the app showcase */
const showcase = new ShowcaseController(ProductsData);
showcase.initialDragDrop("dropShoppingCar");

if (module.hot) {
  module.hot.accept();
}

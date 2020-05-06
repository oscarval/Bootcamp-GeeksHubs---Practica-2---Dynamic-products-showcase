import "./styles/index.scss";
import ShoppingCar from "./js/shoppingCar";

const car = new ShoppingCar();

if (module.hot) {
  module.hot.accept();
}

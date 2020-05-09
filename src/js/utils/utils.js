/*
 * Utils class
 * This class have a static methods
 */
export default class Utils {
  constructor() {}

  // Format number like currency
  // value:int
  // return:string formated with €
  static formatCurrency = (value) => {
    value = value.toFixed(2);
    const result = (value ? value.toString() : "0") + " €";
    return result;
  };
}

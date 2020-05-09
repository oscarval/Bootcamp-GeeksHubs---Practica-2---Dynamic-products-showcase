export default class Utils {
  constructor() {}

  static formatCurrency = (value) => {
    value = value.toFixed(2);
    const result = (value ? value.toString() : "0") + " €";
    return result;
  };
}

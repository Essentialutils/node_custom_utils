export {};
/**
 * Checks if the given string represents a valid hexadecimal color code.
 *
 * @returns {boolean} `true` if the string is a valid color code, `false` otherwise.
 *
 * @example
 * "#123".cIsValidColorCode(); // true
 * "#12345".cIsValidColorCode(); // false
 * "red".cIsValidColorCode(); // false
 */
String.prototype.cIsValidColorCode = function () {
  const colorCodeRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  return colorCodeRegex.test(this.toString());
};

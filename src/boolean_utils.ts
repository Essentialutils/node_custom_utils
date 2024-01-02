/**
 * Converts a value to a boolean in a safe manner.
 *
 * This function checks if the input value is truthy and if its string representation is "true".
 * If the value is truthy and its string representation is "true", it returns true; otherwise, it returns false.
 *
 * @param {*} value - The value to be converted to a boolean.
 * @returns {boolean} - The boolean representation of the input value.
 *
 * @example
 * const result = cToBooleanSafe("true"); // Returns true
 * const result2 = cToBooleanSafe("false"); // Returns false
 * const result3 = cToBooleanSafe(1); // Returns false
 */
export const cToBooleanSafe = (value: any): boolean => {
  return value ? value.toString() === "true" : false;
};

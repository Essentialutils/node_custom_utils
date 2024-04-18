/**
 * ## Converts a floating-point number to an integer.
 * If the number is not a floating-point (i.e., it is already an integer or NaN), specific rules apply:
 * - For NaN (Not a Number), the function returns 0.
 * - For integers, it simply returns the same integer value.
 * - For floating-point numbers, it truncates the number after multiplying by 100 (effectively handling two decimal places).
 *
 * @param {number} num - The number to convert. Can be any floating-point number or integer.
 * @returns {number} The converted integer. If the input is NaN, returns 0.
 *                  For floating-point numbers, returns the truncated integer of the number multiplied by 100.
 *                  For integers, returns the integer itself.
 *
 * @example
 * // returns 0
 * cConvertDoubleToInt(NaN);
 *
 * @example
 * // returns 100
 * cConvertDoubleToInt(1.0);
 *
 * @example
 * // returns 12345
 * cConvertDoubleToInt(123.45);
 */
export const cConvertDoubleToInt = (num: number): number => {
  // Check if the input is NaN
  if (isNaN(num)) {
    return 0; // Return 0 if the input is NaN
  }
  // Proceed with the original logic if the input is a valid number
  return num % 1 === 0 ? num : Math.trunc(num * 100);
};
0;

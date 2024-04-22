/**
 * Converts a floating-point number to an integer representation by multiplying by 100 and rounding.
 * This can be useful for scenarios where precision to two decimal places is needed in integer form,
 * such as storing currency values in cents to avoid floating point arithmetic issues.
 *
 * @param {number} num - The floating-point number to be converted. If this is not a number, it defaults to 0.
 * @returns {number} The converted integer. The input is first checked if it is a number using `isNaN`.
 *                   If it is not a number, the function defaults to 0. Otherwise, it multiplies the number
 *                   by 100 and rounds it to the nearest integer to handle the conversion.
 *
 * Example:
 * cConvertDoubleToInt(123.456) // Returns 12346
 * cConvertDoubleToInt(NaN)     // Returns 0
 */
export const cConvertDoubleToInt = (num: number): number => {
  return Math.round((isNaN(num) ? 0 : num) * 100);
};

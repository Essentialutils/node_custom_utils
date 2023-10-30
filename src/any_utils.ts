/**
 * Converts a JavaScript object or a JSON string to a JavaScript object.
 *
 * @param {any} data - The input data to be converted to a JavaScript object.
 * @returns {object | undefined} - A JavaScript object if the input is a JSON string or an object, undefined otherwise.
 * @throws {Error} Will throw an error if the input data cannot be converted into a JSON format.
 *
 * @example
 * const jsonData = '{"name": "John", "age": 30}';
 * const jsonObject = cToJson(jsonData);
 * console.log(jsonObject); // Output: { name: 'John', age: 30 }
 *
 * @example
 * const data = { name: 'Alice', age: 25 };
 * const convertedData = cToJson(data);
 * console.log(convertedData); // Output: { name: 'Alice', age: 25 }
 *
 * @example
 * const invalidData = 'not a valid JSON';
 * try {
 *   const result = cToJson(invalidData); // Throws an error
 * } catch (error) {
 *   console.error(error.message); // Output: "The data cannot be converted into a JSON format."
 * }
 */
export const cToJson = (data: any): object | undefined => {
  try {
    switch (typeof data) {
      case "object":
        return data;
      case "string":
        return JSON.parse(data);
      default:
        return;
    }
  } catch (error) {
    throw new Error("The data cannot be converted into a JSON format.");
  }
};

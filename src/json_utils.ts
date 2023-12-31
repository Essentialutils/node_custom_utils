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
    throw new Error(
      "The conversion of the data into JSON format is unfeasible using the cToJson() function."
    );
  }
};

/**
 * Filters the input list to keep only the unique objects.
 * @param inputList - An array of objects to filter for unique objects.
 * @returns An array containing only the unique objects from the input list.
 *
 * @example
 * // Example Usage
 * const inputList = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' }, // Duplicate object
 * ];
 *
 * const uniqueObjects = cGetUniqueObjects(inputList);
 * console.log(uniqueObjects);
 * // Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 **/
export const cGetUniqueObjects = (inputList: any[]): any[] => {
  let uniqueObjects: { [key: string]: boolean } = {};

  // Filter the input list, keeping only the unique objects
  let outputList = inputList.filter((obj) => {
    // Convert each object to a JSON string to use it as a key in the uniqueObjects object
    let key = JSON.stringify(obj);
    // If the object is not in uniqueObjects, add it and return true to keep it in the output list
    if (!uniqueObjects[key]) {
      uniqueObjects[key] = true;
      return true;
    }
    // If the object is already in uniqueObjects, return false to remove it from the output list
    return false;
  });

  return outputList;
};

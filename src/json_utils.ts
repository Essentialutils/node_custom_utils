/**
 * ## Converts a valid JSON string, object, or array into its corresponding object or array structure.
 * This function is designed to facilitate easy conversion and validation of JSON data by returning
 * the input directly if it's already an object (non-null) or array, or by attempting to parse it if
 * it's a string. If the input cannot be converted, the function throws an error.
 *
 * @param {string | object | Array<any>} input - The input to convert to a JSON object or array. Can be a JSON string, an object, or an array.
 * @returns {object | Array<any>} The parsed object or array if the input is a valid JSON string, or the input itself if it's already an object or array.
 * @throws {Error} Throws an error if the input is not a valid JSON string, object, or array, or if parsing fails. The error message includes a more descriptive message and, optionally, the original error message.
 * @example
 * // returns { a: 1 }
 * cToJson('{"a": 1}');
 *
 * @example
 * // returns [1, 2, 3]
 * cToJson("[1, 2, 3]");
 *
 * @example
 * // throws Error: "The input must be a valid JSON string, object, or array."
 * cToJson(42);
 *
 * @example
 * // returns { b: 2 }
 * cToJson({ b: 2 });
 */
export const cToJson = (
  input: string | object | Array<any>
): object | Array<any> | never => {
  // Explicitly include 'never' to indicate this function might throw
  // Directly return if input is an object (which includes arrays) but not null
  if (typeof input === "object" && input !== null) {
    return input;
  }

  // Attempt to parse if the input is a string
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed;
      }
    } catch (error: any) {
      // Provide a more descriptive error message, optionally including the original error
      throw new Error("Failed to parse input as JSON. " + error.message);
    }
  }

  // If neither an object/array nor a parseable string, throw an error
  throw new Error("The input must be a valid JSON string, object, or array.");
};

/**
 * ## Filters the input list to keep only the unique objects.
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

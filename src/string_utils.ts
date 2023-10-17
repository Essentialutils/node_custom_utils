/**
 * Parses the query parameters from a given URL string and returns them as a Map.
 *
 * @param {string} urlString - The URL string from which to extract query parameters.
 * @returns {Map<string, string>} A Map containing the query parameters as key-value pairs.
 * @throws {TypeError} Will throw an error if the input is not a valid URL string.
 *
 * @example
 * const urlString = 'https://example.com/path?name=John&age=30';
 * const queryParams = cGetQueryParams(urlString);
 * console.log(queryParams.get('name')); // Output: 'John'
 * console.log(queryParams.get('age'));  // Output: '30'
 */
export const cGetQueryParams = (urlString: string): Map<string, string> => {
  const url = new URL(urlString);
  return new Map(url.searchParams.entries());
};

/**
 * Validates a URL string.
 *
 * @param {string} url - The URL string to be validated.
 * @returns {boolean} - True if the input URL is valid, false otherwise.
 *
 * @example
 * const isValid = cIsValidUrl('https://www.example.com');
 * console.log(isValid); // Output: true
 */
export const cIsValidUrl = (url: string): boolean => {
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w]+(\/[\w- .\/?%&=]*)?$/;
  return urlPattern.test(url);
};

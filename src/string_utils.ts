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

export const cAddOrUpdateQueryParam = (
  url: string,
  key: string,
  value: string
): string => {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;

  // Check if the key already exists, if so, update its value
  if (searchParams.has(key)) {
    searchParams.set(key, value);
  } else {
    // If the key doesn't exist, add it to the URL
    searchParams.append(key, value);
  }

  // Reconstruct the URL with the updated or added query parameter
  urlObject.search = searchParams.toString();
  return urlObject.toString();
};

/**
 * Extends the String prototype to add a method for updating or adding query parameters.
 * @param key - The query parameter key.
 * @param value - The new value for the query parameter.
 * @returns The updated URL string with the modified query parameter.
 */
String.prototype.cUpdateQueryParam = function (
  key: string,
  value: string
): string {
  // Check if the input string is a valid URL
  if (cIsValidUrl(this.toString())) {
    // Parse the URL string into a URL object
    const urlObject = new URL(this.toString());
    const searchParams = urlObject.searchParams;

    // Check if the key already exists in the query parameters
    if (searchParams.has(key)) {
      // If the key exists, update its value
      searchParams.set(key, value);
    } else {
      // If the key doesn't exist, add it to the query parameters
      searchParams.append(key, value);
    }

    // Reconstruct the URL with the updated or added query parameter
    urlObject.search = searchParams.toString();

    // Return the updated URL string
    return urlObject.toString();
  } else {
    // If the input string is not a valid URL, return the original string
    return this.toString();
  }
};

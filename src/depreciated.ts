/**
 * @deprecated use `adjustDateByDays()` instead
 *
 * Adds one day to a given date and returns the updated date.
 *
 * @param {string} dateString - The input date string in a valid date format.
 * @returns {Date} Returns a new Date object representing the date after adding one day.
 *
 */
export const addOneDay = (dateString: string): Date => {
  // Create a Date object based on the provided date string.
  const date = new Date(dateString);

  // Add one day to the date using setDate() method.
  date.setDate(date.getDate() + 1);

  // Return the updated Date object.
  return date;
};

/**
 * @deprecated use `'http://example.com'.cUpdateQueryParam("age", "30")` instead
 *
 * ## Adds a new query parameter to the given URL or updates the value of the parameter if it already exists.
 *
 * This function takes a URL string, a query parameter key, and its value. It then constructs a new URL
 * object, checks if the given key exists in the URL's query parameters, and either updates its value or
 * appends the new parameter to the URL. The function finally returns the updated URL string.
 *
 * @param {string} url - The URL to which the query parameter will be added or updated.
 * @param {string} key - The key of the query parameter to add or update.
 * @param {string} value - The value of the query parameter.
 *
 * @returns {string} The updated URL string with the added or updated query parameter.
 *
 * @example
 * // Adds a new query parameter
 * console.log(cAddOrUpdateQueryParam('https://example.com', 'page', '1'));
 * // Output: 'https://example.com?page=1'
 *
 * @example
 * // Updates an existing query parameter
 * console.log(cAddOrUpdateQueryParam('https://example.com?page=2', 'page', '1'));
 * // Output: 'https://example.com?page=1'
 */
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

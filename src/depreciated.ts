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

/**
 * @deprecated - Use `cGetYearMonthDetailsBetweenDates()` instead.
 * ## Gets the months that fall between two given dates.
 *
 * This function can return the months either as their full names (e.g., "January")
 * or as their numeric representations (e.g., 1 for January). It validates that the
 * start date is before the end date and throws an error if this condition is not met.
 *
 * @param {string} startDateStr - The start date as a string in a format recognized by the Date constructor (e.g., "YYYY-MM-DD").
 * @param {string} endDateStr - The end date as a string in a format recognized by the Date constructor.
 * @param {boolean} [returnAsName=false] - Flag to determine the format of the returned month names.
 * If true, returns month names as full names ("January", "February", etc.).
 * If false, returns month names as numeric representations ("1" for January, "2" for February, etc.).
 * Defaults to false.
 * @returns {string[]} - An array of month names or numbers between the given start and end dates, inclusive.
 * @throws {Error} - Throws an error if the start date is after the end date, with the message "Start date must be before end date".
 *
 * ---
 *
 * ## Usage Example
 *
 * ```typescript
 * // Get full month names between January 1, 2022, and March 1, 2022
 * cGetMonthBetweenDates("2022-01-01", "2022-03-01", true);
 * // Returns ["January", "February", "March"]
 *
 * // Get month numbers between January 1, 2022, and March 1, 2022
 * cGetMonthBetweenDates("2022-01-01", "2022-03-01");
 * // Returns ["1", "2", "3"]
 *
 * ```
 */
export const cGetMonthBetweenDates = (
  startDateStr: string,
  endDateStr: string,
  returnAsName = false
): string[] => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) {
    throw new Error("Start date must be before end date");
  }

  const monthNames: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const monthIdentifier = returnAsName
      ? currentDate.toLocaleString("default", { month: "long" })
      : (currentDate.getMonth() + 1).toString();

    if (!monthNames.includes(monthIdentifier)) {
      monthNames.push(monthIdentifier);
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return monthNames;
};

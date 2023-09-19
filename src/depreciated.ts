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

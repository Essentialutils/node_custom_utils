import moment from "moment";
import { commonDateFormat, commonDateTimeFormat } from "./common_express_utils";

/**
 * ## Checks if two dates fall within the same calendar year.
 *
 * This function takes two date strings as input and compares the calendar years
 * they fall in. It returns true if both dates are within the same year, and false otherwise.
 * The function is tolerant of date string formats, as long as they are recognizable
 * by the JavaScript Date object.
 *
 * @param {string} startDateStr - The start date in string format.
 * Must be a format recognized by the JavaScript Date constructor.
 * @param {string} endDateStr - The end date in string format.
 * Must be a format recognized by the JavaScript Date constructor.
 * @returns {boolean} - Returns true if both dates are within the same calendar year, otherwise false.
 *
 * ---
 *
 * ```typescript
 * cHaveSameYear('2023-01-01', '2023-12-31');
 * // Returns true
 *
 * cHaveSameYear('2023-12-31', '2024-01-01');
 * // Returns false
 * ```
 */
export const cHaveSameYear = (
  startDateStr: string,
  endDateStr: string
): boolean => {
  const startYear = new Date(startDateStr).getFullYear();
  const endYear = new Date(endDateStr).getFullYear();
  return startYear === endYear;
};

/**
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

/**
 * Checks if a given value is a valid date based on a specific date format.
 *
 * @param {any} v - The value to be checked for validity as a date.
 * @returns {boolean} Returns true if the value is a valid date, false otherwise.
 */
export const isValidDate = (v: any): boolean => {
  try {
    // Use the moment library to parse the value using a specific date format (appDateFormat) with strict parsing.
    // Check if the parsed date is valid.
    return moment(v, commonDateFormat, true).isValid();
  } catch (error) {
    // If an error occurs during parsing, return false.
    return false;
  }
};

/**
 * Checks if a given value is a valid date and time based on a specific date-time format.
 *
 * @param {any} v - The value to be checked for validity as a date and time.
 * @returns {boolean} Returns true if the value is a valid date and time, false otherwise.
 */
export const isValidDateTime = (v: any): boolean => {
  try {
    // Use the moment library to parse the value using a specific date-time format (appDateTimeFormat) with strict parsing.
    // Check if the parsed date and time are valid.
    return moment(v, commonDateTimeFormat, true).isValid();
  } catch (error) {
    // If an error occurs during parsing, return false.
    return false;
  }
};

/**
 * Adjusts a given date by a specified number of days.
 *
 * @param date - The date to be adjusted.
 * @param dayCount - The number of days to add or subtract (default is 1).
 * @param subtract - If true, subtracts the specified days; otherwise, adds them (default is false).
 * @returns A new Date object representing the adjusted date.
 */
export const adjustDateByDays = (
  date: Date,
  dayCount = 1,
  subtract = false
): Date => {
  date.setDate(date.getDate() + (subtract ? -dayCount : dayCount));
  return date;
};

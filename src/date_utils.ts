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
 * ## Changes the month and optionally the day of a given date string.
 *
 * This function takes a date string, a new month, and an optional new day,
 * then returns a new date string with the updated month and day. The function
 * ensures that the new date is valid, particularly that the new day exists
 * within the specified new month. If the new day is outside the valid range,
 * the function logs an error and returns the original date string.
 *
 * @param {string} dateStr - The original date string in ISO format (YYYY-MM-DD).
 * @param {number} newMonth - The new month as a number (1-12).
 * @param {number} [newDay] - The optional new day as a number. If not provided,
 *                            the day of the month from the original date is retained.
 * @returns {string} The new date in ISO format (YYYY-MM-DD) if the operation is successful,
 *                   otherwise returns the original date string. If the resulting date is invalid,
 *                   returns '__invalid_date__'.
 *
 * ```typescript
 * // Change the month of March 15, 2023, to February
 * cChangeDateMonthAndDay("2023-03-15", 2);
 * // Returns "2023-02-15"
 *
 * // Change the month and day of March 15, 2023, to February 28
 * cChangeDateMonthAndDay("2023-03-15", 2, 28);
 * // Returns "2023-02-28"
 *
 * // Attempt to set an invalid date (February 30th)
 * cChangeDateMonthAndDay("2023-03-15", 2, 30);
 * // Logs "Invalid day for the given month" and returns "2023-03-15"
 * ```
 */
export const cChangeDateMonthAndDay = (
  dateStr: string,
  newMonth: number,
  newDay?: number
): string => {
  // Parse the input date string to a Date object
  const date = new Date(dateStr);

  // Set the new month, adjusting the month index by -1 since months are 0-based
  date.setMonth(newMonth - 1);

  // If newDay is provided, set the day. Otherwise, keep the original day
  // Note: Before setting the day, check if the newDay is within the valid range for the new month
  if (newDay !== undefined) {
    const daysInNewMonth = new Date(date.getFullYear(), newMonth, 0).getDate();
    if (newDay > 0 && newDay <= daysInNewMonth) {
      date.setDate(newDay);
    } else {
      console.error("Invalid day for the given month");
      return dateStr; // Return the original date string if the new day is invalid
    }
  }

  // Return the new date as a string
  return date.toISOString().split("T")[0] ?? "__invalid_date__";
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

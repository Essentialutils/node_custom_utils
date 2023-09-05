import moment from "moment";
import { Request, Response } from "express";
import { ID } from "./id_utils";

const id = new ID(1);

export const commonDateFormat = "YYYY-MM-DD";
export const commonDateTimeFormat = "YYYY-MM-DD HH:mm:ss";

/**
 * Represents a JSON response object with optional properties.
 */
interface JsonResponse {
  /**
   * The data contained in the JSON response.
   */
  data?: any;

  /**
   * Indicates whether the operation was successful.
   */
  success?: boolean;

  /**
   * A message associated with the response.
   */
  message?: string;

  /**
   * An instance identifier or reference.
   */
  instance?: string;
}

/**
 * Retrieves the API key from the request's "Authorization" header.
 *
 * @param {Request} req - The incoming request object containing headers.
 * @returns {string} Returns the API key extracted from the "Authorization" header, or an empty string if not found.
 */
export const getApiKey = (req: Request): string => {
  // Get the value of the "Authorization" header from the request.
  // If the header is not present, return an empty string.
  return req.get("Authorization") ?? "";
};

/**
 * Constructs a JSON response to be sent to the client.
 *
 * @param {Response} res - The response object to send the JSON response to.
 * @param {object} options - An object containing response data and optional metadata.
 * @param {*} options.data - The data to be included in the response.
 * @param {string} options.message - A message describing the response, defaults to a success message.
 * @param {boolean} options.success - Indicates the success status of the operation, defaults to true.
 * @param {string} options.instance - An instance identifier for tracking purposes, includes project name, IDs, and timestamp.
 */
export const toJson = (
  res: Response,
  {
    data,
    message = "The operation has been completed successfully.",
    success = true,
    instance = `${
      process.env.PRJ_NAME
    } ➜ ${id.getSnowflakeID()}:${id.getUniqueID()} ➜ ${moment().format(
      "LLLL"
    )}`,
  }: JsonResponse
) => {
  // Create a base JSON response object with provided or default values.
  const jsonResponse: JsonResponse = {
    success,
    message,
    instance,
  };

  // If data is provided, include it in the JSON response.
  if (data) {
    jsonResponse.data = data;
  }

  // Send the JSON response using the provided response object.
  return res.json(jsonResponse);
};

/**
 * Constructs an error response to be sent to the client.
 *
 * @param {Response} res - The response object to send the error response to.
 * @param {any} error - The error object or message to be included in the response.
 */
export const errorResponse = (res: Response, error: any) => {
  try {
    // Convert the error information into a JSON response with a 'success' status of false.
    // If the 'error' is an instance of Error, include its message; otherwise, include the error as a string.
    return toJson(res, {
      success: false,
      message: error instanceof Error ? error.message : error.toString(),
    });
  } catch (error) {
    // If an error occurs during the conversion process, send a generic error response.
    return toJson(res, {
      success: false,
      message: "Server crashed ",
    });
  }
};

/**
 * Checks whether a given value has data or not.
 * @param v - The value to be checked.
 * @returns `true` if the value has data, otherwise `false`.
 */
export const hasData = (v: unknown): boolean => {
  // Check if the value is undefined or null
  if (v === undefined || v === null) {
    return false;
  }

  // If the value is a string
  if (typeof v === "string") {
    // Trim the string to remove leading and trailing spaces
    const trimmedValue = v.trim();

    // Check if the trimmed value is not empty and not equal to "null" or "undefined"
    return (
      trimmedValue !== "" &&
      trimmedValue !== "null" &&
      trimmedValue !== "undefined"
    );
  }

  // For non-string values, consider them as having data
  return true;
};

/**
 * Checks if an array contains any duplicate elements.
 *
 * @param {any[]} arr - The input array to be checked for duplicates.
 * @returns {boolean} Returns true if duplicates are found, false otherwise.
 */
export const hasDuplicates = (arr: any[]): boolean => {
  // Compare the length of the array with the size of a Set created from the array.
  // If the sizes are different, there are duplicates.
  return arr.length !== new Set(arr).size;
};

/**
 * Checks if a given string contains the character ':'.
 *
 * @param {string} value - The input string to be checked for the presence of ':'.
 * @returns {boolean} Returns true if the input string contains ':', false otherwise.
 */
export const containAppChars = (value: string): boolean => {
  // Define a regular expression to match the ':' character.
  const regex = /:/;

  // Test if the input string matches the regular expression.
  return regex.test(value);
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
 * Adds one day to a given date and returns the updated date.
 *
 * @param {string} dateString - The input date string in a valid date format.
 * @returns {Date} Returns a new Date object representing the date after adding one day.
 */
export const addOneDay = (dateString: string): Date => {
  // Create a Date object based on the provided date string.
  const date = new Date(dateString);

  // Add one day to the date using setDate() method.
  date.setDate(date.getDate() + 1);

  // Return the updated Date object.
  return date;
};

export const getImg = (v?: any): string => {
  if (hasData(v)) return v;
  return "https://via.placeholder.com/500";
};

/**
 * Compare two JSON objects for deep equality.
 *
 * @param obj1 - The first JSON object.
 * @param obj2 - The second JSON object.
 * @returns True if the objects are deeply equal, false otherwise.
 */
export const compareJSONObjects = (obj1: any, obj2: any): boolean => {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of properties is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over the keys and compare the values
  return keys1.every((key) => {
    // Check if the current key exists in both objects
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    // Compare the values of the current key
    const value1 = obj1[key];
    const value2 = obj2[key];

    // Recursively compare nested objects
    if (typeof value1 === "object" && typeof value2 === "object") {
      return compareJSONObjects(value1, value2);
    } else {
      // Compare primitive values
      return value1 === value2;
    }
  });
};

export const convertNumberToStringOrEmpty = (result: number): string => {
  return result === 0 ? "" : result.toString();
};

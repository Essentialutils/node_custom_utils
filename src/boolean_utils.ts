/**
 * ## Converts a wide range of values to a boolean in a safe manner.
 *
 * This function is designed to handle `null`, `undefined`, boolean values,
 * numeric values interpreted as booleans (0 and 1), and string representations
 * thereof. It trims the input, converts it to lowercase, and evaluates it.
 * Returns `false` by default for any input not explicitly recognized as `true`.
 *
 * @param {any} value - The input value to convert to a boolean.
 * @returns {boolean} - The boolean representation of the input value.
 */
export const cToBooleanSafe = (value: any): boolean => {
  // Handle the case where value is exactly null or undefined
  if (value === null || value === undefined) {
    return false;
  }

  // Handle boolean values directly
  if (typeof value === "boolean") {
    return value;
  }

  // Convert value to string in a safe manner and trim any leading/trailing spaces
  const stringValue = String(value).trim().toLowerCase();

  // Handle string values that are 'true' or 'false' explicitly
  if (stringValue === "true") {
    return true;
  } else if (stringValue === "false") {
    return false;
  }

  // Explicitly handle '0' and '1' string cases
  if (stringValue === "0") {
    return false;
  } else if (stringValue === "1") {
    return true;
  }

  // For all other cases, return a default false to ensure the function is safe
  // against unexpected input types, or you could throw an error if preferred
  return false;
};

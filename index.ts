// Extend the String interface to include custom methods
declare global {
  interface String {
    /**
     * Validates if the string is a valid hexadecimal color code.
     * @returns {boolean} `true` if the string is a valid color code, `false` otherwise.
     */
    cIsValidColorCode(): boolean;

    /**
     * Updates or adds a query parameter to the URL string.
     * @param {string} key - The key of the query parameter.
     * @param {string} value - The value of the query parameter.
     * @returns {string} The updated URL string with the new query parameter.
     */
    cUpdateQueryParam(key: string, value: string): string;
  }
}

export * from "./src/common_express_utils";
export * from "./src/id_utils";
export * from "./src/depreciated";
export * from "./src/string_utils";
export * from "./src/color_code";

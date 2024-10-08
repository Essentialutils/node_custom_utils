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

    /**
     * Decodes a Base64 encoded string.
     *
     * This method extends the String prototype to provide a convenient way to decode
     * a Base64 string back to a regular string. It assumes the Base64 string is properly
     * formatted. If not, the method will return an incorrect value or throw an error.
     *
     * @returns {string} The decoded string.
     */
    cDecodeFromBase64(): string;

    /**
     * Encodes a string into Base64 format.
     *
     * This method extends the String prototype to provide a convenient way to encode
     * a regular string into Base64. It uses Node.js's Buffer class to handle the conversion.
     *
     * @returns {string} The Base64 encoded string.
     */
    cEncodeToBase64(): string;
  }

  /**
   * Interface for Array with removeText method
   */
  interface Array<T> {
    /**
     * Removes the specified text from the array.
     *
     * @param {string} textToRemove - The text to be removed from the array.
     * @returns {string[]} A new array with the text removed.
     */
    removeText(textToRemove: string): string[];
  }
}

export * from "./src/depreciated";

export * from "./src/common_express_utils";
export * from "./src/id_utils";
export * from "./src/string_utils";
export * from "./src/color_code";
export * from "./src/s3_cdn/file_upload_utils";
export * from "./src/s3_cdn/file_upload_to_local_server";
export * from "./src/s3_cdn/file_upload_to_spaces_bucket";
export * from "./src/json_utils";
export * from "./src/base64";
export * from "./src/sha256";
export * from "./src/boolean_utils";
export * from "./src/file/csv";
export * from "./src/file/xlsx";
export * from "./src/date_utils";
export * from "./src/number_utils";
export * from "./src/ip";

export {};

/**
 * ## Encodes a string into Base64 format.
 *
 * This method extends the String prototype to provide a convenient way to encode
 * a regular string into Base64. It uses Node.js's Buffer class to handle the conversion.
 *
 * @returns {string} The Base64 encoded string.
 */
String.prototype.cEncodeToBase64 = function (): string {
  // Convert the current string to a Buffer, then convert that Buffer to a Base64 string
  return Buffer.from(this.toString()).toString("base64");
};

/**
 * ## Decodes a Base64 encoded string.
 *
 * This method extends the String prototype to provide a convenient way to decode
 * a Base64 string back to a regular string. It assumes the Base64 string is properly
 * formatted. If not, the method will return an incorrect value or throw an error.
 *
 * @returns {string} The decoded string.
 */
String.prototype.cDecodeFromBase64 = function (): string {
  // Convert the current Base64 string to a Buffer, interpreting it as Base64,
  // then convert that Buffer back to a regular string
  return Buffer.from(this.toString(), "base64").toString();
};

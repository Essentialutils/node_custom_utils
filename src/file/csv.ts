import * as fsx from "fs-extra";
import * as fs from "fs";
import { ID } from "../id_utils";
import { exportPath } from "../utils/utils";

/**
 * ## Asynchronously converts a CSV file to a JSON array.
 *
 * Reads a CSV file from a specified path, parsing its content into an array of objects.
 * Each object in the array represents a row from the CSV, with key-value pairs
 * corresponding to column headers and their respective data.
 *
 * @param {string} csv_path - The filesystem path to the CSV file.
 * @returns {Promise<any[]>} - A promise that resolves to an array of objects, each
 *                             representing a row in the CSV file.
 *
 * Note: This function depends on external functions `parseCsvLine` and `unescapeCSV`
 * for parsing CSV lines and unescaping values, respectively.
 *
 * ### Example
 * ```typescript
 * csvToJson('/path/to/file.csv').then(data => console.log(data));
 * ```
 */
export const csvToJson = async (csv_path: string): Promise<any[]> => {
  const data = await fs.promises.readFile(csv_path, "utf8");

  const lines = data.split("\n");
  const headers = parseCsvLine(lines[0] ?? "");

  return lines.slice(1).map((line) => {
    const data = parseCsvLine(line).map((v) => unescapeCSV(v));
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {} as any);
  });
};

/**
 * ## Asynchronously converts an array of JSON objects to a CSV file.
 *
 * Given an array of JSON objects, this function generates a CSV file
 * representing the data. The CSV file is saved with a generated name
 * based on a provided name parameter and an ID from an ID generator.
 * The function ensures the directory for saving the CSV exists,
 * then writes the CSV file and returns its path.
 *
 * @param {any[]} json - An array of JSON objects to be converted into a CSV file.
 * @param {string} name - A base name for the generated CSV file, which is enhanced
 *                        with an ID for uniqueness.
 * @returns {Promise<string>} - A promise that resolves to the path of the saved CSV file.
 *
 *
 * Note: This function uses `escapeCSV` for escaping values that need to be CSV-encoded.
 * It also relies on `fsx.ensureDir` and `fsx.writeFile` for file system operations,
 * which are part of the `fs-extra` library.
 *
 * ### Example
 * ```typescript
 * jsonToCsv([{ name: 'John', age: 30 }], 'users').then(path => console.log(path));
 * ```
 */
export const jsonToCsv = async (json: any[], name: string): Promise<string> => {
  const idGenerator = new ID(1);
  if (json.length === 0) {
    return "";
  }

  const headers = Object.keys(json[0])
    .map((value) => escapeCSV(value))
    .join(",");

  const rows = json.map((obj) =>
    Object.values(obj)
      .map((value) => escapeCSV(value))
      .join(",")
  );

  const csvData = [headers, ...rows].join("\n");

  const fileName = `${name.toUpperCase()}_${idGenerator.getSnowflakeID()}.csv`;

  await fsx.ensureDir(exportPath);

  await fsx.writeFile(`${exportPath}${fileName}`, csvData, "utf8");

  return `${exportPath}${fileName}`;
};

const escapeCSV = (value: any) => {
  // Check if the value is null or undefined, return an empty string in that case
  if (value === null || value === undefined) {
    return "";
  }

  // Convert the value to a string only if it's not already a string
  const str = typeof value === "string" ? value : value.toString();

  // Check if escaping is necessary (presence of double quotes, commas, or newlines)
  // and only then perform the escaping and wrapping in quotes.
  if (str.includes('"') || str.includes(",") || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  // If no escaping or wrapping is necessary, return the string as is
  return str;
};

const unescapeCSV = (value: any) => {
  // Check if the value is enclosed in double quotes
  if (value.startsWith('"') && value.endsWith('"')) {
    // Remove the enclosing double quotes
    value = value.substring(1, value.length - 1);

    // Unescape double quotes by replacing two double quotes with a single one
    value = value.replace(/""/g, '"');
  }

  return value;
};

const parseCsvLine = (csvLine: string): string[] => {
  // Regular expression to match commas that are not inside quotes
  const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  // Splitting the string by the regex
  const result = csvLine.split(regex);

  // Further processing to handle double quotes and leading/trailing spaces
  return result.map((field) =>
    field.replace(/^"|"$/g, "").replace(/""/g, '"').trim()
  );
};

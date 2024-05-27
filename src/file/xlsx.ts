import * as XLSX from "xlsx";
import { ID } from "../id_utils";
import { exportPath } from "../utils/utils";
import * as fsx from "fs-extra";

/**
 * @interface Data
 * @description Represents a generic data structure where keys are strings and values can be of any type.
 */
interface Data {
  [key: string]: any;
}

/**
 * @function jsonToExcel
 * @description Converts JSON data to an Excel file and saves it.
 * @param {Data[]} jsonData - An array of objects representing the JSON data to be converted.
 * @param {string} fileName - The base name for the generated Excel file.
 * @returns {Promise<string>} - A promise that resolves to the file path of the generated Excel file.
 *
 * @example
 * // Example usage:
 * const data = [
 *   { name: 'John Doe', age: 30, email: 'john@example.com' },
 *   { name: 'Jane Doe', age: 25, email: 'jane@example.com' }
 * ];
 *
 * jsonToExcel(data, 'users').then(filePath => {
 *   console.log('Excel file created at:', filePath);
 * }).catch(error => {
 *   console.error('Error creating Excel file:', error);
 * });
 */
export const jsonToExcel = async (
  jsonData: Data[],
  fileName: string
): Promise<string> => {
  const idGenerator = new ID(1);
  const _fileName = `${fileName.toUpperCase()}_${idGenerator.getSnowflakeID()}.xlsx`;

  await fsx.ensureDir(exportPath);

  // Create a new workbook and a worksheet
  const ws = XLSX.utils.json_to_sheet(jsonData);
  const wb = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, fileName);

  // Generate Excel file and trigger a download
  await XLSX.writeFile(wb, `${exportPath}${_fileName}`);

  return `${exportPath}${_fileName}`;
};

/**
 * ## Converts an Excel file to JSON.
 *
 * @description This function reads the specified Excel file, converts the first sheet
 * into JSON format, and returns the resulting data as an array of objects.
 *
 * @param {string} filePath - The path to the Excel file to be converted.
 * @returns {Data[]} The JSON representation of the Excel data.
 * @throws Will throw an error if the Excel file has no sheets or the first sheet is not found.
 *
 * @example
 * const jsonData = excelToJson('/path/to/excel-file.xlsx');
 * console.log(jsonData);
 */
export const excelToJson = (filePath: string): Data[] => {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Get the first sheet name
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("No sheets found in the Excel file.");
  }

  // Get the worksheet
  const worksheet = workbook.Sheets[firstSheetName];

  if (!worksheet) {
    throw new Error(`Worksheet not found: ${firstSheetName}`);
  }

  // Convert sheet to JSON
  const jsonData: Data[] = XLSX.utils.sheet_to_json(worksheet);

  return jsonData;
};

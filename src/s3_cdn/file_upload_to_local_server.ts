import { UploadedFile } from "express-fileupload";
import fsx from "fs-extra";
import path from "path";
import {
  ALLOWED_EXTENSIONS,
  IFileUploadToLocalServer,
} from "./file_upload_utils";

/**
 * Uploads a file to the local server.
 * @param {Object} options - The options for file upload.
 * @param {Object} options.req - The request object containing the uploaded files.
 * @param {string} options.pathToUpload - The path on the server where the file will be uploaded.
 * @param {string} options.imageKeyWord - The key in the request object containing the uploaded file.
 * @param {Array} options.fileTypes - An array of allowed file extensions.
 * @throws Will throw an error if files are not provided, file format is not supported,
 *         uploaded file already exists, or if there are any file operation errors.
 * @returns {string} - The URL of the uploaded file on the server.
 *
 * @example
 * // Call the FileUploadToLocalServer function
 * const uploadedFileUrl = await FileUploadToLocalServer({
 *   req,
 *   pathToUpload,
 *   imageKeyWord,
 * });
 *
 **/
export const FileUploadToLocalServer = async ({
  req,
  pathToUpload,
  imageKeyWord,
  fileTypes = ALLOWED_EXTENSIONS,
}: IFileUploadToLocalServer) => {
  const { files } = req;

  // Check if files are provided in the request.
  if (!files || Object.keys(files).length === 0) {
    throw new Error("Please provide an image file");
  }

  // Get the uploaded file and its extension.
  const uploadedFile = files[imageKeyWord ?? "img"] as UploadedFile;

  if (!uploadedFile?.name) {
    throw new Error(`Not provided file for ${imageKeyWord ?? "img"}`);
  }

  const ext = path.extname(uploadedFile.name).toLowerCase();

  // Check if the file format is supported.
  if (!fileTypes.includes(ext)) {
    throw new Error("The file format is not supported");
  }

  // Define paths for the upload directory and the uploaded file.
  const upDir = `./public${
    process.env.DEBUG === "false" ? "/live/" : "/test/"
  }${pathToUpload}`;
  const upFileDir = `/${uploadedFile.md5}${ext}`;
  const up = `${upDir}${upFileDir}`;

  // Check if the uploaded file already exists.
  if (fsx.existsSync(up)) {
    throw new Error("Uploaded file already exists. Please try another one");
  }

  // Ensure the upload directory exists and move the uploaded file.
  await fsx.ensureDir(upDir);
  await uploadedFile.mv(up);

  // Return the URL of the uploaded file.
  return up.replace("./public", "");
};

/**
 * Deletes a file located at the specified path.
 *
 * @param {string} filePath - The relative path of the file to be deleted.
 */
export const DeleteLocalServerFile = (filePath?: string) => {
  if (filePath && fsx.existsSync(`./public${filePath}`)) {
    // Delete the file using fs-extra's unlinkSync method.
    fsx.unlinkSync(`./public${filePath}`);
  }
};

import { UploadedFile } from "express-fileupload";
import fsx from "fs-extra";
import path from "path";
import {
  ALLOWED_EXTENSIONS,
  IFileUploadToLocalServer,
} from "./file_upload_utils";

/**
 * ## Uploads a file to the local server.
 * @param {Object} options - The options for file upload.
 * @param {Object} options.req - The request object containing the uploaded files.
 * @param {string} options.pathToUpload - The path on the server where the file will be uploaded.
 * @param {string} options.imageKeyWord - The key in the request object containing the uploaded file.
 * @param {Array} options.fileTypes - An array of allowed file extensions.
 * @throws Will throw an error if files are not provided, file format is not supported,
 *         uploaded file already exists, or if there are any file operation errors.
 * @returns {string} - The URL of the uploaded file on the server.
 *
 *```typescript
 * // Call the FileUploadToLocalServer function
 * const uploadedFileUrl = await FileUploadToLocalServer({
 *   req,
 *   pathToUpload,
 *   imageKeyWord,
 * });
 *```
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
    throw new Error(
      "It appears that no file has been uploaded on your part. Kindly proceed to upload the necessary document."
    );
  }

  // Get the uploaded file and its extension.
  const uploadedFile = files[imageKeyWord ?? "img"] as UploadedFile;

  if (!uploadedFile?.name) {
    throw new Error(
      `No file specified for ${imageKeyWord ?? "img"} has been provided.`
    );
  }

  const ext = path.extname(uploadedFile.name).toLowerCase();

  // Check if the file format is supported.
  if (!fileTypes.includes(ext)) {
    throw new Error("The file format you have submitted is not compatible.");
  }

  // Define paths for the upload directory and the uploaded file.
  const upDir = `./public${
    process.env.DEBUG === "false" ? "/live/" : "/test/"
  }${pathToUpload}`;
  const upFileDir = `/${uploadedFile.md5}${ext}`;
  const up = `${upDir}${upFileDir}`;

  // Check if the uploaded file already exists.
  if (fsx.existsSync(up)) {
    throw new Error(
      "The file uploaded is already present in our system. Kindly upload a different file."
    );
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

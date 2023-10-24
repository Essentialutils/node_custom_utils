import { UploadedFile } from "express-fileupload";
import fsx from "fs-extra";
import path from "path";
import * as AWS from "aws-sdk";
import * as fs from "fs";
import {
  ALLOWED_EXTENSIONS,
  IFileUploadToLocalServer,
  envValidator,
} from "./file_upload_utils";

/**
 * Uploads a file to the specified DigitalOcean Spaces bucket.
 * @async
 * @function
 * @param {Object} options - The options for file upload.
 * @param {Object} options.req - The request object containing files to upload.
 * @param {string} options.pathToUpload - The path within the bucket where the file will be uploaded.
 * @param {string} options.imageKeyWord - The keyword to identify the image file in the request.
 * @param {Array} [options.fileTypes=ALLOWED_EXTENSIONS] - Allowed file extensions for upload.
 * @throws {Error} Throws an error if the file format is not supported or if files are not provided in the request.
 * @returns {Promise<string>} A Promise that resolves with the key of the uploaded file.
 *
 * @example
 * // Allowed file extensions for upload
 * const allowedExtensions = ['.jpg', '.png', '.jpeg'];
 *
 * // Upload the file to the specified bucket
 * const uploadedFileKey = await FileUploadToSpacesBucket({
 *   req,
 *   pathToUpload,
 *   imageKeyWord,
 *   fileTypes: allowedExtensions,
 * });
 **/
export const FileUploadToSpacesBucket = async ({
  req,
  pathToUpload,
  imageKeyWord,
  fileTypes = ALLOWED_EXTENSIONS,
}: IFileUploadToLocalServer) => {
  envValidator();
  // Configure the AWS SDK with your DigitalOcean Spaces credentials
  const spacesEndpoint = new AWS.Endpoint(process.env.CDN_ENDPOINT ?? "");

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.CDN_ACCESS_KEY_ID,
    secretAccessKey: process.env.CDN_SECRET_ACCESS_KEY,
  });

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

  // Ensure the upload directory exists and move the uploaded file.
  await fsx.ensureDir(upDir);
  await uploadedFile.mv(up);

  // Read the file
  const fileContent = fs.readFileSync(up);

  const data = await s3
    .upload({
      Bucket: process.env.CDN_BUCKET ?? "",
      Key: up.replace("./public/", ""), // The name you want to give to the uploaded file
      Body: fileContent,
      ACL: "public-read",
      ContentType: `image/${ext.replace(".", "")}`,
    })
    .promise();

  fsx.unlinkSync(up);

  if (process.env.DEBUG === "true") {
    console.log("from s3 ", data);
  }

  return data.Key;
};

/**
 * Deletes a file from a DigitalOcean Spaces bucket.
 *
 * @param {string} Key - The unique key of the file to be deleted.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful, false otherwise.
 * @throws {Error} If an error occurs during the deletion process.
 *
 * @example
 * // Attempt to delete the file
 * const isDeleted = await DeleteFileSpacesBucket(fileKey);
 */
export const DeleteFileSpacesBucket = async (Key: string) => {
  try {
    envValidator();
    // Configure the AWS SDK with your DigitalOcean Spaces credentials
    const spacesEndpoint = new AWS.Endpoint(process.env.CDN_ENDPOINT ?? "");

    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.CDN_ACCESS_KEY_ID,
      secretAccessKey: process.env.CDN_SECRET_ACCESS_KEY,
    });

    await s3
      .deleteObject({
        Bucket: process.env.CDN_BUCKET ?? "",
        Key,
      })
      .promise();
    return true;
  } catch (error) {
    return false;
  }
};

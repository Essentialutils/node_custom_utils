import { Request } from "express";
import { hasData } from "../common_express_utils";

export interface IFileUploadToLocalServer {
  req: Request;
  pathToUpload: string;
  imageKeyWord?: string;
  fileTypes?: string[];
}

export const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];

export const envValidator = () => {
  const {
    CDN_BASE_URL,
    CDN_ENDPOINT,
    CDN_ACCESS_KEY_ID,
    CDN_SECRET_ACCESS_KEY,
    CDN_BUCKET,
  } = process.env;

  if (!hasData(CDN_BASE_URL)) {
    throw new Error("CDN_BASE_URL env is required");
  }

  if (!hasData(CDN_ENDPOINT)) {
    throw new Error("CDN_ENDPOINT env is required");
  }

  if (!hasData(CDN_ACCESS_KEY_ID)) {
    throw new Error("CDN_ACCESS_KEY_ID env is required");
  }

  if (!hasData(CDN_SECRET_ACCESS_KEY)) {
    throw new Error("CDN_SECRET_ACCESS_KEY env is required");
  }

  if (!hasData(CDN_BUCKET)) {
    throw new Error("CDN_BUCKET env is required");
  }
};

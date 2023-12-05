import crypto from "crypto";

export const cSha256 = (message: string): string => {
  return crypto.createHash("sha256").update(message).digest("hex");
};

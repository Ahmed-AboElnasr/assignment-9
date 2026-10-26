import crypto from "node:crypto";
import envConfig from "../../config/env.config.js";

const encryptionKey = Buffer.from(envConfig.encryption.key, "hex");
const ivLength = envConfig.encryption.iv;

export const encrypt = (plainText) => {
  const iv = crypto.randomBytes(ivLength);

  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);

  let encrypted = cipher.update(plainText, "utf-8", "hex");

  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrtypt = (cipherText) => {
  const [ivHex, encryptedText] = cipherText.split(":");

  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);

  let decrypted = decipher.update(encryptedText, "hex", "utf-8");

  decrypted += decipher.final("utf-8");

  return decrypted;
};

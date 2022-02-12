import CryptoJS from "crypto-js";
import { CRYPTO_KEY } from "./config";

export const encryptData = (data: any) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_KEY).toString();

export const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CRYPTO_KEY);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};

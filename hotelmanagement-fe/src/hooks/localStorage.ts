import CryptoJS from "crypto-js";

const secretKey =
  import.meta.env.SECRET_KEY ||
  "3ba19e3bfa83ab25d80c37ffb8ba31db5361445125452b2bf00c6c58af99b51c";

export const saveToLocalStorage = (key: string, value: any) => {
  const encryptedValue = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    secretKey
  ).toString();
  localStorage.setItem(key, encryptedValue);
};

export const getFromLocalStorage = (key: string) => {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Failed to decrypt data:", error);
    return null;
  }
};

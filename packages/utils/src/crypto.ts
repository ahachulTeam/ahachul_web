import CryptoJS from 'crypto-js';

/**
 * AES 알고리즘을 사용하여 문자열을 양방향 암호화하는 함수
 * @param plainText - 암호화할 평문
 * @param SECRET_KEY - 암호화에 사용할 비밀키
 * @returns AES로 암호화된 문자열
 * @throws {Error} 암호화 과정에서 오류가 발생한 경우
 */
export const encryptAES = (plainText: string, SECRET_KEY: string): string => {
  try {
    return CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
  } catch (error) {
    console.error('AES Encryption error:', error);
    throw error;
  }
};

/**
 * AES로 암호화된 문자열을 복호화하는 함수
 * @param encryptedText - AES로 암호화된 문자열
 * @param SECRET_KEY - 복호화에 사용할 비밀키 (암호화에 사용된 키와 동일해야 함)
 * @returns 복호화된 평문
 * @throws {Error} 복호화 과정에서 오류가 발생한 경우
 */
export const decryptAES = (encryptedText: string, SECRET_KEY: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('AES Decryption error:', error);
    throw error;
  }
};

/**
 * SHA-512 알고리즘을 사용하여 문자열을 단방향 해시화하는 함수
 * @param plainText - 해시화할 평문
 * @returns SHA-512로 해시화된 문자열 (128자의 16진수)
 * @throws {Error} 해시화 과정에서 오류가 발생한 경우
 */
export const hashSHA512 = (plainText: string): string => {
  try {
    return CryptoJS.SHA512(plainText).toString();
  } catch (error) {
    console.error('SHA-512 Hashing error:', error);
    throw error;
  }
};

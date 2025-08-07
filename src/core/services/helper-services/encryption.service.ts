import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class EncryptionService {

  static encrypt(text: string, key : string): string {
  const parsedKey = CryptoJS.enc.Base64.parse(key);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(text, parsedKey, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const combined = iv.concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(combined);
}

static decrypt(encryptedBase64: string, key : string): string {
  const parsedKey = CryptoJS.enc.Base64.parse(key);
  const fullCipher = CryptoJS.enc.Base64.parse(encryptedBase64);
  const hex = fullCipher.toString(CryptoJS.enc.Hex);

  const iv = CryptoJS.enc.Hex.parse(hex.slice(0, 32));
  const ciphertext = CryptoJS.enc.Hex.parse(hex.slice(32));

   const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });

   const decrypted = CryptoJS.AES.decrypt(cipherParams, parsedKey, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

}

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EncryptService {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    this.publicKey = fs.readFileSync(
      path.join(__dirname, '../../keys/public.pem'),
      'utf8',
    );
    this.privateKey = fs.readFileSync(
      path.join(__dirname, '../../keys/private.pem'),
      'utf8',
    );
  }

  encrypt(payload: string) {
    // 1. Generate 256-bit AES key
    const aesKey = crypto.randomBytes(32);
    const iv = Buffer.alloc(16, 0); // 16-byte fixed IV (only for testing/demo) or crypto.randomBytes(16) production
    // 2. Encrypt payload using AES
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    const encryptedPayload = Buffer.concat([
      iv,
      cipher.update(payload, 'utf8'),
      cipher.final(),
    ]).toString('base64');

    // 3. Encrypt AES key using public RSA key
    const encryptedAesKey = crypto
      .publicEncrypt(this.publicKey, aesKey)
      .toString('base64');
    return {
      successful: true,
      error_code: '',
      data: { data1: encryptedAesKey, data2: encryptedPayload },
    };
  }

  decrypt(data1: string, data2: string) {
    // 1. Decrypt AES key using private key which server holds key
    const aesKey = crypto.privateDecrypt(
      this.privateKey,
      Buffer.from(data1, 'base64'),
    );
    const iv = Buffer.from(data2, 'base64').subarray(0, 16);

    // 2. Decrypt payload
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(data2, 'base64').subarray(16)),
      decipher.final(),
    ]).toString('utf8');
    return {
      successful: true,
      error_code: '',
      data: { payload: decrypted },
    };
  }
}

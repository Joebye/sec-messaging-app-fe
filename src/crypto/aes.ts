export async function generateAESKey(): Promise<{ key: CryptoKey, iv: Uint8Array }> {
    const key = await crypto.subtle.generateKey({ name: 'AES-CBC', length: 256 }, true, ['encrypt', 'decrypt']);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    return { key, iv };
  }
  
  export async function encryptMessage(text: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
    const encoded = new TextEncoder().encode(text);
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, encoded);
    return Buffer.from(encrypted).toString('base64');
  }
  
  export async function decryptMessage(base64: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
    const encrypted = Buffer.from(base64, 'base64');
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encrypted);
    return new TextDecoder().decode(decrypted);
  }
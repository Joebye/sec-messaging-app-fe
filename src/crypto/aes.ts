export function base64Encode(arrayBuffer: ArrayBuffer): string {
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  
  export function base64Decode(base64: string): ArrayBuffer {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  export async function generateAESKey(): Promise<{ key: CryptoKey, iv: Uint8Array }> {
    const key = await crypto.subtle.generateKey(
      { name: 'AES-CBC', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(16));
    return { key, iv };
  }
  
  export async function encryptMessage(text: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
    const encoded = new TextEncoder().encode(text);
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, encoded);
    return base64Encode(encrypted);
  }
  
  export async function decryptMessage(base64: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
    const encrypted = base64Decode(base64);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encrypted);
    return new TextDecoder().decode(decrypted);
  }
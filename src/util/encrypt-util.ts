const ab2str = (buf: ArrayBuffer) => {
  return String.fromCharCode.apply(null, [...new Uint8Array(buf)]);
};

const str2ab = (str: string) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);

  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
};

const keyToString = async (key: CryptoKey, type: "public" | "private") => {
  const exported = await window.crypto.subtle.exportKey(
    type === "public" ? "spki" : "pkcs8",
    key
  );

  return btoa(ab2str(exported));
};

const stringToKey = async (keyStr: string, type: "public" | "private") => {
  const binaryDer = str2ab(atob(keyStr));

  return await window.crypto.subtle.importKey(
    type === "public" ? "spki" : "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    [type === "public" ? "encrypt" : "decrypt"]
  );
};

const encryptMessage = async (message: string, publicKey: CryptoKey) => {
  const encoder = new TextEncoder();

  const binary = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoder.encode(message)
  );

  return btoa(ab2str(binary));
};

const decryptMessage = async (message: string, privateKey: CryptoKey) => {
  const binary = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    str2ab(atob(message))
  );

  return new TextDecoder().decode(binary);
};

export { keyToString, stringToKey, encryptMessage, decryptMessage };

import Base64 from './Base64';

const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return Base64.btoa(binary);
};

export {
  arrayBufferToBase64,
};
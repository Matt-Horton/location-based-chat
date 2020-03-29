
const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  console.log(window.btoa(binary))
  return window.btoa(binary);
};

export {
  arrayBufferToBase64,
};
import CryptoJS from "crypto-js";

// export function md5(str) {
//   const strHash = CryptoJS.createHash('md5')
//   strHash.update(str)
//   const md5Str = strHash.digest('hex')
//   return md5Str
// }

export function md5(str) {
  return CryptoJS.MD5(str).toString()
}

export default {
  // 加密
  encrypt(word, keyStr) {
    if (!keyStr) {
      console.error('keyStr 不存在')
      return
    }
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  // 解密
  decrypt(word, keyStr) {
    if (!keyStr) {
      console.error('keyStr 不存在')
      return
    }
    try {
      var key = CryptoJS.enc.Utf8.parse(keyStr);
      var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    } catch (err) {
      console.log(err)
      return 'decrypt error'
    }
  }
};
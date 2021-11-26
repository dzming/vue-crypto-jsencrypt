const CryptoJS = require('crypto-js');  //引用AES源码js
import JSEncrypt from "jsencrypt";

// 下面是aes加密解密,CBC模式
const key = CryptoJS.enc.Utf8.parse("jkl;POIU1234++=="); //十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为秘钥偏移量
//加密方法
function aesEncryptCBC(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv:iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
//解密方法
function aesDecryptCBC(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {iv:iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

// 下面是aes加密解密,ECB模式
const keyECB = CryptoJS.enc.Utf8.parse("nFpT1dAQmTefj0Fk"); //十六位十六进制数作为秘钥
//加密方法
function aesEncryptECB(word) {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, keyECB, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
//解密方法
function aesDecryptECB(word) {
    var decrypt = CryptoJS.AES.decrypt(word, keyECB, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

// 下面是RSA加密解密
// RSA前端加密（公钥加密）
function RSAencrypt(oldPwd) {
    // 公钥
    // let rsaKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt1WdNTmCWYPwfbdGDnyXoBpH3ermje4TibqNAo6yXbFSyMrUXdMNFNazTHaHrb20+UClsGEJaOsMKxXDYSI/GKNT0llrWW+ggqliSL84NdVQ8mnhAWHMjXgQTjcbrF7ejzGzrZQ9t3KSpDZ5rqR6EHA/T4+/ZImqkvrPw8PDnbRv2iHXwBB5BpRIAlkCECE2Fq6NQaBv81GY0s9xw4PJSiUrDaPV7JpL4EXUbwfEF+pxivUFIfj+QtXcMW/XBIQM7ryWgOACAoG7/IryvgAi04sTE5fP/jldMiwXAii2IWjEtddBrfmJY8qpuxxOk+NcsZzAprnf9SsaoizlGfWWKwIDAQAB'
    let rsaKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCySweJKUNEhAGh7uO8MoY70TA/
    6nr6Ns4/e3pgI/vjXL7IkE+AXBIic6vpBuWGrrUtBzuYybUhppS+M4xv+96Cm0bI
    iUNV9xrPOuk0jnwoh9RgUd7VKqWSsh6qW3O90Zzh2k49WD8ZFn7eDJ270uHomD91
    2jqt5KCw8pbP1ykxZwIDAQAB`
    let encryptor = new JSEncrypt();  // 新建JSEncrypt对象
    encryptor.setPublicKey(rsaKey);  // 设置公钥
    let encrypted = encryptor.encrypt(oldPwd); // 加密
    return encrypted;
}
// RSA前端解密（私钥解密）
function RSAdecrypt(oldPwd) {
    // 私钥
    // let rsaKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3VZ01OYJZg/B9t0YOfJegGkfd6uaN7hOJuo0CjrJdsVLIytRd0w0U1rNMdoetvbT5QKWwYQlo6wwrFcNhIj8Yo1PSWWtZb6CCqWJIvzg11VDyaeEBYcyNeBBONxusXt6PMbOtlD23cpKkNnmupHoQcD9Pj79kiaqS+s/Dw8OdtG/aIdfAEHkGlEgCWQIQITYWro1BoG/zUZjSz3HDg8lKJSsNo9XsmkvgRdRvB8QX6nGK9QUh+P5C1dwxb9cEhAzuvJaA4AICgbv8ivK+ACLTixMTl8/+OV0yLBcCKLYhaMS110Gt+Yljyqm7HE6T41yxnMCmud/1KxqiLOUZ9ZYrAgMBAAECggEASZG+m0wvpbJPgHNaVpfi1KmXK1OHH29pQbytt1gB9Z0h5leWbuwxdKpPmyB5g9v70oYBt0zJVOP1pxh9pe3zOfTYvzGI5YPo+mX0fdLWQKwQZqbcVwyi5CZJDMoKfdo4H2hHfSFevs3oUKNXoyB3pz8T+N5rZHHmFEM3uoxFZHQE6R72UM5hhW4DobiblxDud0g/LY9B9afgE/HQZUWbDTu2BLdDqUKH5VCavVaMZDZh95FoPQCbP7mPZ2NyoZYG0mbWLaqDYpLyWM4wmGrQfLsVnQe4Rs61GMAeC9p/4duGgWG+vZupksJ2HLr/wORVpr1m6uOPFrom9aTS2EHf6QKBgQDhST+CknqpQncvt/o65iUzoVINWdUgVTdaR5/fRX5/a2EJDqHJl4JF/N7WKzzncjCh8BV9zCDBr3ehOVwuMExauO5ECzfV3oOMuZyc6fEWWuCIQeEnO3PpuDSe5A9LE70155SY412gNHqgbu4QP+9hxv5hdyIl3GP1HQjnCrbNxQKBgQDQVDPIyyVl0h2wJZKUlpV71Q0pTVPWhlzFP1j/atCnDDAzFdJ+LboRH4GWKHI8C4JJB62zfFhRIY68EwrAo3ZU8UpIGPYGsTauyDJkmVaJpeLBBKY+jjJtLwVaJ+zvduIdUz8p35UTYOX7vGe/m+rOI21OFH9ru83bQoCW1lKDLwKBgDMtmKfo7sSUvM6yVL4cmkboVuOBjNETisePjdoCx4Hauuh70nUhXg7YKycsG2HYpwOirr8tKCPX4K1XgoFbp3zUlgwPIFgNfITzhYh//Ky/aFKL5MIs12A44HtYA8FicpFUUoWI4TQLt+/KQ3qdi5wCwLcTgUZokqyUM/mIjY6hAoGAA/RVN06D2zbt0VYlPiTNmZgls87/9GaAhE37hn2kkEcu8wlLAZIkogaTEyKZaIJfart2lJ2bn46fgvppjdaMfHhIDK5MnTvn6dFrA3XVqq83aqqH7VANrPzjgR6Y5MLA8AWQgV75GXERbIHbBkwTXO5XONAyyvy5n5vXjQVsc4kCgYEAlyarktNqxWspIUxwkmr0CLJFvoTiFmZ7TIXX41XB5sez1neFspcEasYb9I+2q8rVOP2MbIYdk/Qd3UCYeKCG4rFAXFsNi6TeL7e62d08JA2AadkAP0wILC8HiByCMIjKxrNxniLHAiGpdf18gaZb2as1hu1UI+QU0I7U/WLZp+w='
    let rsaKey = `MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAOlFVn0RGOGTgCQR
    gu9OWK1AgbzSLinj7+GBvFq5qC5Gcwe8VQBYXcCuTOTDtW/zuw1MScAWTMBmAsMJ
    5B4kDNSrj6PQXs8Ozz4jQvaY2Ckx+FErb2LNo6wOdQXGepQ3ARUEwKRtA7o06mNc
    hHWygZx2Pkf+InQWA/U/623xm7CPAgMBAAECgYA2qyBU2S/qlcXfLhdwe/z+RXLi
    TKOy/49VWzFIVeBbT/lfY7zMAumd4Xt11YPtA8Lfn/Rcxx0frgiRqvzCL5KtxidU
    xaDxsYxApD3ztFbSOQde/P6supIHn8qahok4/ecayBSDR4AV78mYEr9xmxceDZz8
    QCK8i95WK8tLP0pMwQJBAPahgw5BFbOBPBBOK1aqLr8fyYw526phKdaDFw/b0lef
    2kebg1hpPb6xXWcZk4X+r6hexv71CD0/Yjp9YP1e0e8CQQDyIeY0gvmrWBsIup/Z
    0GVsvEtYYHOy9N31+GTvdhzPSzdzxMibmy3PDZKg+FY494N37vlNd1CRdxXT2ixy
    RSthAkEAiG6kbxg2BwzwyxxTASg3n+bXuciv6brCSDZQZad23p5BQ+eVay0cyQaY
    4tXVNATF62AyuQuXuTn8/too80Cm5QJBALW/flXCTngwDTLTKvPLOqaQ/BldZNta
    dFWSWuloBh4PfpM2jcJHi+4UaRDM96ORHqziw11Dh0V5VvgLlzs68mECQQDdMTEx
    D6GJerJHESOK7hPDB25dqhh3fepGMY7UyTkOGxr1fWhcxtrosFj+F3vfhQoBhGdQ
    z6jSf5Wuq1gjvqts`
    let decrypttor = new JSEncrypt();  // 新建JSEncrypt对象
    decrypttor.setPrivateKey(rsaKey);  // 设置私钥
    let decrypted = decrypttor.decrypt(oldPwd); // 解密
    return decrypted;
}

export default {
    aesEncryptCBC,
    aesDecryptCBC,
	aesEncryptECB,
    aesDecryptECB,
    RSAencrypt,
    RSAdecrypt
}
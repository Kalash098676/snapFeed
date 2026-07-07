const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("Available methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(imagekit)));

async function uploadFile(buffer) {
  return await imagekit.upload({
    file: buffer,
    fileName: `image-${Date.now()}.jpg`,
  });
}

module.exports = uploadFile;

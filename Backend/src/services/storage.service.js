const { ImageKit } = require("@imagekit/nodejs");

console.log("ImageKit Class:", ImageKit);

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("ImageKit Instance:", imagekit);
console.log("upload:", typeof imagekit.upload);

async function uploadFile(buffer) {
  return await imagekit.upload({
    file: buffer,
    fileName: `image-${Date.now()}.jpg`,
  });
}

module.exports = uploadFile;

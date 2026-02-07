const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
  try {
    const base64File = `data:video/mp4;base64,${fileBuffer.toString("base64")}`;

    const result = await imagekit.upload({
      file: base64File,   // 👈 must be full base64 with mime
      fileName: fileName,
    });

    return result;
  } catch (err) {
    console.error("ImageKit Upload Error:", err);
    throw err;
  }
}

module.exports = { uploadFile };

const Jimp = require('jimp');
const sharpenImage = async (imagePath) => {
    // Baca foto menggunakan Jimp
    const image = await Jimp.read(imagePath);
  const cloner = await image.clone();
    // Menerapkan filter pengasahan
    image.brightness(0.6);
    //image.contrast(0.3);
    image.composite(cloner, 0, 0, {
  mode: Jimp.BLEND_MULTIPLY,
  opacitySource: 1,
  opacityDest: 1,
});
  //image.brightness(0.2);
    // Mengonversi gambar ke dalam bentuk buffer
    const sharpenedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    
    return sharpenedBuffer;
  }
module.exports.sharpenImage = sharpenImage
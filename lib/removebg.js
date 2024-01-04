const {
  removeBackground,
  segmentForeground
} = require('@imgly/background-removal-node');
const fs = require('fs');

const removebg = async(input) => {
  const srcImg = input
  const config = {
    debug: false,
    progress: (key, current, total) => {
    const [type, subtype] = key.split(':');
},
    output: {
      quality: 0.8,
      type: 'foreground',
      format: 'image/png' //image/jpeg, image/webp
    }
  };
  const blob = await removeBackground(srcImg, config);
  // const blob = await segmentForeground(randomImage, config);

  const buffer = await blob.arrayBuffer();
   const hasil = Buffer.from(buffer);
    return hasil
}

module.exports = {removebg}
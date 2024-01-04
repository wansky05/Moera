const ytdl = require('ytdl-core');

const downloadAudio = async (url) => {
  try {
    const info = await ytdl.getInfo(url);
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      //console.log(audioFormats)
    const filterbitrate = audioFormats.filter(item=>item.audioBitrate=="64")
    console.log(filterbitrate)
    const audioStream = ytdl.downloadFromInfo(info, { format: filterbitrate[0].itag//audioFormats[0].itag 
});

    return new Promise((resolve, reject) => {
      const chunks = [];
      audioStream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      audioStream.on('end', () => {
        const audioBuffer = Buffer.concat(chunks);
        resolve(audioBuffer);
      });
      audioStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw new Error(`Failed to download audio: ${error}`);
  }
}

module.exports = {downloadAudio}
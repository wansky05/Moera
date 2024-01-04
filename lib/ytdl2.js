const ytdl = require('ytdl-core');

const downloadAudio = async (url) => {
    const info = await ytdl.getInfo(url);
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      //console.log(audioFormats)
    const filterbitrate = audioFormats.filter(item=>item.audioBitrate=="128")
    console.log(filterbitrate)
return filterbitrate[0].url
    
}

module.exports = {downloadAudio}
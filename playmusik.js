const { youtubedlv2, savefrom, tiktokdl } = require('@bochilteam/scraper-sosmed');
const {ytv} = require("./lib/ytv.js")
const {yta} = require("./lib/yta.js")
const {getBuffer} = require('./lib/myfunc2.js')
const {downloadAudio} = require("./lib/ytdl2.js")

const playmusik = async(xixy,m,id,key) =>{
const pesan = m
const cmd = pesan?.slice(0,9)
const ytlink = `https://www.youtube.com/watch?v=${pesan?.slice(10)}`
const vid = pesan?.slice(10)
//console.log(id)

//Ok Play
if(cmd =='MP3-AUDIO'){
await xixy.sendMessage(id, { delete: key })
const reso = pesan.split(" ")[2]||'128kbps'
await xixy.sendMessage(id,{text:"Musik sedang dikirim,Sabar ya"})

await yta(vid).then(async (res)=>{
if(res.status=="success"){
const file = await getBuffer(res.data.audio_url)
await xixy.sendMessage(id,{audio: file,mimetype:"audio/mp4"})
}else{
await xixy.sendMessage(id,{text:res.data})
}
}).catch(async (err)=>{
await xixy.sendMessage(id,{text: "Terjadi Kesalahan, Silahkan Lapor Owner Bot"})})
}
/*
if(cmd =='AUDIO-MP3'){
await xixy.sendMessage(id, { delete: key })
const reso = pesan.split(" ")[2]||'128kbps'
await xixy.sendMessage(id,{text:"Musik sedang dikirim,Sabar ya"})

await downloadAudio(ytlink).then(async (res) =>{
  const file = await getBuffer(res)
  await xixy.sendMessage(id,{audio:file,mimetype: 'audio/mp4'})
}).catch(async (err) =>{
  console.log(err)
  await xixy.sendMessage(id,{text: "Terjadi Kesalahan, Silahkan Lapor Owner Bot"})
})
}
*/

//Ok Video
if(cmd =='MP4-VIDEO'){
await xixy.sendMessage(id, { delete: key })
const reso = pesan.split(" ")[2]||'360p'
await xixy.sendMessage(id,{text:"Video sedang dikirim,Sabar ya"})
try{
const data = await ytv(vid)
const status =data.status
const urlnya = data.data
  //console.log(urlnya)
if(status=="success"){
await xixy.sendMessage(id,{video: {url: urlnya}})
}else{
await xixy.sendMessage(id,{text:urlnya})
}
    
}catch(err){
await xixy.sendMessage(id,{text: "Terjadi Kesalahan, Silahkan Lapor Owner Bot"})}
}

}
module.exports = {playmusik}
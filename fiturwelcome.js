const fs = require('fs');
const path = require('path');
const {welcomeCard} = require('./canva/canvas.js')
const botno = fs.readFileSync("./botno.json").toString()
const fiturwelcome = async(xixy,m) => {
const {messages,type} = m
const StubType = messages[0]?.messageStubType
const id = messages[0]?.key?.remoteJid
const idtarget = messages[0]?.messageStubParameters
//-------------------------
//Pesan Welcome Saat Bot Di invite grup
if(StubType == 20){
const welcomebot = {
image: {url: './src/logo.jpg'},
caption: fs.readFileSync('./welcomebot.json').toString()
}
await xixy.sendMessage(id, welcomebot);
var metadata = await xixy.groupMetadata(id)
const size = metadata.size
if(size>limitmember){
await xixy.sendMessage(id,{text: "Verifikasi Selesai, Jumlah member minimum terpenuhi"})
  }
if(size<limitmember){
await xixy.sendMessage(id,{text:`Jumlah Member Grup anda kurang dari ${limitmember} orang dan Tidak memenuhi syarat minimun untuk menggunakan layanan kami, Mohon maaf ${botname} akan bertolak dari grup ini`})
setTimeout(async () => {
  await xixy.groupLeave(id)
}, 6000);
}
}

//Orang masuk (Welcome)
if(StubType == 27000){
//console.log(JSON.stringify(m,null,2))
const metadata = await xixy.groupMetadata(id)
const ngrup = metadata.subject
const ppid = idtarget.toString()
const getpp = async (iduser) => {
  const cdg = "./src/pp.jpg"
const link = await xixy.profilePictureUrl(iduser,'image').catch(err => cdg)
  return link
}
const ppnya = await getpp(ppid)
const idtext = idtarget.map(user => "@"+user.replace("@s.whatsapp.net","")).join(" ")
const tagvit = idtarget
await welcomeCard("Iwan Star","Selamat Datang","Semoga betah di Guild Kami",ppnya).then(async (res) =>{
  await xixy.sendMessage(id,{image: res,caption: `Welcome ${idtext}\nSelamat datang di grup\n*${ngrup}*`,mentions: tagvit})
})
}

//Out Member Auto Tag
if(StubType==32){
if(idtarget == `${botno}@s.whatsapp.net`)return;
const teks = `Waduh si @${messages[0].participant.split("@")[0]} ke luar tuh..\nTungguin kak,xixy mau nitip Ice Cream😋😋`
await xixy.sendMessage(id,{text:teks,mentions: [messages[0].participant]})
}

//Kick Member Auto Tag
if(StubType==28){
if(idtarget == `${botno}@s.whatsapp.net`)return;
let teks = `Waduh🤭 Member @${idtarget.toString().split('@')[0]} telah di Kick @${messages[0].participant.toString().split('@')[0]}\nHati-hati..\nAdminnya galak..kyaaa..🤣🤣`
await xixy.sendMessage(id,{text:teks,mentions: [idtarget,messages[0].participant]})
}
//--------------------------
}
module.exports = {fiturwelcome}
const fs = require('fs');
const format = require('util').format;
const path = require('path');
//const {removebg} = require('./lib/removebg.js')
const {carinime} = require('./lib/carinime.js')
const axios = require('axios');
const { exec } = require('child_process');
require("./lib/database.js")
const { youtubedl, savefrom, tiktokdl } = require('@bochilteam/scraper-sosmed');
const {ytmp4} = require('./lib/ytmp4.js');
const {ytmp3} = require('./lib/ytmp3.js');
const {getBuffer,fetchJson} = require('./lib/myfunc.js')
const {yta} = require('./lib/yta.js')
const ytsr = require('alternative-ytsr');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {addkeyDB,delkeyDB,getvalueDB} = require('./lib/functionDB.js');
const {
   default: makeWASocket,
   useMultiFileAuthState,
   DisconnectReason,
   makeInMemoryStore, 
   msgRetryCounterMap,
   proto,
   downloadMediaMessage,
   downloadContentFromMessage,
   makeCacheableSignalKeyStore,
   MessageType,
   Mimetype,
   getContentType,
   generateWAMessage,
   generateWAMessageFromContent,
   generateForwardMessageContent,
   generateThumbnail,
   extractImageThumb,
   prepareWAMessageMedia,
   WAMessageProto,
   delay,
   jidDecode,
  getAggregateVotesInPollMessage
} = require("@whiskeysockets/baileys");
const {cekToxic} = require('./lib/antitoxic.js');

//-----------
const fiturauto = async(xixy,m) => {
const {messages,type} = m
//console.log(messages[0]?.message)
var botno = xixy?.user?.id.split(':')[0]
let botName = db.botconfig.botName
const pesan = messages[0].message?.conversation||messages[0].message?.extendedTextMessage?.text||messages[0]?.message?.imageMessage?.caption||messages[0]?.message?.videoMessage?.caption||messages[0]?.message?.viewOnceMessageV2?.message?.imageMessage?.caption||messages[0]?.message?.viewOnceMessageV2?.message?.videoMessage?.caption;
const id = messages[0]?.key?.remoteJid;
const fromMe = messages[0]?.key?.fromMe;
const isGroup = id?.endsWith('@g.us')||false
const isPrivatChat = id?.endsWith('@s.whatsapp.net')||false
const sender = isGroup ? messages[0]?.key?.participant : ''
const pushName = messages[0]?.pushName||"Tanpa Nama"
const isImage = messages[0]?.message?.imageMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage||messages[0]?.message?.viewOnceMessageV2?.message?.imageMessage||messages[0]?.message?.viewOnceMessageV2?.message?.videoMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.imageMessage||false
const isVideo = messages[0]?.message?.videoMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage||messages[0]?.message?.viewOnceMessageV2?.message?.videoMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.videoMessage||false
const isStiker = messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage||false
const isImageQuoted = messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage||false
const isVideoQuoted = messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage||false
const viewoncequoted = messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.imageMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.videoMessage
const oncetype = viewoncequoted?.mimetype?.split('/')[0]
const quotedSender = messages[0]?.message?.extendedTextMessage?.contextInfo?.participant
const mentionedJid = messages[0]?.message?.extendedTextMessage?.contextInfo?.mentionedJid
const cmd = pesan?.split(' ')[0]
const argsdat = pesan?.slice(cmd.length+1)||false
//----------Area Const V2----------
const getGroupAdmins = (participants) => {
let admins = []
for (let i of participants){
i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ''
  }
return admins || []
}
const groupMetadata = isGroup ? await xixy.groupMetadata(id).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botno+'@s.whatsapp.net') : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const isOwnerBot = isGroup ? db.botconfig.owner.includes(sender) : isPrivatChat ? db.botconfig.owner.includes(id) : false
const groupOwner = isGroup ? groupMetadata.owner : ''

//Area Fungsi
//Fungsi List Member
const member = async (idgrup) => {
const groupMetadata = await xixy.groupMetadata(id).catch(e => {})
  const participants = await groupMetadata.participants||[]
  return participants
}

//Fungsi List Admin
const admin = async (idgrup) => {
const groupMetadata = await xixy.groupMetadata(id).catch(e => {})
  const participants = await groupMetadata.participants||[]
  const groupAdmins = await participants.filter(v => v.admin !== null).map(v => v.id)||[]
  return groupAdmins
}
  
//---------------------

const officialreply = async (teks,judul,target) => {
await xixy.sendMessage(target||id,
{ text: teks,
contextInfo:{
//mentionedJid:[messages[0].key.participant],
//forwardingScore: 9999999,
//isForwarded: true, 
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"title": judul||"MOERA MENU", 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": fs.readFileSync(`./media/logo.jpg`),
"mediaUrl": `${db.botconfig.officialgc}`,
"sourceUrl": `${db.botconfig.officialgc}`
}}},
{ quoted: messages[0]})
}

const officialreply2 = async (teks,judul,target) => {
await xixy.sendMessage(id,
{ text: teks,
contextInfo:{
//mentionedJid:[sender],
//forwardingScore: 9999999,
//isForwarded: true, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": judul||"MOERA",
"previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": fs.readFileSync(`./media/logo.jpg`),
"sourceUrl": `${db.botconfig.officialgc}`}}},
{ quoted: messages[0]})
}

const notichat = async (text) =>{
  await xixy.relayMessage(id, { scheduledCallCreationMessage: { callType: "2", scheduledTimestampMs: 1500, title: `\n${text}\n\n`}},{ messageId: messages[0].key.id  })
}
const reply = async (teks) =>{
await xixy.sendMessage(id, {text: teks}, {quoted: messages[0]})
}

//---------------------
  const totalpengguna = async () => {
let membersize = 0
let allfetch = await xixy.groupFetchAllParticipating();
let fullgckeys = Object.keys(allfetch)

for(let gckey of fullgckeys){
var metagc = await xixy.groupMetadata(gckey)
const size = metagc.size
membersize = membersize + size
delay(3000)
}
return membersize
}

if(!isGroup){
  await xixy.readMessages([messages[0].key])
}
  
const loading = async () => {
    var hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%",
      "𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳..."
    ]
    let { key } = await xixy.sendMessage(id, {text:"《 ▒▒▒▒▒▒▒▒▒▒▒▒》0%"})//Pengalih isu

    for (let i = 0; i < hawemod.length; i++) {
    await delay(1000)
    await xixy.sendMessage(id, {text: hawemod[i], edit: key });//PESAN LEPAS
    }
    }
//---------------------

let antitoxic = db.grupconfig.antitoxic.includes(id)
let antilink = db.grupconfig.antilink.includes(id)
let hapuslink = db.grupconfig.hapuslink.includes(id)

//Antitoxic RUn
if(pesan && !fromMe){
if(antitoxic){
if(cekToxic(pesan)){
const reaksi = {
    react: {
        text: "❌",
        key: messages[0].key
    }}
  await xixy.sendMessage(id,reaksi)
if(isBotAdmins){
setTimeout(async function(){
await xixy.sendMessage(id, { delete: messages[0].key })
}, 1000);
}
}
}
}
//Antilink
if(pesan?.includes("https://chat.whatsapp.com")){
if(isGroup && !fromMe){
if(antilink){
if(!isBotAdmins){
db.grupconfig.antilink = db.grupconfig.antilink.filter(item => item !== id);
} else
if(isAdmins){
await xixy.sendMessage(id,{text:`Admin Bebas ya kirim Link😁`})
} else
if(isBotAdmins && !isAdmins){
const templateMessage = {
    text: `Hai @${sender.replace('@s.whatsapp.net',"")}\nSerpertinya  Anda berupaya mengirim Link Tautan, Mohon maaf ~tytyd~ Anda akan ${botName} tendang dari grup`,
    mentions: [sender.toString()]
}
  await xixy.sendMessage(id,templateMessage,{quoted: messages[0]})
setTimeout(async function(){
  await xixy.groupParticipantsUpdate(id,[sender.toString()],"remove")
  await xixy.sendMessage(id, { delete: messages[0].key })
}, 3000);

}
}else
if(hapuslink){
if(!isBotAdmins){
db.grupconfig.hapuslink=db.grupconfig.hapuslink.filter(item => item !== id);
} else
if(isAdmins){
await xixy.sendMessage(id,{text:`Admin Bebas ya kirim Link😁`})
} else
if(isBotAdmins && !isAdmins){
const templateMessage = {
    text: `*Hapus Link Aktif*\n\nHai @${sender.replace('@s.whatsapp.net',"")}\nLink Tautan Terdeteksi,Mohon maaf pesan kaka akan ${botName} Hapus`,
    mentions: [sender.toString()]
}
  await xixy.sendMessage(id,templateMessage,{quoted: messages[0]})
  const reaksi = {
    react: {
        text: "❌",
        key: messages[0].key
    }}
  await xixy.sendMessage(id,reaksi)
setTimeout(async function(){
  await xixy.sendMessage(id, { delete: messages[0].key })
}, 2000);

}
}
}
}



let command = cmd;

switch(command) {
//------------------------------
  case "=>":
  case "run": {
    if(!isOwnerBot) return reply("Fitur Ini Khusus OwnerBot");
    let query = argsdat
    if (fromMe) return;
    let evaluate = false
    try {
      evaluate = await eval(query);
      try {
        evaluate = format(evaluate)
      } catch { }
    } catch (e) {
      evaluate = e.stack.toString();
    };
    await xixy.sendMessage(id, { text: format(evaluate) });
  }
  break;
//------------------------------
case ".restart": {
    if(!isOwnerBot) return await reply("Fitur Ini Khusus OwnerBot");
    await reply("Sedang Memulai Ulang Sistem...Memerlukan 30 deitk untuk Bot aktif kembali")
    process.exit()
  }
  break;
//------------------------------
  case ".allmenu":
  case ".menu":{
  const {menulist} = require('./lib/cekallkey.js')
  const textnya = fs.readFileSync('./database/menu.json').toString()
  await loading()
  const menutx = `*Bot ini hasil dari kegabutan Kami ,Semisal ada bug harap dimaklumi.*\n*Bot ini Gratis dan masih dalam tahap Pengembangan.*\n*Mohon di pergunakan dengan bijak.*\n\n*Total Pengguna : ${await totalpengguna()} User*\n\n${textnya}\n${await menulist()}\n\n*Menu kurang lenkap tambah sendiri lah :v*\n\n*Created By Team Dev Moera @2023*`
  officialreply(menutx)
}
    break;
//------------------------------
  case ".tutorial":{
    const textnya = fs.readFileSync('./database/tutorial.json').toString()
    await reply(textnya)
  }
    break;
  case ".stiker":
  case '.sticker':
  case 's':
  case '.s':{
  if(isImage){
    // download stream
    const stream = await downloadContentFromMessage(isImage,'image',);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
        const sticker = new Sticker(buffer, {
      pack: "Moera", // The pack name
      author: "Bot", // The author name
      type: StickerTypes.FULL, // The sticker type
      categories: ['🤩', '🎉'], // The sticker category
      id: '12345', // The sticker id
      quality: 50, // The quality of the output file
      background: {
          "r": 255,
          "g": 255,
          "b": 255,
          "alpha": 0} // The sticker background color (only for full stickers)
  })
  const buffer2 = await sticker.toBuffer()
  await xixy.sendMessage(messages[0].key.remoteJid,{sticker:buffer2},{quoted:messages[0]})
  }else if(isVideo){
  if(isVideo.seconds==0){
    await reply("kirim ulang wirr video dari bot gakbisa wirr")
  }else if(isVideo.seconds<11){
    const mulai = {
      react: {
          text: "🕒",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,mulai)
    // download stream
    const stream = await downloadContentFromMessage(isVideo,'video',);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
        const sticker = new Sticker(buffer, {
      pack: `${botName}`, // The pack name
      author: `${author}`, // The author name
      type: StickerTypes.FULL, // The sticker type
      categories: ['🤩', '🎉'], // The sticker category
      id: '12345', // The sticker id
      quality: 5, // The quality of the output file
      background:'transparent' // The sticker background color (only for full stickers)
  })
  const buffer2 = await sticker.toBuffer()
  await xixy.sendMessage(id,{sticker:buffer2},{quoted:messages[0]}).then(async (kirimsukses) =>{
        const reaksi = {
      react: {
          text: "✅",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,reaksi)})
  }else{
    await reply("Durasi max 10 detik wirr")
  }
  }else{
    await reply("Apanya mau di bikin stiker..kasi foto/video lah wirr")
  }
  }
    break;
//------------------------------
  //YT Play
  case ".play":{
  if(!argsdat){
    await xixy.sendMessage(id,{text:"Mana judul lagunya kak?😓"})
  }else{
const arrsearch = await ytsr(argsdat).then(async (res)=>res.items).then(arr=>arr.filter(ls=>ls.type=="video")).catch(err=>[])
//console.log()
if(arrsearch.length==0){
    await xixy.sendMessage(id,{text: nohasil},{quoted: messages[0]})
}else
if(arrsearch[0].duration.slice(-8,-6)>0||arrsearch[0].duration.slice(-5,-3)>20){
    var ytdat = {
      image: {url: arrsearch[0].bestThumbnail.url },
      caption: `Judul : ${arrsearch[0].title}\nKreator : ${arrsearch[0].author.name}\nDurasi : ${arrsearch[0].duration}\nLink : ${arrsearch[0].url}\n\n⛔Durasi terlalu panjang dan dapat mengganggu kinerja server,\nMohon maaf ${db.botconfig.botName} tidak dapat memprosesnya`}
    await xixy.sendMessage(id,ytdat,{quoted: messages[0]})
}else{
const infoimgmusik = {
      image: {url: arrsearch[0].bestThumbnail.url },
      caption: `Judul : ${arrsearch[0].title}\nKreator : ${arrsearch[0].author.name}\nDurasi : ${arrsearch[0].duration}\nLink : ${arrsearch[0].url}`}
    
    await xixy.sendMessage(id, infoimgmusik,{quoted: messages[0]})
    
    await xixy.sendMessage(id, { poll: { name: "Pilih Salah Satu", values: [`MP3-AUDIO\n${arrsearch[0].url.split('=')[1]}`, `MP4-VIDEO\n${arrsearch[0].url.split('=')[1]}`],selectableCount:1 } });

  }
}
}
  break;
//------------------------------
  case ".refix":{
  if(isImage){
  const {sharpenImage} = require('./lib/imgfix.js')
    // download stream
    const stream = await downloadContentFromMessage(isImage,'image',);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
await sharpenImage(buffer).then(async (sharpen) =>{
  await xixy.sendMessage(messages[0].key.remoteJid,{image:sharpen,caption:"Ini hasilnya"},{quoted:messages[0]})
}).catch(async (err) =>{
  console.log(err)
  await xixy.sendMessage(messages[0].key.remoteJid,{text:"Gagal wir"},{quoted:messages[0]})
  
})
}else{
    await reply("Fotonya mana wirr..")
  }
  }
    break;
//------------------------------
   /* case ".sticker":{
  case ".play":{
  try{
  if(!argsdat){
    await xixy.sendMessage(id,{text:"kasi judul lah wir"},{quoted: messages[0]})
  }else{
  const search = await ytsr(argsdat)
  const terfilter = search.items.filter(listnya=>listnya.type==="video")
  if(terfilter[0] == undefined||terfilter[0].duration == null){
    await xixy.sendMessage(id,{text: nohasil},{quoted: messages[0]})}
  if(terfilter[0].duration.length>4){
    var ytdat = {
      image: {url: terfilter[0].bestThumbnail.url },
      caption: `Judul : ${terfilter[0].title}\nKreator : ${terfilter[0].author.name}\nDurasi : ${terfilter[0].duration}\nLink : ${terfilter[0].url}\n\n*⛔Durasi Kepanjangan Wir...ntar abis Kuota gw*`}
    await xixy.sendMessage(id,ytdat,{quoted: messages[0]})
  }
  if(terfilter[0].duration != null && terfilter[0].duration.length<5){
  const infoimgmusik = {
      image: {url: terfilter[0].bestThumbnail.url },
      caption: `Judul : ${terfilter[0].title}\nKreator : ${terfilter[0].author.name}\nDurasi : ${terfilter[0].duration}\nLink : ${terfilter[0].url}\n\n*Tunggu Wir Musik sedang dikirim*`}
  await xixy.sendMessage(id, infoimgmusik,{quoted: messages[0]}) 

  //Run Download
  const reso = '128kbps'
  const ytlink = terfilter[0].url
  const mulai = {
      react: {
          text: "🕒",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,mulai)
  try{
  const data = await youtubedl(ytlink)
  const urlnya = await data.audio[`${reso}`].download()
    await xixy.sendMessage(id,{audio: {url: urlnya},mimetype: 'audio/mp4'},{quoted: messages[0]}).then(async (kirimsukses) =>{
        const reaksi = {
      react: {
          text: "✅",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,reaksi)
      })
  }catch(err){
  await reply("Yah gagal wir")
  }
  }
  }
  } catch (error){
   await reply("Yah gagal wir")
  }
  }
   break;
    */
//------------------------------
  case ".randomtag":
  case ".gachatag":{
if(!isAdmins)return await reply("Lu siapa? Admin?");
  var alltagmem = participants.map(a => a.id)
  let rdmmem = alltagmem[Math.floor(Math.random() * alltagmem.length)]
  await xixy.sendMessage(id,{text:`Member Terpilih adalah\n\n👉 @${rdmmem.split("@")[0]}`,mentions:[rdmmem]})
}
   break;
//------------------------------
  case ".hidetag":{
  var hidetext = argsdat||"Nimbrung Wirr"
  if(!isAdmins){
    await reply("Lu siapa? Admin?")
  }
  if(isAdmins){
    var alltagmem = participants.map(a => a.id)
    await xixy.sendMessage(id,{text:hidetext,mentions:alltagmem})
  }
  }
  break;
//------------------------------
  case '.gruptag':
  case '.tagall':{
if(isAdmins){
var list = participants.map(a => a.id)
var taglist =''
for (let mem of participants) {
taglist += `■@${mem.id.split('@')[0]}\n`
}
const templateMessage = {
    text: "Grup Tag Member\n\n"+taglist,
    mentions: list}
   await xixy.sendMessage(id, templateMessage,{quoted:messages[0]})
}
if(!isAdmins){
await reply("Lu Siapa? Admin?")
}
}
  break;
//------------------------------
  case ".carigc":{
  if(!argsdat){
    await xixy.sendMessage(id, {text:"Masukkan Nama GC yang ingin dicari"})
  }else{
const {gcsearch} = require('./lib/gcsearch.js')
const gc = await gcsearch(argsdat)
var res = gc.respon
var allgctxt = ''
for(let i= 0 ; i < res.length; i++){
  var textgc = `Nama GC : ${res[i].judul}\nLink : ${res[i].link}`
allgctxt += textgc+"\n\n"
}
    await reply(allgctxt)
  }
}
  break;
//------------------------------
  case ".addmenu":{
    if(!isOwnerBot) return reply("Fitur Ini Khusus OwnerBot");
    const keynya = argsdat?.split(' ')[0]
    const value = pesan?.slice(cmd.length+keynya.length+2)
    const valuenya = encodeURIComponent(value)
    await addkeyDB('./database/automenu.json',keynya,valuenya)

    const reaksi = {
      react: {
          text: "✅",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,reaksi)
}
  break;
//------------------------------
  case ".delmenu":{
    if(!isOwnerBot) return reply("Fitur Ini Khusus OwnerBot");
  const keynya = argsdat
  await delkeyDB('./database/automenu.json',keynya)
  const reaksi = {
    react: {
        text: "✅",
        key: messages[0].key
    }}
  await xixy.sendMessage(id,reaksi)
}
  break;
//------------------------------
  case ".ai":{
  if(!argsdat){
    await reply("kasi pertanyaannya wir")
  }else if(argsdat){
    const {aichat} = require('./lib/ai.js')
    let ltes = await xixy.sendMessage(id,{text:"AI sedang Berfikir..."},{quoted:messages[0]}).then(a=>a.key)
      const aires = await aichat(argsdat)
    await delay(1000)
      if(aires.error==''){
      await xixy.sendMessage(id,{text:`${aires.respon}`,edit:ltes})
    }else{
      await reply(`${aires.error}`) 
    }

    }
  }
  break;
//------------------------------
  case ".share":{
if(!isOwnerBot) return reply("Fitur Ini Khusus OwnerBot");
const bc = {text:`*[ Broadcast Pesan ]*\n\n${argsdat}` }
let allfetch = await xixy.groupFetchAllParticipating();
let fullgckeys = Object.keys(allfetch)

for(let gckey of fullgckeys){
try{
var metagc = await xixy.groupMetadata(gckey)
const status = metagc.announce
if(!status){
  await xixy.sendMessage(gckey, bc)
}
}catch (e){}
 await delay(5000)
}

}
  break;
//------------------------------
  case '.antitoxic':{
    if(!isAdmins)return reply("Anda siapa? Admin?");
    if(!isBotAdmins)return reply("Gagal karena Bot bukan Admin Grup");

  if(antitoxic==false){
    db.grupconfig.antitoxic.push(id)
    await reply("Antitoxic di grup ini telah diaktifkan")
  
  }else if(antitoxic == true){
    db.grupconfig.antitoxic = db.grupconfig.antitoxic.filter(item => item !== id);
    await reply("Antitoxic di grup ini telah di nonaktifkan")
  }
  }
  break;
//------------------------------
  case '.antilink':{
    if(!isAdmins)return reply("Anda siapa? Admin?");
    if(!isBotAdmins)return reply("Gagal karena Bot bukan Admin Grup");
   
  if(antilink==false){
    db.grupconfig.antilink.push(id)
    await reply("Antilink di grup ini telah diaktifkan")
  
  }else if(antilink == true){
    db.grupconfig.antilink = db.grupconfig.antilink.filter(item => item !== id);
    await reply("Antilink di grup ini telah di nonaktifkan")
  }
  }
  break;
//------------------------------
case '.hapuslink':{
   if(!isAdmins)return reply("Anda siapa? Admin?");
   if(!isBotAdmins)return reply("Gagal karena Bot bukan Admin Grup");

  if(hapuslink==false){
    db.grupconfig.hapuslink.push(id)
    await reply("Hapuslink di grup ini telah diaktifkan")
  
  }else if(hapuslink == true){
    db.grupconfig.hapuslink = db.grupconfig.hapuslink.filter(item => item !== id);
    await reply("Hapuslink di grup ini telah di nonaktifkan")
  }
  }
  break;
/////AREA ADMIN GRUP SAJA (FITUR GRUP)/////
//------------------------------
//Tutup GC
  case '.tutupgc':
  case '.tutupgrup':
  case '.closegc':
  case '.closegroup':{
if(!isBotAdmins){
await reply(`Gagal Menutup karena ${db.botconfig.botName} bukan Admin Grup`)
} else
if(isAdmins){
await xixy.groupSettingUpdate(id,'announcement')
await xixy.sendMessage(id,{text:`Grup telah ditutup oleh @${sender.split("@")[0]}`,mentions: [sender.toString()]})
} else
if(!isAdmins){
await reply("Lu Siapa? Admin?")
}
}
  break;
//------------------------------
//Buka GC
  case '.bukagc':
  case '.bukagrup':
  case '.opengc':
  case 'opengroup':{
if(!isBotAdmins){
await reply(`Gagal Menutup karena ${db.botconfig.botName} bukan Admin Grup`)
} else
if(isAdmins){
await xixy.groupSettingUpdate(id,'not_announcement')
await xixy.sendMessage(id,{text:`Grup telah dibuka oleh @${sender.split("@")[0]}`,mentions: [sender.toString()]})
} else
if(!isAdmins){
await reply("Lu Siapa? Admin?")
}
}
  break;
//------------------------------
//Promote
  case '.promote':{
if(!isBotAdmins){
await reply(`Gagal karena ${db.botconfig.botName} bukan Admin`)
}else
if(!isAdmins){
await reply("Lu Siapa? Admin?")
}else
if(isBotAdmins && isAdmins){
if(!(mentionedJid.length==0)){
const target = `@${mentionedJid.join(" @")}`
const txtarget = target.replace(/\@s\.whatsapp\.net/g,'')
await xixy.groupParticipantsUpdate(id,mentionedJid,"promote")
await xixy.sendMessage(id,{text: `Member ${txtarget} naik jabatan sebagai Admin Grup`,mentions:mentionedJid})
}else
if(quotedSender){
var target = `@${quotedSender.split("@")[0]}`
await xixy.groupParticipantsUpdate(id,[quotedSender],"promote")
await xixy.sendMessage(id,{text: `Member ${target} naik jabatan sebagai Admin Grup`,mentions:[quotedSender]})
}
}
};
  break;
//------------------------------
//Demote
  case '.demote':{
if(!isBotAdmins){
await reply(`Gagal karena ${db.botconfig.botName} bukan Admin`)
}else
if(!isAdmins){
await reply("Lu Siapa? Admin?")
}else
if(isBotAdmins && isAdmins){
if(!(mentionedJid.length==0)){
const target = `@${mentionedJid.join(" @")}`
const txtarget = target.replace(/\@s\.whatsapp\.net/g,'')
await xixy.groupParticipantsUpdate(id,mentionedJid,"demote")
await xixy.sendMessage(id,{text: `Member ${txtarget} turun jabatan sebagai Member Biasa`,mentions:mentionedJid})
}else
if(quotedSender){
var target = `@${quotedSender.split("@")[0]}`
await xixy.groupParticipantsUpdate(id,[quotedSender],"demote")
await xixy.sendMessage(id,{text: `Member ${target} turun jabatan sebagai Member Biasa`,mentions:[quotedSender]})
}
}
};
  break;
//------------------------------
  case '.kick':{
if(!isBotAdmins){
await reply(`Gagal karena ${db.botconfig.botName} bukan Admin`)
}else
if(!isAdmins){
await reply("Lu Siapa? Admin?")
}else
if(isBotAdmins && isAdmins){
if(!(mentionedJid.length==0)){
const target = `@${mentionedJid.join(" @")}`
const txtarget = target.replace(/\@s\.whatsapp\.net/g,'')
await xixy.groupParticipantsUpdate(id,mentionedJid,"remove")
await xixy.sendMessage(id,{text: `Member ${txtarget} berhasil di tendang dari Grup`,mentions:mentionedJid})
}else
if(quotedSender){
var target = `@${quotedSender.split("@")[0]}`
await xixy.groupParticipantsUpdate(id,[quotedSender],"remove")
await xixy.sendMessage(id,{text: `Member ${target} berhasil di tendang dari Grup`,mentions:[quotedSender]})
}
}
};
  break;
//------------------------------
  //Edit File
  case '.editfile':{
    if(!isOwnerBot) return reply("Fitur Ini Khusus OwnerBot");
  try{
  const pathedit = argsdat.split(" ")[0]
  const isistr = argsdat.slice(pathedit.length+1).toString()
await fs.writeFileSync(pathedit,isistr);
await xixy.sendMessage(id,{text:"File Berhasil di edit"},{quoted:messages[0]})
}catch(err){
await xixy.sendMessage(id,{text:`${err.toString()}`},{quoted:messages[0]})
} 
  }
  break ;
  case '.bash':{
    if(!isOwnerBot) return reply("Fitur Ini Khusus OwnerBot");
    exec(`${argsdat}`,async (error, stdout, stderr) => {
  if (error) {
    await reply(`Terjadi kesalahan:\n${error}`);
    return
  }
  if(stdout){
  await reply(`Output:\n${stdout}`);
  }
  if(stderr){
  await reply(`Error:\n${stderr}`);
  }
});
  }
  break;
//------------------------------
case '.ytmp3':{
   if(!argsdat){
    await reply("Mana link youtube nya?")
  }else{
     if(argsdat.includes('http')){
const mulai = {
      react: {
          text: "🕒",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,mulai)
    await ytmp3(argsdat).then(async (res)=>{
      if(res?.mess==""){
      await xixy.sendMessage(id,{
        audio:{url: res.dlink},
        mimetype: "audio/mp4"
      },{quoted:messages[0]})
      const done = {
      react: {
          text: "✅",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,done)
    }else if(res?.status=="error"){
      await xixy.sendMessage(id,{text: res.error},{quoted:messages[0]})
    }
    }).catch(async (err)=>{
      await xixy.sendMessage(id,{text: err.toString()},{quoted:messages[0]})
    });
    
  }else{
    await xixy.sendMessage(id,{text: "klo ngasih link itu yg bener oi.."},{quoted:messages[0]})
}
  }
}
break;
//------------------------------
case '.ytmp4':{
   if(!argsdat){
    await reply("Mana link youtube nya?")
  }else{
     if(argsdat.includes('http')){
const mulai = {
      react: {
          text: "🕒",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,mulai)
    await ytmp4(argsdat).then(async (res)=>{
      if(res?.mess==""){
      await xixy.sendMessage(id,{
        video:{url: res.dlink},
        caption:res.title,
        mimetype: "video/mp4"
      },{quoted:messages[0]})
      const done = {
      react: {
          text: "✅",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,done)
    }else if(res?.status=="error"){
      await xixy.sendMessage(id,{text: res.error},{quoted:messages[0]})
    }
    }).catch(async (err)=>{
      await xixy.sendMessage(id,{text: err.toString()},{quoted:messages[0]})
    });
    
  }else{
    await xixy.sendMessage(id,{text: "klo ngasih link itu yg bener oi.."},{quoted:messages[0]})
}
  }
}
break;
//------------------------------
  default:{
    if(cmd?.startsWith(".")){
  const dbdat = await getvalueDB('./database/automenu.json',cmd)
  if(dbdat == "0"){
    const reaksi = {
      react: {
          text: "🚫",
          key: messages[0].key
      }}
    await xixy.sendMessage(id,reaksi)
  }else{
    const dbdatdecode = decodeURIComponent(dbdat)
    await reply(dbdatdecode)
  }
}
}
//------------------------------
}    


if(pesan?.startsWith(('lagi apa'||'Lagi apa'))){
  if(mentionedJid){
    const {lagiapa} = require('./lib/lagiapa.js')
    const hasil = await lagiapa()
    const tagtext = mentionedJid[0].split('@')[0]
   const result = `si @${tagtext} ${hasil}`
    await xixy.sendMessage(id, {text: result,mentions:mentionedJid}, {quoted: messages[0]})
  }
}

//--------------------- 
}
module.exports ={fiturauto}
const fs = require('fs');
const path = require('path');
let botname = "Moera"
const botno = fs.readFileSync("./botno.json").toString()
const fiturgrup = async(xixy,m) => {
const {messages,type} = m
//----------Area Const----------
const pesan = messages[0].message?.conversation||messages[0].message?.extendedTextMessage?.text||messages[0]?.message?.imageMessage?.caption||messages[0]?.message?.videoMessage?.caption;
const id = messages[0]?.key?.remoteJid;
const fromMe = messages[0]?.key?.fromMe
const isImage = messages[0]?.message?.imageMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage||false
const isVideo = messages[0]?.message?.videoMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage||false
const isStiker = messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage||false
const quotedid = messages[0]?.message?.extendedTextMessage?.contextInfo?.participant
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
const pushName = messages[0]?.pushName||"Tanpa Nama"
const isGroup = id?.endsWith('@g.us')||false
const sender = isGroup ? messages[0]?.key?.participant : ''
const groupMetadata = isGroup ? await xixy.groupMetadata(id).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botno+'@s.whatsapp.net') : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
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
//FITUR GRUP

//Tutup GC
if(pesan==".tutupgc"){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal Menutup karena ${botname} bukan Admin Grup`},{quoted:messages[0]})
} else
if(isAdmins){
await xixy.groupSettingUpdate(id,'announcement')
await xixy.sendMessage(id,{text:`Grup telah ditutup oleh @${sender.split("@")[0]}`,mentions: [sender.toString()]})
} else
if(!isAdmins){
await xixy.sendMessage(id,{text:"Maaf Anda bukan Admin"},{quoted:messages[0]})
}
}
  
//Buka GC
if(pesan==".bukagc"){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal Menutup karena ${botname} bukan Admin Grup`},{quoted:messages[0]})
} else
if(isAdmins){
await xixy.groupSettingUpdate(id,'not_announcement')
await xixy.sendMessage(id,{text:`Grup telah dibuka oleh @${sender.split("@")[0]}`,mentions: [sender.toString()]})
} else
if(!isAdmins){
await xixy.sendMessage(id,{text:"Maaf Anda bukan Admin"},{quoted:messages[0]})
}
}
  
//GrupTag
if(pesan == ".gruptag"){
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
await xixy.sendMessage(id,{text:"Maaf Anda bukan Admin"},{quoted:messages[0]})
}
}

//Add Member Via Nomer
if(cmd==".add" && pesan?.length>12){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
}else
if(!isAdmins){
await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
var nohp = pesan.slice(5).replace(/\-|\+|\s|@/g,"")
const formatid = (dathp) =>{
  if(dathp.startsWith("08")){
    var add = dathp.slice(1)
    var newno = `62${add}@s.whatsapp.net`
    return newno  
  }else{
    var target = `${dathp}@s.whatsapp.net`
    return target
  }
}
const notarget = formatid(nohp)
var cekno = await xixy.onWhatsApp(notarget)
if(cekno.length>0){
await xixy.sendMessage(id,{text:`Memproses...\nGagal jika target mengaktifkan Privasi`})
await xixy.groupParticipantsUpdate(id,[notarget],"add")
}else(
  await xixy.sendMessage(id,{text: `Gagal Nomer ${nohp} tidak terdaftar di Whatsapp`})
) 
}
};

//Promote via Tag
if(cmd==".promote" && pesan?.includes("@")){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
}else
if(!isAdmins){
await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
const target = `@${mentionedJid?.toString().replace(/@s\.whatsapp\.net/g,"").replace(/\,/g," @")}`
await xixy.groupParticipantsUpdate(id,mentionedJid,"promote")
await xixy.sendMessage(id,{text: `Member ${target} naik jabatan sebagai Admin Grup`,mentions:mentionedJid})
}
};

//Demote via Tag
if(cmd==".demote" && pesan?.includes("@")){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
     }else
if(!isAdmins){
await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
const target = `@${mentionedJid?.toString().replace(/@s\.whatsapp\.net/g,"").replace(/\,/g," @")}`
await xixy.groupParticipantsUpdate(id,mentionedJid,"demote")
await xixy.sendMessage(id,{text: `Member ${target} turun jabatan sebagai Member`,mentions:mentionedJid})
}
};

//Kick via Tag
if(cmd==".kick" && pesan?.includes("@")){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
}else
if(!isAdmins){
await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
const target = `@${mentionedJid?.toString().replace(/@s\.whatsapp\.net/g,"").replace(/\,/g," @")}`
await xixy.groupParticipantsUpdate(id,mentionedJid,"remove")
await xixy.sendMessage(id,{text: `Member ${target} berhasil di tendang dari Grup`,mentions:mentionedJid})
}
};

//Add Member via Reply
if(cmd == ".add"){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
}else
if(!isAdmins){
await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
const notarget = quotedid
var cekno = await xixy.onWhatsApp(notarget)
if(cekno.length>0){
await xixy.sendMessage(id,{text:`Memproses...\nGagal jika target mengaktifkan Privasi`})
await xixy.groupParticipantsUpdate(id,[notarget],"add")
}else(
await xixy.sendMessage(id,{text: `Gagal Nomer ${nohp} tidak terdaftar di Whatsapp`})
) 
}
};

//Promote Via Reply
if(cmd==".promote"){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
}else
if(!isAdmins){
await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
var target = `@${quotedid.split("@")[0]}`
await xixy.groupParticipantsUpdate(id,[quotedid],"promote")
await xixy.sendMessage(id,{text: `Member ${target} naik jabatan sebagai Admin Grup`,mentions:[quotedid]})
}
};
    
//Demote Via Reply
if(cmd==".demote"){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
}else
if(!isAdmins){
await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
var target = `@${quotedid.split("@")[0]}`
await xixy.groupParticipantsUpdate(id,[quotedid],"demote")
await xixy.sendMessage(id,{text: `Member ${target} turun jabatan sebagai Member`,mentions:[quotedid]})
}
};

//Kick Via Reply
if(cmd== ".kick" || cmd == "kick"||cmd =="Kick"){
if(!isBotAdmins){
await xixy.sendMessage(id,{text: `Gagal karena ${botname} bukan Admin`},{quoted: messages[0]})
}else
if(!isAdmins){
  await xixy.sendMessage(id,{text: "Maaf Anda bukan Admin"},{quoted: messages[0]})
}else
if(isBotAdmins && isAdmins){
var target = `@${quotedid.split("@")[0]}`
await xixy.groupParticipantsUpdate(id,[quotedid],"remove")
await xixy.sendMessage(id,{text: `Member ${target} berhasil di tendang dari Grup`,mentions:[quotedid]})
}
};

//Proteksi Virtex
if(pesan?.length>10000 && !fromMe){
  await xixy.sendMessage(id, { delete: messages[0].key })
  await xixy.sendMessage(id,{text: "Proteksi Bug mendeteksi pesan terlalu panjang beresiko berisi Virtex"})
  }
//--------------------- 
}
module.exports = {fiturgrup}
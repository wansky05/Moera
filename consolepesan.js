const fs = require('fs');
const path = require('path');
const axios = require('axios');
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
   jidDecode
} = require("@whiskeysockets/baileys");
//Area Fungsi
//Fungsi Ambil Json di Link
const fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}
//-----------
const viewchat = async(xixy,m) => {
const {messages,type} = m
const pesan = messages[0].message?.conversation||messages[0].message?.extendedTextMessage?.text||messages[0]?.message?.imageMessage?.caption||messages[0]?.message?.videoMessage?.caption;
const kirim = xixy.sendMessage;
const id = messages[0]?.key?.remoteJid;
const sender = messages[0]?.key?.participant;
const idlagu = messages[0].key?.id
const isImage = messages[0]?.message?.imageMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage||false
const isVideo = messages[0]?.message?.videoMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage||false
const isStiker = Object.keys(messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage||["null"])[0]==="stickerMessage"
const isImageQuoted = Object.keys(messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage||["null"])[0]==="imageMessage"
const isVideoQuoted = Object.keys(messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage||["null"])[0]==="videoMessage"
const messageTypeV2 = Object.keys(messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message||["null"])[0];
const viewoncequoted = messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.imageMessage||messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.videoMessage
const oncetype = viewoncequoted?.mimetype?.split('/')[0]
const cmd = pesan?.split(' ')[0]
const argsdat = pesan?.slice(cmd.length+1)||false
const notichat = async (text) =>{
  await xixy.relayMessage(id, { scheduledCallCreationMessage: { callType: "2", scheduledTimestampMs: 1500, title: `\n${text}\n\n`}},{ messageId: messages[0].key.id  })
}

  const member = async (idgrup) => {
  const groupMetadata = await xixy.groupMetadata(id).catch(e => {})
    const participants = await groupMetadata.participants||[]
    return participants
  }
//---------------------
  const getGroupAdmins = (participants) => {
      let admins = []
      for (let i of participants) {
          i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ''
      }
      return admins || []
  }
  const isGroup = id?.endsWith('@g.us')||false
  const groupMetadata = isGroup ? await xixy.groupMetadata(messages[0].key.remoteJid).catch(e => {}) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const participants = isGroup ? await groupMetadata.participants : ''
  const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
  const isAdmins = isGroup ? groupAdmins.includes(sender) : false
  const groupOwner = isGroup ? groupMetadata.owner : ''

//---------------------
const chat = (id) => {
  if (id.endsWith('@g.us')) {
    return "Chat Grup"}else{return "Chat Pribadi"}
}
const idgrup = isGroup ? id : ''
const pengirim = isGroup ? sender : id
const typechat = messages[0] ?Object.keys(messages[0].message)[0] :''
let form =`${chat(id)}\nID Grup : ${idgrup}\nDari : ${pengirim.split('@')[0]}\nTipe : ${typechat}\nPesan : \n${pesan}`

const a = form||''
  
const readline = require('readline');
// Membuat instance interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const updatelog = (log) => {
// Fungsi untuk mengganti teks pada posisi tertentu di terminal
    readline.cursorTo(process.stdout, 0); // Pindah kursor ke awal baris
    //readline.clearLine(process.stdout, 1); // Menghapus baris saat ini
    process.stdout.write(log); // Menampilkan teks baru
}

  await updatelog(chat(id))
  await updatelog(pengirim)
  await updatelog(pesan)

//--------------------- 
}
module.exports ={viewchat}
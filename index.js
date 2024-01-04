require('./setup.js')
const online = require('./online.js')
const fs = require('fs')
const makeWASocket = require("@whiskeysockets/baileys").default
const moment = require('moment-timezone')
const color = require('cli-color')
const qrcode = require("qrcode-terminal")
const pino = require('pino')
const { delay, useMultiFileAuthState, BufferJSON, fetchLatestBaileysVersion, PHONENUMBER_MCC, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore, downloadContentFromMessage,generateWAMessageFromContent,proto,getAggregateVotesInPollMessage } = require("@whiskeysockets/baileys")
const Pino = require("pino")
const NodeCache = require("node-cache")
const chalk = require("chalk")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")

const pairingCode = true||process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const store = makeInMemoryStore({
   logger: Pino().child({
      level: 'silent',
      stream: 'store'
   })
});
//store?.readFromFile('./sesistore.json')
// save every 10s
//setInterval(() => {
//store?.writeToFile('./sesistore.json')
//}, 10_000)

async function startBot() {
//--------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./sesixixy`)
const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"

const xixy = makeWASocket({
      logger: pino({ level: 'silent' }),
      printQRInTerminal: !pairingCode, 
      auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Chrome (Linux)', '', ''],
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, 
   })

store?.bind(xixy.ev)
//Login dengan Kode Pairing
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61

if (!xixy.authState.creds.registered) {
  let phoneNumber
phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Masukan Nomor WhatsApp Anda\nContoh: 6281234567890 : `)))

phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

//Tanya kembali jika salah memasukan Nomer
if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {

phoneNumber = await question(chalk.bgBlack(chalk.red("\nMasukan Nomor WhatsApp Anda dimulai dengan kode Negara Anda\nContoh: 6281234567890 : ")))

  if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
    console.log(chalk.black(chalk.bgRed("\nKesalahan Terulang Sistem di matikan")))
    process.exit(0)
  }
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
rl.close()
}

// Tanyakan kode Pairing

setTimeout(async () => {
let code = await xixy.requestPairingCode(phoneNumber)

code = code?.match(/.{1,4}/g)?.join("-") || code

console.log(chalk.black(chalk.bgGreen(`\nKode Pairing Whatsapp Anda : `)), chalk.black(chalk.bgGreen(code)),"\n")
}, 3000)

}
//------------------------------------
async function getMessage(key){
		if(store) {
			const msg = await store.loadMessage(key.remoteJid, key.id)
			return msg?.message || undefined
		}

		// only if store is present
		return proto.Message.fromObject({})
	}
//Manajemen Koneksi
  xixy.ev.on("connection.update",async  (koneksi) => {
  const {connection, lastDisconnect} = koneksi

  if(connection == "open"){
  console.log(chalk.black(chalk.bgGreen(`Berhasil Tersambung ke Whatsapp`)))
/*
  let sessionbot = fs.readFileSync('./sesixixy/creds.json');
  await delay(1000 * 2) 

  const xixysesi = await  xixy.sendMessage(xixy.user.id, { document: sessionbot, mimetype: `application/json`, fileName: `creds.json` })

*/
  
}

  if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401){
  startBot()
  }
  })


xixy.ev.on('creds.update', saveCreds)
xixy.ev.on("messages.upsert",  async (m) => {
  //console.log(JSON.stringify(m,null,2))
/*const del = m?.messages[0]?.message?.protocolMessage?.key
 if(del) {
   const modifkey = {
     remoteJid : del.remoteJid,
     fromMe:false,
     id:del.id,
     participant: m.messages[0].key.participant
   }
//console.log(JSON.stringify(del,null,2))
const rx = await getMessage(modifkey)
  //console.log(rx)
}*/
//console.log("pesan",m.messages[0].key)
 // const {viewchat} = require('./consolepesan.js')
  const {fiturauto} = require('./fiturauto.js');
 // const {fiturwelcome} = require('./fiturwelcome.js');
 // await viewchat(xixy, m)
  await fiturauto(xixy, m)
  //await fiturwelcome(xixy, m)
  
})

xixy.ev.on("messages.update",async (mes)=>{
const key = mes[0]?.key
const updata = mes[0]?.update
//console.log("Respon",key)
const pollup = mes[0]?.update?.pollUpdates
const id = mes[0]?.key?.remoteJid
const getMsg = await getMessage(key)
//console.log("Store",getMsg)
if(pollup){
const resdata = await getAggregateVotesInPollMessage({
 message:getMsg,
 pollUpdates:pollup
  })
  const respoll = resdata?.filter(items=>items.voters.length!==0)[0]?.name||""
const {playmusik} = require("./playmusik.js")
await playmusik(xixy,respoll,id,key)
}
  
});


xixy.ev.on("group-participants.update",async (gcuser)=>{
 // console.log(JSON.stringify(gcuser,null,2))
});
  
}
startBot()

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("Socket connection timeout")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
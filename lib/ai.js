const axios = require('axios');
const unicodeToChar = (text) => {
// Gunakan ekspresi reguler untuk mencari dan mengganti Unicode escape sequence
return text.replace(/\\u[\dA-Fa-f]{4}/g, function(match) {
// Ubah Unicode escape sequence menjadi karakter
return String.fromCharCode(parseInt(match.substr(2), 16));
});
}

const aichat = async(input) => {
var json = {"prompt":`${input}`,"options":{},"systemMessage":"Kamu adalah Moera Bot Asisten Jawir dan Jamet","temperature":0.8,"top_p":1}
var hasil = [];
await axios.post("https://pbot2.bus1.skybyte.me/api/chat-process",json,{ headers: { "Content-type": "application/json" }, }).then(async (res) => {
  if(res.status === 200) {
    const html = res.data.split("\"\,\"text\"\:\"")
    var select = parseInt(html.length)-1
    var ai = html[select].split("\"\,\"detail\"\:")[0].replace(/\\n/g,"\n").replace(/\\/g,"").replace(`\"\,\"delta\"\:\"`,"\n\n*Chat Terpotong*\n*Error Koneksi AI Terputus*@@@").split('@@@')[0]
datx = {
     error:'',
     respon : ai
}
hasil.push(datx)
}

}).catch(err=>{
  var info = err.toString()
  var dat ={
    error: info
  }
  hasil.push(dat)
});
return hasil[0]
}


module.exports = {aichat}
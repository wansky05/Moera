const axios = require('axios');
const cheerio = require('cheerio');

const carinime = async(text) => {
let final = ''
await axios.get(`https://otakudesu.cam/?s=${text}&post_type=anime`).then((res) => {
const html = res.data;
let hasil = [];
const $ = cheerio.load(html);
  $('.chivsrc  > li').each(function (i,el){
const judul = $(el).find('h2').find('a').text()
const link = $(el).find('h2').find('a').attr('href')
const item = {
  judul : judul,
  link : link
}
  hasil.push(item)
});

let result = '*PENCARIAN ANIME By OTAKUDESU*\n\n'
for(let i= 0 ; i < hasil.length; i++){
  result += hasil.map(data=>`*${data.judul}*\n${data.link}\n\n`)[i]
}
  if(hasil.length == 0){
    final +=result+`*Hasil tidak ditemukan*`
  }else{
final +=result.slice(0,-2)
  }
}).catch(err=>{
  info = err.toString()
final +=info
})
return final
}

module.exports = {carinime}
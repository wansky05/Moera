const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio')

const gcsearch = async(input) => {
var tex = input.replace(' ','-')
var hasil = [];
await axios.post(`https://groupsor.link/group/searchmore/${tex}`,"group_no=0",{ headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" }}).then((response) => {
    if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html)
        var arr = [...$('div.group-item')];
        $('.maindiv').each(function(i, elem) {
const judul = $(this).find('a').find('span').text()
const link =$(this).find('a').attr('href').replace('https://groupsor.link/group/invite/','https://chat.whatsapp.com/')
  art = {
    judul : judul,
    link : link
  }

  arr.push(art)
})
    var datx = {
      error:'',
      respon: arr
    }
      hasil.push(datx)
      return hasil[0]
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
module.exports = {gcsearch}
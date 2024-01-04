const axios = require('axios');
const ytv = async (vid) => {
const getUrl = `https://mayar.id/tools/api/youtube?id=${vid}`
let hasil = [];
await axios.get(getUrl,{ headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}, }).then(async(res) => {
if(res.status === 200){
const respon = res?.data
const type = respon.type
const data = respon.data
if(type=="success"){
  const datx = {
    status: type,
    data: respon.data[0].resolutions[0].url
  }
hasil.push(datx)
}else{
  const datx = {
    status: type,
    data: data
  }
hasil.push(datx)
}
}
}).catch(err=>{
  var info = err.toString()
  var dat ={
    status: "error",
    data: info
  }
  hasil.push(dat)
})
return hasil[0]
}

module.exports = {ytv}
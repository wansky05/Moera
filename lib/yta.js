const axios = require('axios');
const yta = async (vid) => {
const getUrl = `https://apiyt.ytdown.app/get_video_info?url=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3D${vid}`
let hasil = [];
await axios.get(getUrl,{ headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'} }).then(async(res) => {
if(res.status === 200){
const respon = res?.data
  const datx = {
    status: 'success',
    data: respon
  }
hasil.push(datx)

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

module.exports = {yta}
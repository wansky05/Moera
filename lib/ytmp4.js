const axios = require('axios');

const ytmp4 = async(input) => {
const sekarang = new Date().getTime()
var form = `k_query=${input}&k_page=home&hl=id&q_auto=0`
const json = encodeURI(form)

var hasil = [];
await axios.post("https://www.y2mate.com/mates/id798/analyzeV2/ajax",json,{ headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}, }).then(async(res) => {
  if(res.status === 200) {
    const html = res?.data

    const vid = res?.data?.vid
    const judul = res?.data?.title
    const kreator = res?.data?.a
    const k = res?.data?.links?.mp4?.["18"]?.k
    const size = res?.data?.links?.mp4?.["18"]?.size
    const set =`vid=${vid}&k=${k}`
    const fset = encodeURI(set)
//Area Post Setup
  await axios.post("https://www.y2mate.com/mates/convertV2/index",fset,{ headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8", 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}, }).then(async (fsetnya) => {
    if(fsetnya.status === 200) {
      const resfset = fsetnya?.data

      hasil.push(resfset)
    }
    
  }).catch((errf) => {
    var info = errf.toString()
  var dat ={
    status: "error",
    error: info
  }
  })

    //console.log(JSON.stringify(fset,null,2))

}

}).catch(err=>{
  var info = err.toString()
  var dat ={
    status: "error",
    error: info
  }
  hasil.push(dat)
});

return hasil[0]

}



module.exports = {ytmp4}
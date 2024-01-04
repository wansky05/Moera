const fs = require('fs');

//Membuat Objek Baru untuk di Tambahkan ke DB
const objekDB = async (key,value) => {
var objbaru = `{\"${key}\":\"${value}\"}`
var hasil = JSON.parse(objbaru)
return hasil
}

//Simpan Key dan Value ke DB
const addkeyDB = async (pathdb,key,value) => {
const pathJson = `${pathdb}`
const readJson = fs.readFileSync(pathJson).toString()
  var objJson = JSON.parse(readJson);
  var objBaru = await objekDB(key,value);
  const objMerger = Object.assign(objJson, objBaru);
  const newstr = JSON.stringify(objMerger,null,1)
  await fs.writeFileSync(pathJson,newstr)
}

//Hapus Key dan Value DB dengan Keydb
const delkeyDB = async (pathdb,keydb) => {
const pathJson = `${pathdb}`
const readJson = await fs.readFileSync(pathJson).toString()
var dat = JSON.parse(readJson)
delete dat[keydb]
//console.log(dat)
const strdat = JSON.stringify(dat,null,1)
await fs.writeFileSync(pathdb,strdat)
}

//Ambil Data Value pada DB dengan Key
const getvalueDB = async (pathdb,key) =>{
  const readJson = fs.readFileSync(pathdb).toString()
  var objJson = JSON.parse(readJson);
  var hasil = objJson[`${key}`]||0
  return hasil
}

module.exports = {addkeyDB,delkeyDB,getvalueDB}
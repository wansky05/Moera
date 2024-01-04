const fs = require('fs');
const lagiapa = async () => {
const aksiread = await fs.readFileSync('./media/aksi.json').toString();
const arraksi = JSON.parse(aksiread);
const temannyaread = await fs.readFileSync('./media/temannya.json').toString();
const arrtemannya = JSON.parse(temannyaread);
const lokasiread = await fs.readFileSync('./media/lokasi.json').toString();
const arrlokasi = JSON.parse(lokasiread);

const aksi = arraksi[Math.floor(Math.random() * arraksi.length)];
const temannya = arrtemannya[Math.floor(Math.random() * arrtemannya.length)];
const lokasi = arrlokasi[Math.floor(Math.random() * arrlokasi.length)];

const result = `lagi ${aksi} bareng ${temannya} di ${lokasi}`;

return result
}
module.exports = {lagiapa}
const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");

//Loader Font
GlobalFonts.registerFromPath("./canva/Hashiba.ttf", "Hashiba")

const filebawaan = {
    background: "https://s6.imgcdn.dev/ZqH2S.png",
    shadow: "https://s6.imgcdn.dev/Zqmpi.png",
    gradient: "https://s6.imgcdn.dev/ZqFsH.png"
}
const welcomeCard = async(nama,judul,pesan,pp) => {
const canvasWidth = 1280; //Lebar Kanvas
const canvasHeight = 720; //Tinggi Kanvas
const centerX = canvasWidth / 2; //Posisi Tengah X
const centerY = canvasHeight / 2;//Posisi Tengah Y

const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext("2d");

// Latar Belakang
await loadImage("./canva/background.jpg").then(async (image) => {
const scale = Math.max(canvasWidth / image.width, canvasHeight / image.height);

const imageWidth = image.width * scale;
const imageHeight = image.height * scale;
const imageX = (canvasWidth - imageWidth) / 2;
const imageY = (canvasHeight - imageHeight) / 2;

ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight); //Latar Belakang ditambahkan
/*
// ADD GRADIENT EFFECT
await loadImage(filebawaan.gradient).then((image) => {
ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
})
/*
const svgString = `<svg width="1280" height="538" viewBox="0 0 1280 538" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H1280V229.5C1280 399.88 1141.88 538 971.5 538H308.5C138.12 538 0 399.88 0 229.5V0Z" fill="#${this.color}" fill-opacity="0.2" />
  </svg>`;

// Create a data URI from the SVG string
const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;

await loadImage(dataUri).then((image) => {
ctx.drawImage(image, 0, 0, 1280, 538);
})*/
});

// NAMA PushName
ctx.fillStyle = "#00ff00"
ctx.font = `120px Hashiba`
ctx.textAlign = 'right';
ctx.fillText(nama, centerX+380, 320)

const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
gradient.addColorStop(0, '#ffffff');
gradient.addColorStop(0.5, '#ffffff');
gradient.addColorStop(1, '#ffff00');

ctx.fillStyle = '#ffff00'//opsi bisa pake const gradient
ctx.font = `75px Hashiba`
ctx.textAlign = 'right';
ctx.fillText(judul, centerX+380, centerY + 60)

ctx.fillStyle = gradient//'#ffff00'//opsi bisa pake const gradient
ctx.font = `70px Hashiba`
ctx.textAlign = 'right';
ctx.fillText(pesan, centerX+380, centerY +160);

/*/ SHADOW OF AVATAR (FIRST)
await loadImage(filebawaan.shadow).then((image) => {
ctx.drawImage(image, 0, 165, 480,480 );
});*/
// AVATAR OF USER
await loadImage(pp).then((image) => {
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 50
ctx.shadowOffsetY = 160

ctx.beginPath();
ctx.arc(200+130, 220+130, 130, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();

ctx.drawImage(image, 200, 220, 260, 260);
})
 return canvas.toBuffer("image/png");
}

module.exports = { welcomeCard }
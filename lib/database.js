/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

const fs = require ('fs');
const { join, dirname } = require("path");
const { fileURLToPath } = require("url");

const dirr = "./database"
const file = {
    botconfig: join(dirr, "botconfig.json"),
    grupconfig: join(dirr, "grupconfig.json"),
    catatan: join(dirr, "catatan.json")
}

try {
    fs.accessSync(file.botconfig);
} catch (err) {
    if (String(err).includes("no such file or directory")) {
        fs.writeFileSync('./database/botconfig.json', JSON.stringify({}, null, 2));
    }
}

try {
    fs.accessSync(file.grupconfig);
} catch (err) {
    if (String(err).includes("no such file or directory")) {
        fs.writeFileSync('./database/grupconfig.json', JSON.stringify({}, null, 2));
    }
}

try {
    fs.accessSync(file.catatan);
} catch (err) {
    if (String(err).includes("no such file or directory")) {
        fs.writeFileSync('./database/catatan.json', JSON.stringify({}, null, 2));
    }
}

global.db = {
    botconfig: JSON.parse(fs.readFileSync(file.botconfig)),
    grupconfig: JSON.parse(fs.readFileSync(file.grupconfig)),
    catatan: JSON.parse(fs.readFileSync(file.catatan))
};

if (!db.botconfig.authorName) {db.botconfig.authorName = "Iwan"}
if (!db.botconfig.isPublic) {db.botconfig.isPublic = false}
if (!db.botconfig.botName) {db.botconfig.botName = "Moera"}
if(!db.grupconfig.antitoxic){
     db.grupconfig.antitoxic=[]
   }
if(!db.grupconfig.antilink){
     db.grupconfig.antilink=[]
   }
if(!db.grupconfig.hapuslink){
     db.grupconfig.hapuslink=[]
   }


setInterval(() => {
    fs.writeFileSync(file.botconfig, JSON.stringify(db.botconfig, null, 2));
    fs.writeFileSync(file.grupconfig, JSON.stringify(db.grupconfig, null, 2));
    fs.writeFileSync(file.catatan, JSON.stringify(db.catatan, null, 2));
}, 900);

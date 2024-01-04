const ArrayToxic = ["ajg", "ajk", "anjng", "anjnk", "anjing", "bajingan", "bangsat", "bangsad", "kontoll", "kontol", "memek", "memeq", "pepek", "pepeq", "meki", "titit", "titid", "peler", "tetek", "toket", "ngewe", "ewe", "pussy", "goblok", "tolol", "idiot", "kentot", "ngentot", "ngentod", "kentod", "jembut", "bego", "dajal", "dajjal", "jnck", "janck", "jancuk", "jancok", "pantek", "puki", "pukimak", "kimak", "kampang", "lonte", "coli", "colmek", "pelacur", "hencet", "nigga", "fuck", "dick", "bitch", "tits", "bastard", "asshole", "asu", "asw", "tai", "kampret", "ngelonte", "tempik", "ass", "babi", "babii", "anying", "anyink", "mmk", "ngntd", "kntl", "pukimai", "cuki", "henceut", "cukimai", "silit", "Slentod", "Bagong", "slemek", "srontol", "entod", "entot", "kintil", "cok", "kontil", "bokep", "bukip", "ngtd", "bbi", "telaso", "anjwing", "pler", "kwontol", "seremek", "serontol", "tlol", "eek", "bool", "kuntul", "ngentwot", "tayi", "memwek", "tytyd", "anjg"];

const cekToxic = (string) => {
const words = string.toLowerCase().split(' ');
for (let i = 0; i < words.length; i++){
if(ArrayToxic.includes(words[i])){
return true;
}
}
return false;
}

module.exports = {cekToxic}
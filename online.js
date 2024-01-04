const chalk = require('chalk')
const path = require("path");
const express = require("express");
const app = express()
var http = require('http').Server(app);
const port = 7000
const browserpath = path.join(__dirname, "");

app.use(express.static(browserpath));

http.listen(port, function(){
               console.log(chalk.black(chalk.bgGreen(`Server Berjalan di Port : ${port}`)));
});

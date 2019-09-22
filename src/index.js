//console.log("index");
const homepage = require("./homepage.js");
const itempage = require("./itempage.js");

window.addEventListener("load", ()=>{
    homepage.setup();
    itempage.setup();
})
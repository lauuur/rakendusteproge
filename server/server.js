const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const apiRouter = require("./apiRouter.js");
const DB = require("./database.js");
const Item = require("./item.model.js");
const bodyParser = require("body-parser");

/** Development environment. In Heroku we don't use .env file */
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

app.use(bodyParser.json());
app.use(apiRouter);

/** For images and bundle.js */
app.use("/static", express.static("dist/static"));

/** For index.html */
app.use("/*", express.static("dist"));

function listen(){
  app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http://localhost:${PORT}`);
  });
}

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-owqqw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URL).then(() =>{
  console.log("DB access success");
  // deleteAllItems();
  migrate();
  listen();
})
.catch( err=>{
  console.error("error ", err);
});

function migrate(){
  Item.count({}, (err, countNr) =>{
    if(err){
      throw err;
    }
    if(countNr > 0){
      console.log("items already present, dont save");
      return;
    }
    saveAllItems();
  });
}

function deleteAllItems(){
  Item.deleteMany({}, (err, doc) =>{
    console.log("err:", err, "doc:", doc);
  });
}

function saveAllItems(){
  console.log("migrate start");
  const items = DB.getItems();
  items.forEach(item =>{
    const document = new Item(item);
    document.save(( err) =>{
      if(err){
        console.log(err);
        throw new Error("Error during save");
      }
      console.log("migrate save success");
    });
  });
  console.log("items: ", items);
}

 
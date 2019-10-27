const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");

//delete item
router.delete("/items/:itemId", (req, res) =>{
    Item.deleteOne({"_id" : mongoose.Types.ObjectId(req.params.itemId)}, (err) =>{
        if(err){
            return res.send(500);
        }
        console.log("delete successful");
        return res.send(204);
    });
});

// new item
router.post("/items", (req, res) =>{
    const props = {
        imgSrc: "asd.ee",
        title: "iphone",
        price: 100,
        category: "phones",
    };
    const item1 = new Item(props);
    item1.save(err =>{
        if(err){
            console.log("error: ", err);
            res.send(500);
            return;
        }
        console.log("item create success");
        res.send(201);
    });
});

//return item
router.get("/items", (req, res)=>{
    Item.find({}, function(err, items){
        if(err){
            console.log("error: ", err);
            res.status(500).send(err);
            return;
        }
        res.send(items);
    });
});

//find item
router.get("/items/:itemId", (req, res)=>{
    Item.findById(req.params.itemId, function (err,item){
        if(err){
            console.log("error: ", err);
            res.status(500).send(err);
        }
        res.send(item);
    });
});

module.exports = router;
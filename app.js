//jshint esversion:6
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const date = require(__dirname + "/date.js");
const _ = require('lodash');
var currentDay = date.getDate();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});

const itemsSchema = {
    name: String
};
const Item = mongoose.model('Item', itemsSchema);

const paramSchema = {
    name: String,
    items: [itemsSchema]
};
const Param = mongoose.model("Param", paramSchema);


const item1 = new Item({
    name: 'Welcome to your Todolist'
});

const item2 = new Item({
    name: 'press + button to Add item'
});

const item3 = new Item({
    name: 'tick mark to Delete'
});
const defaultItems = [item1, item2, item3];

app.get("/", function(req, res){
  Item.find({}, function(err, foundItems){
      if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
            if(err){
             console.log(err);
            }else{
             console.log('succesfully Updated');
            }
         });
         res.redirect("/");
       }else{
            res.render('list', {listTitle: currentDay, listOfItem: foundItems});
       };
    });
});

app.post("/", function(req, res){
    const newItem = req.body.additem;
    const listTitle = req.body.list;

    const item = new Item({
        name: newItem
    });

    if(listTitle === currentDay){
        item.save();
        res.redirect("/");
    }else{
        Param.findOne({name: listTitle}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listTitle);
        }) 
    }
 });

app.post("/delete", function(req, res){
    const checkedId = req.body.checked;
    const listName = req.body.listName;
    if(listName === currentDay){
        Item.findByIdAndRemove(checkedId, function(err){
            if(!err){
                console.log("Succesfully Deleted the item.");
            }else{
                console.log(err);
            }
         })
         res.redirect("/");
    }else{
        Param.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedId}}}, function(err){
            if(!err){
               res.redirect('/' + listName);
            }
        })
    }
    
});

app.get("/:customParameter", function(req, res){
    const customListName =_.capitalize(req.params.customParameter);

    Param.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                const param = new Param({
                    name: customListName,
                    items: defaultItems
                });
                param.save();
                res.redirect('/' + customListName);
            }else{
               res.render('list', {listTitle: foundList.name, listOfItem: foundList.items})
            }
        }
    });
});







app.get("/work", function(req, res){
    res.render('list', {listTitle: "Work List", listOfItem: worklist});
});

app.get("/about", function(req, res){
   res.render("about")
});

app.listen(3000, function(){
    console.log("server is started at 3000");
});


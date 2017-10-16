var express = require('express');
var app = express();
var itemRouter = express.Router();
var Item = require('../models/Item')

itemRouter.route('/').get(function (req, res) {
    Item.find(function (err, itms) {
        if (err){
            console.log(err);;
        }else{
            res.render('items', {item: itms})
        }
    })
});

itemRouter.route('/single').get(function (req, res) {
    res.render('singleItem');
});

itemRouter.route('/add').get(function (req, res) {
    res.render('addItem');
});

itemRouter.route('/add/post').post(function (req, res) {
    var item = new Item(req.body);
    item.save().then(function (item) {
        res.redirect('/');
    }).catch(function (err) {
        res.status(400).send("unable to save to database");
    });
});

module.exports = itemRouter;

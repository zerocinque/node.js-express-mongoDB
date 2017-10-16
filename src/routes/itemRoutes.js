var express = require('express');
var app = express();
var itemRouter = express.Router();
var Item = require('../models/Item');

itemRouter.route('/').get(function (req, res) {
    Item.find(function (err, itms) {
        if (err){
            console.log(err);
        }else{
            res.render('items', {itms: itms})
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
        res.redirect('/items');
    }).catch(function (err) {
        res.status(400).send("unable to save to database");
    });
});

itemRouter.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    Item.findById(id, function (err, item){
        res.render('editItem', {item: item});
    });
});

itemRouter.route('/update/:id').post(function(req, res){
    var id = req.params.id;
    Item.findById(id, function (err, item) {
        if(!item){
            return next(new Error('Could not load Document'));
        }else{
            item.item = req.body.item;
            item.save().then(function (item) {
                res.redirect('/items');
            }).catch(function (err) {
                res.status(400).send("unable to update the database");
            });
        }
    });
});itemRouter.route('/delete/:id').get(function (req, res) {
    Item.findByIdAndRemove( {_id: req.params.id}, function (err, item) {
        if (err)
            res.json(err);
        else
            res.redirect('/items');
    })
})

module.exports = itemRouter;

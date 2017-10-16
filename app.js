var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/tutorial_db').then(function() {
    console.log('connected');
}).catch (function(err){
    console.error('App starting error:', err.stack);
    process.exit(1);
});

var itemRouter = require('./src/routes/itemRoutes');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/items', itemRouter);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Server is running on port:', port);
});

app.get('/', function (req, res) {
    res.render('index');
});
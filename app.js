var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/tutorial_db', {useMongoClient: true}).then(function() {
    console.log('connected');
}).catch (function(err){
    console.error('App starting error:', err.stack);
    process.exit(1);
});

// Required application specific custom router module
var itemRouter = require('./src/routes/itemRoutes');

// Use middlewares to set view engine and post json data to the server
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', itemRouter);

// Define home route
app.get('/', function (req, res) {
    res.render('index');
});

// Start the server
app.listen(port, function () {
    console.log('Server is running on port:', port);
});

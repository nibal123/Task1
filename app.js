var routerr = require("./router/router")
var express = require('express');
var userRepo = require('./Repo/UserRepo')
var app = express();
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var path = require('path');

// TODO
// 1- Database.js
// 2- .env host,user,password
// 3- controller , route
// UserRepository


app.use('/users', routerr)
app.use(express.static('public'));
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});
var server = app.listen(process.env.PORT, function () {
    var host = server.address().address
    var port = process.env.PORT
    console.log("App listening at http://%s:%s", host, port)
})
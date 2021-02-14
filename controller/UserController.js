var express = require('express');
var userRepo = require('../Repo/UserRepo')
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var path = require('path');

exports.getAllUsers = function (req, res) {
    userRepo.getAllUsers(req, res).then(value=>{
        res.send(value)
    });

}
exports.getUser = function (req, res) {
    userRepo.getUser(req, res).then(value=>{
        res.send(value)
    })

}
exports.addUser = function (req, res) {
    userRepo.addUser(req, res);

}
exports.updateUser = function (req, res) {
    userRepo.updateUser(req, res);

}
exports.deleteUser = function (req, res) {
    userRepo.deleteUser(req, res);

}
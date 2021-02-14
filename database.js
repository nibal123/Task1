var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,

});

exports.con = con;
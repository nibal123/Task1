var mysql = require('mysql');
var express = require('express');

var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var path = require('path');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"task1",

});
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//
//     var sql = "INSERT INTO users (name, address) VALUES ('nibal', 'aaaa')";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Inserted");
//     });
// });
app.get('/users/', function (req, res) {
    var sql = "Select * from users";
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        res.send(result);
        console.log(result);

    });
})
app.get('/users/:id', function (req, res) {

    console.log(req.params.id);
    var id=req.params.id;
    var sql = "Select * from users u where u.id="+id;
    con.query(sql, function (err, result,fields) {
        if (err) throw err;

        if(result.length!=0){
            res.send(result);

            console.log(result);}
else {        res.send("not found");

            console.log("not found");
        }    });
})
app.post ('/users/', function (req, res) {

    let name = req.body.name;
    let address = req.body.address;
    console.log(name)
    var sql = "Insert into users (name, address) values ('"+name+"','"+address+"')";
    //var values=[name.toString(),address.toString()];
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        console.log("Inserted");
        res.send("inserted");


    });
})
 app.put('/users/:id', function (req, res) {
   var id=req.params.id;

     let name = req.body.name;
     let address = req.body.address
     var sql = "Select * from users u where u.id="+id;
     con.query(sql, function (err, result,fields) {
         if (err) throw err;

         if(result.length!=0){

             console.log(result);
             var sql1 = "UPDATE users  set name='"+name+"' ,address='"+address+"' where id="+id;
             //var values=[name.toString(),address.toString()];
             con.query(sql1     , function (err, result,fields) {
                 if (err) throw err;
                 console.log("Updated");
                 res.send("updated");


             });

         }

         else{
             console.log("not found");
             res.send("not found");

         }
     });



})

app.delete('/users/:id', function (req, res) {
    var id=req.params.id;
    var sql = "Select * from users u where u.id="+id;
    con.query(sql, function (err, result,fields) {
        if (err) throw err;

        if(result.length!=0){

            console.log(result);
            var sql1 = "DELETE FROM users where id="+id;
            //var values=[name.toString(),address.toString()];
            con.query(sql1, function (err, result,fields) {
                if (err) throw err;
                console.log("Deleted");
                res.send("Deleted");


            });

        }

        else{
            res.send("not found");

            console.log("not found");}
    });


})

app.use(express.static('public'));
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})
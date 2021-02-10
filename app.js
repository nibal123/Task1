var mysql = require('mysql');
var express = require('express');
var app = express();


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
app.get('/listusers', function (req, res) {
    var sql = "Select * from users";
    con.query(sql, function (err, result,fields) {
        if (err) throw err;

        console.log(result);

    });
})
app.get('/listusers/:id', function (req, res) {

    console.log(req.params.id);
    var id=req.params.id;
    var sql = "Select * from users u where u.id="+id;
    con.query(sql, function (err, result,fields) {
        if (err) throw err;

        if(result.length!=0)
            console.log(result);
else
    console.log("not found");
    });
})
app.get ('/adduser', function (req, res) {
    let name = req.query.name;
    let address = req.query.address;
    console.log(name)
    var sql = "Insert into users (name, address) values ("+name+","+address+")";
    //var values=[name.toString(),address.toString()];
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        console.log("Inserted");

    });
})
 app.get('/updateuser/:id', function (req, res) {
   var id=req.params.id;
    let name = req.query.name;
    let address = req.query.address;
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

             });

         }

         else
             console.log("not found");
     });



})

app.get('/deleteuser/:id', function (req, res) {
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

            });

        }

        else
            console.log("not found");
    });


})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})
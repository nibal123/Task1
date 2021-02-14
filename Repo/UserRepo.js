var con = require("../database").con
const util = require('util');

exports.getAllUsers = async function (req, res) {
    var sql = "Select * from users";
    const query = util.promisify(con.query).bind(con);

    resultt = await query(sql);
    if (resultt.length != 0) {
        console.log(resultt);
    } else {
        console.log("not found");
        resultt= "not found";
    }
    return resultt

}

exports.getUser = async function (req,res) {
    var id = req.params.id;
    var sql = "Select * from users u where u.id=" + id;
    var resultt;
    const query = util.promisify(con.query).bind(con);

    resultt = await query(sql);
    if (resultt.length != 0) {
        console.log(resultt);
    } else {
        console.log("not found");
        resultt= "not found";
    }
    return resultt
}
exports.addUser = function (req, res) {

    let name = req.body.name.toString();
    let address = req.body.address.toString();
    console.log(name)
    var sql = "Insert into users (name, address) values ('" + name + "','" + address + "')";
    //var values=[name.toString(),address.toString()];
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log("Inserted");
        res.send(result.insertId + " ")
        res.end()


    });
}


exports.updateUser = function (req, res) {
    console.log("Updatedddddddddd");
    var id = req.params.id;

    let name = req.body.name;
    let address = req.body.address
    var sql = "Select * from users u where u.id=" + id;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;

        if (result.length != 0) {
            console.log(result);
            var sql1 = "UPDATE users  set name='" + name + "' ,address='" + address + "' where id=" + id;
            //var values=[name.toString(),address.toString()];
            con.query(sql1, function (err, result, fields) {
                if (err) throw err;
                console.log("Updated");
                res.send("updated");

            });

        } else {
            console.log("not found");
            res.send("not found");

        }
    });


}
exports.deleteUser = function (req, res) {
    console.log("deleteeee " + req.params)
    var id = req.params.id;
    var sql = "Select * from users u where u.id=" + id;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;

        if (result.length != 0) {

            console.log(result);
            var sql1 = "DELETE FROM users where id=" + id;
            //var values=[name.toString(),address.toString()];
            con.query(sql1, function (err, result, fields) {
                if (err) throw err;
                console.log("Deleted");
                res.send("Deleted");


            });

        } else {
            res.send("not found");

            console.log("not found");
        }
    });


}

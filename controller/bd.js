var express = require('express');
var mysql = require('mysql');
var app = express();

//var con = mysql.createPool({
var con = mysql.createConnection({
    host: "help@193.136.11.169",
    user: "helpme",
    password: "pegadahelp!.2020"
});

console.log("Connecting...");
con.connect(function(error){
	if(!!error){
		console.log('Error');
	}else{
		console.log('Connected!');
	}
})
/*
app.get('/', function(req, resp){
	connection.query("SELECT * FROM helpme", function(error,rows,fields)
	if(!!error){
		console.log('Error in the query');
	}else {
		console.log('hip hip uhray');
	})
})*/
app.listen(1337);

/*
con.getConnection(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    con
};
*/
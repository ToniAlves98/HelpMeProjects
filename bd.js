var express = require('express');
var mysql = require('mysql');
var app = express();

var con = mysql.createPool({
//var con = mysql.createConnection({
    host: '193.136.11.169',
	user: 'pintas',
	password : 'Pegadahelp!.2020', 
	database : 'ptsi_bd',
});

console.log("Connecting...");

con.getConnection(function (err) {
//con.connect(function(err){
	if(err) throw err;
		console.log('Connected!');
});

module.exports.con = con;
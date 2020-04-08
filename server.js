var connect = require('connect');
var model = require('./bd.js');
const express = require('express')
const server = express()
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/views/forum')).listen(8080, function(){
    console.log('Server running on 8080...');
});
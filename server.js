/*var connect = require('connect');
var model = require('./bd.js');
const express = require('express')
const server = express()
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/views/forum')).listen(8080, function(){
    console.log('Server running on 8080...');
}); */


global.express = require('express')
var port = 8080;

//carregar bibliotecas globais
global.http = require('http');
global.fs = require('fs');
global.bodyParser = require('body-parser');
global.crypto = require('crypto'),


//iniciar a aplicação
global.helpme = global.express();
global.helpme.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
global.helpme.use(global.bodyParser.json(), global.bodyParser.urlencoded({ extended: true }));

//definir rotas estáticas para ficheiros
global.helpme.use('/controller', global.express.static('controller'));
global.helpme.use('/forum', global.express.static('views/forum'));
global.helpme.use('/admin', global.express.static('views/admin'));
global.root = __dirname;

//carregar ficheiros MVC
global.connect = require('./bd.js');
//global.routesColaborador = require('./controller/rotas.js');
global.modelRegisto = require('./model/model_utilizador');
global.routeRegisto = require('./controller/registo_route.js');

//ROTAS
//rota forum
global.helpme.get('/forum', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/forum', global.express.static('views/forum'));
    res.sendfile(global.root + '/views/forum/' + 'index.html');
});

//rota admin
global.helpme.get('/admin', function (req, res) {
    global.helpme.use(global.express.static('views/admin'));
    global.helpme.use('/admin', global.express.static('views/admin'));
    res.sendfile(global.root + '/views/admin/' + 'index.html');
});


global.helpme.listen(port);
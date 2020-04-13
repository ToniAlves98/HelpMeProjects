global.express = require('express')
var port = 8080;

//carregar bibliotecas globais
global.http = require('http');
global.fs = require('fs');
global.bodyParser = require('body-parser');
global.expressValidator = require('express-validator');
global.crypto = require('crypto');


//iniciar a aplicacao
global.helpme = global.express();
global.helpme.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
global.helpme.use(global.bodyParser.json(), global.bodyParser.urlencoded({ extended: true }));
//global.helpme.user(global.expressValidator());

//definir rotas estáticas para ficheiros
global.helpme.use('/controller', global.express.static('controller'));
global.helpme.use('/forum', global.express.static('views/forum'));
global.helpme.use('/admin', global.express.static('views/admin'));
global.root = __dirname;

//carregar ficheiros MVC
global.connect = require('./bd.js');
global.model_eventos = require('./model/model_eventos');
global.model_relatorios = require('./model/model_relatorios');
global.model_utilizador = require('./model/model_utilizador');
global.model_perguntas = require('./model/model_perguntas');
global.model_respostas = require('./model/model_respostas');
global.admin_route = require('./controller/admin_route.js');
global.forum_route = require('./controller/forum_route.js');

//ROTAS
//rota forum
global.helpme.get('/forum', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/forum', global.express.static('views/forum'));
    res.sendfile(global.root + '/views/forum/' + 'index.html');
});


global.helpme.listen(port);
global.express = require('express');
var port = 8080;

//carregar bibliotecas globais
global.http = require('http');
global.fs = require('fs');
global.bodyParser = require('body-parser');
global.expressValidator = require('express-validator');
global.crypto = require('crypto');
global.session = require('express-session');
global.cookieParser = require('cookie-parser');
global.path = require('path');
global.flash = require('connect-flash');
global.upload = require('express-fileupload');
global.async = require('async');
global.nodemailer = require('nodemailer');
global.mergeJSON = require("merge-json") ;

//iniciar a aplicacao
global.helpme = global.express();
global.helpme.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//global.helpme.use(global.bodyParser.json(), global.bodyParser.urlencoded({ extended: true }));
global.helpme.use(bodyParser.urlencoded({extended : false}));
global.helpme.use(bodyParser.json());
//global.helpme.use(global.expressValidator());
global.helpme.use(cookieParser());
global.helpme.use(global.session({
    secret: 'grupo 23',
    resave: false,
    saveUninitialized: true,
    //saveUninitialized: false,
    cookie: { secure: true }
}));
global.helpme.use(flash());
global.helpme.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.erros_msg = req.flash("error_msg")
    next()
});

//definir rotas estáticas para ficheiros
global.helpme.use(upload())
global.helpme.use('/controller', global.express.static('controller'));
global.helpme.use('/admin', global.express.static('views/admin'));
global.helpme.use('/uploads', global.express.static('uploads'));
global.helpme.use('/', global.express.static('views/forum'));
global.root = __dirname;

//carregar ficheiros MVC
global.connect = require('./bd.js');
//global.routes = require('./routes.js');
global.model_eventos = require('./model/model_eventos');
global.model_relatorios = require('./model/model_relatorios');
global.model_utilizador = require('./model/model_utilizador');
global.model_perguntas = require('./model/model_perguntas');
global.model_respostas = require('./model/model_respostas');
global.model_pedidos = require('./model/model_pedidos');
global.model_eventos_forum = require('./model/model_eventos_forum');
global.model_relatorios_forum = require('./model/model_relatorios_forum');
global.model_dashboards = require('./model/model_dashboards');
global.model_sugestoes = require('./model/model_sugestoes');
global.admin_route = require('./controller/admin_route.js');
global.forum_route = require('./controller/forum_route.js');

//route protection
const redirectLogin = (req, res, next) =>{
    console.log('redirect');
    if (req.cookies.idUser == null || req.cookies.idUser == 0){
        res.redirect('/notFound');
    }else{
        next();
    }
}

//Teste session
global.helpme.get('/notFound', (req, res) => {
    res.send('<h1>Pedimos desculpa mas não tem acesso a esta parte da plataforma sem login e/ou resgito.</h1><a href="/">Voltar</a>')
});

global.helpme.get('/inicial',redirectLogin, function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/inicial', global.express.static('views/forum'));
    res.sendFile(global.root + '/views/forum/' + 'inicial.html');
});

global.helpme.get('/inicial_en', redirectLogin, function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/inicial_en', global.express.static('views/forum'));
    res.sendFile(global.root + '/views/forum/' + 'inicial_en.html');
});

global.helpme.get('/admin', redirectLogin, function (req, res) {
    global.helpme.use(global.express.static('views/admin'));
    global.helpme.use('/admin', global.express.static('views/admin'));
    res.sendFile(global.root + '/views/admin/' + 'index.html');
});

//rota inicio
global.helpme.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/forum/index.html'));
});

global.helpme.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

global.helpme.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('We\'re sorry, something went wrong, do you want to go back? http://localhost:8080/');
});

global.helpme.listen(port);
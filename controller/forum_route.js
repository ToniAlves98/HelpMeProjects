//rotas get
global.helpme.get('/readPerguntas', function (req, res) {
    global.model_perguntas.readPerguntas(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/getPergunta', function (req, res) {
    global.model_perguntas.getPergunta(req.body.idPergunta, function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/getResposta', function (req, res) {
    global.model_perguntas.getResposta(req.body.idPergunta, function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/savePergunta', function (req, res) {
    global.model_perguntas.savePergunta(req.body.titulo_pergunta, req.body.pergunta, req.body.data_pergunta, req.body.lingua, req.body.num_likes, req.body.AreaConhecimento_idAreaConhecimento, req.body.Utilizador_idUtilizador);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/saveResposta', function (req, res) {
    global.model_respostas.saveResposta(req.body.resposta);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/saveLikes', function (req, res) {
    global.model_perguntas.saveLikes(req.body.num_likes);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.get('/readRespostas', function (req, res) {
    global.model_respostas.readRespostas(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

//rota de gravação
global.helpme.post('/login', function (req, res) {
    //chamada da função save que está no user.model e envio dos parâmetros
    global.model_utilizador.login(req.body.email, req.body.password, function (err, data) {

        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Login realizado com sucesso", "status" : 200}');
        }
    });
});

//rota forum
global.helpme.get('/forum', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/forum', global.express.static('views/forum'));
    res.sendfile(global.root + '/views/forum/' + 'forum.html');
});

global.helpme.get('/index_en', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/index_en', global.express.static('views/forum'));
    res.sendfile(global.root + '/views/forum/' + 'index_en.html');
});

global.helpme.get('/perfil', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/perfil', global.express.static('views/forum'));
    res.sendfile(global.root + '/views/forum/pages/' + 'perfil.html');
});
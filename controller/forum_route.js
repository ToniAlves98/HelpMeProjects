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

global.helpme.post('/savePergunta', function (req, res) {
    global.model_perguntas.savePergunta(req.body.titulo_pergunta, req.body.pergunta, req.body.data_pergunta, req.body.lingua, req.body.num_likes, req.body.AreaConhecimento_idAreaConhecimento, req.body.Utilizador_idUtilizador);
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

//rota admin
global.helpme.get('/forum', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/forum', global.express.static('views/forum'));
    res.sendfile(global.root + '/views/forum/' + 'forum.html');
});
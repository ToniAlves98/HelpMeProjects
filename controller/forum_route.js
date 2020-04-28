//rotas get
global.helpme.get('/readPerguntas', function(req, res) {
    global.model_perguntas.readPerguntas(function(err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/readRespostas', function(req, res) {
    global.model_respostas.readRespostas(function(err, data) {
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
global.helpme.post('/login', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    //chamada da função save que está no user.model e envio dos parâmetros
    global.model_utilizador.login(req.body.email, req.body.password)
    res.end('{"success" : "Login realizado com sucesso", "status" : 200}');
});

global.helpme.post('/readPerguntas', function (req, res) {
    global.model_perguntas.readPerguntas(req.body.lingua,function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/getNumPerguntas', function (req, res) {
    global.model_perguntas.getNumPerguntas(req.body.lingua,function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/readRelatoriosForum', function (req, res) {
    global.model_relatorios_forum.readRelatoriosForum(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/seeAreaRel', function (req, res) {
    global.model_relatorios_forum.seeAreaRel(req.body.idArea, function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/readEventosForum', function (req, res) {
    global.model_eventos_forum.readEventosForum(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/getEventoInfo', function (req, res) {
    global.model_eventos_forum.getEventoInfo(req.body.idEvento, function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/getEventoArea', function (req, res) {
    global.model_eventos_forum.getEventoArea(req.body.idArea, function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/getEventoTipo', function (req, res) {
    global.model_eventos_forum.getEventoTipo(req.body.tipoEvento, function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/readPerguntasPorArea', function (req, res) {
    global.model_perguntas.readPerguntasPorArea(req.body.lingua, req.body.AreaConhecimento_idAreaConhecimento, function (err, data) {
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
    if (req.body.titulo_pergunta == "" || req.body.AreaConhecimento_idAreaConhecimento == null || req.body.pergunta == "") {
        res.end('{"success" : "Preencha todos os campos", "status" : 202}');
    }
    else {
        global.model_perguntas.savePergunta(req.body.titulo_pergunta, req.body.pergunta, req.body.data_pergunta, req.body.lingua, req.body.num_likes, req.body.AreaConhecimento_idAreaConhecimento);
        if (global.session.idUser != null) {
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
        else {
            res.end('{"success" : "Updated Successfully", "status" : 201}');
        }
    }
});

global.helpme.post('/saveResposta', function (req, res) {
    global.model_respostas.saveResposta(req.body.resposta, function (err, data){
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/saveLikes', function (req, res) {
    global.model_perguntas.saveLikes(req.body.num_likes, function (err, data){
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/saveLikesResp', function (req, res) {
    global.model_perguntas.saveLikesResp(req.body.num_likes, function (err, data){
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/getUtilizador', function (req, res) {
    global.model_utilizador.getUtilizador(req.body.idUtilizador, function (err, data){
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
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

global.helpme.post('/login', function (req, res) {
    req.session.idUser =1;
    global.connect.con.query('SELECT email, password FROM utilizador where email ="' + req.body.email + '"and password="' + req.body.password + '"', function (err, rows, fields) {
        console.log(rows)
        if (rows.length == 0) {
            res.end('{"success" : "Login realizado sem sucesso", "status" : 201}');
        }
        else {
            global.model_utilizador.login(req.body.email, req.body.password, function (err, data) {
                console.log(data)
                if (err) {
                    console.log("ERRO", err);
                }
                else {
                    res.end('{"success" : "Login realizado com sucesso", "status" : 200}');
                }
            });

        }
    });
});

global.helpme.get('/logout', function (req, res) {
    req.session.idUser =0;
    global.model_utilizador.logout(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});
/*
global.helpme.get('/inicial', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/inicial', global.express.static('views/forum'));
    res.sendFile(global.root + '/views/forum/' + 'inicial.html');
});

global.helpme.get('/inicial_en', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/inicial_en', global.express.static('views/forum'));
    res.sendFile(global.root + '/views/forum/' + 'inicial_en.html');
});*/

global.helpme.get('/index_en', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/index_en', global.express.static('views/forum'));
    res.sendFile(global.root + '/views/forum/' + 'index_en.html');
});

global.helpme.get('/perfil', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/perfil', global.express.static('views/forum'));
    res.sendFile(global.root + '/views/forum/pages/' + 'perfil.html');
});
//rotas relatorios
global.helpme.get('/readRelatorios', function(req, res) {
    global.model_relatorios.readRelatorios(function(err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/saveRelatorio', function(req, res) {
    /*req.sanitizeBody('nomeRelatorio').escape();
    req.sanitizeBody('pdf').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    */// console.log('body: ' + JSON.stringify(req.body));
    global.model_relatorios.saveRelatorio(req.body.nomeRelatorio, req.body.pdf, req.body.AreaConhecimento_idAreaConhecimento, req.body.AreaConhecimento_idAreaConhecimento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/setRelatorio', function(req, res) {
    /*req.sanitizeBody('nomeRelatorio').escape();
    req.sanitizeBody('pdf').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    */// console.log('body: ' + JSON.stringify(req.body));
    global.model_relatorios.setRelatorio(req.body.nomeRelatorio, req.body.pdf, req.body.AreaConhecimento_idAreaConhecimento, req.body.AreaConhecimento_idAreaConhecimento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/deleteRelatorio', function(req, res) {
    req.sanitizeBody('nomeRelatorio').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_relatorios.deleteRelatorio(req.body.nomeRelatorio);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


//rotas eventos
global.helpme.get('/readEventos', function(req, res) {
    global.model_eventos.readEventos(function(err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/saveEvento', function(req, res) {
   
/* req.sanitizeBody('nomeEvento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('tipoEvento').escape();
    req.sanitizeBody('Utilizador_idUtilizador').escape();
    req.sanitizeBody('data_inicio').escape();
    req.sanitizeBody('data_fim').escape();
  */  // console.log('body: ' + JSON.stringify(req.body));
    global.model_eventos.saveEvento(req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.Utilizador_idUtilizador, req.body.data_inicio, req.body.data_fim, req.body.id_Evento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/setEvento', function(req, res) {
   /* req.sanitizeBody('nomeEvento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('tipoEvento').escape();
    req.sanitizeBody('Utilizador_idUtilizador').escape();
    req.sanitizeBody('data_inicio').escape();
    req.sanitizeBody('data_fim').escape();
    */// console.log('body: ' + JSON.stringify(req.body));
    global.model_eventos.setEvento(req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.Utilizador_idUtilizador, req.body.data_inicio, req.body.data_fim);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/deleteEvento', function(req, res) {
    req.sanitizeBody('nomeEvento').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_eventos.deleteEvento(req.body.nomeEvento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


//rota Gestao utilizadores
//rota de gravação
global.helpme.post('/saveUtilizador', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    global.modelUtilizador.saveUtilziador(req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao, req.body.ramo_emp,
        req.body.num_trabalhadores, req.body.regiao_pais, req.body.area_cientifica, req.body.ciclo_estudo, req.body.perfil);
    res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
});

//rota de leitura
global.helpme.get('/readUtilizador', function (req, res) {
    global.model_utilizador.readUtilizador(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Atuailziado com sucesso", "status" : 200}');
        }
    });
});

//rota admin
global.helpme.get('/admin', function (req, res) {
    global.helpme.use(global.express.static('views/admin'));
    global.helpme.use('/admin', global.express.static('views/admin'));
    res.sendfile(global.root + '/views/admin/' + 'index.html');
});
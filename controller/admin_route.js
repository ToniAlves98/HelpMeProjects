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
    req.sanitizeBody('nomeRelatorio').escape();
    req.sanitizeBody('pdf').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_relatorios.saveRelatorio(req.body.nomeRelatorio, req.body.pdf, req.body.AreaConhecimento_idAreaConhecimento, req.body.AreaConhecimento_idAreaConhecimento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/setRelatorio', function(req, res) {
    req.sanitizeBody('nomeRelatorio').escape();
    req.sanitizeBody('pdf').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    // console.log('body: ' + JSON.stringify(req.body));
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
    req.sanitizeBody('nomeEvento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('tipoEvento').escape();
    req.sanitizeBody('Utilizador_idUtilizador').escape();
    req.sanitizeBody('data_inicio').escape();
    req.sanitizeBody('data_fim').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_eventos.saveRelatorio(req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.Utilizador_idUtilizador, req.body.data_inicio, req.body.data_fim);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/setEvento', function(req, res) {
    req.sanitizeBody('nomeEvento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('tipoEvento').escape();
    req.sanitizeBody('Utilizador_idUtilizador').escape();
    req.sanitizeBody('data_inicio').escape();
    req.sanitizeBody('data_fim').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_eventos.setEvento(req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.Utilizador_idUtilizador, req.body.data_inicio, req.body.data_fim);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/deleteEvento', function(req, res) {
    req.sanitizeBody('nomeEvento').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_eventos.deleteEvento(req.body.nomeEvento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});



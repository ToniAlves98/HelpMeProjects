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
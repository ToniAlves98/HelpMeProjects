//rota inicial
global.helpme.get('/forum', function (req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user 
    var html = global.fs.readFileSync('./views/forum/pages/registo.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});

//rota de gravação
global.helpme.post('/saveUtilizador', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    global.modelRegisto.saveUtilziador(req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao, req.body.ramo_emp,
        req.body.num_trabalhadores, req.body.regiao_pais, req.body.area_cientifica, req.body.ciclo_estudo, req.body.perfil);
    res.end('{"success" : "Atuailziado com sucesso", "status" : 200}');
});

//rota de leitura
global.helpme.get('/readUtilizador', function (req, res) {
    global.modelRegisto.read(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Atuailziado com sucesso", "status" : 200}');
        }
    });
});
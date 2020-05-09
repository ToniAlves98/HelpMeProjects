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
    */ //console.log('body: ' + JSON.stringify(req.body));
    global.model_relatorios.saveRelatorio(req.body.nomeRelatorio, req.body.pdf, req.body.AreaConhecimento_idAreaConhecimento, req.body.AreaConhecimento_idAreaConhecimento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/', (req,res) => {
    if (req.files){
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)
        file.mv('./views/admin/'+ filename, function(err){
            if(err){
                res.send(err)
            } 
        })
    }

})


global.helpme.post('/setRelatorio', function(req, res) {
    /*req.sanitizeBody('nomeRelatorio').escape();
    req.sanitizeBody('pdf').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    req.sanitizeBody('AreaConhecimento_idAreaConhecimento').escape();
    */// console.log('body: ' + JSON.stringify(req.body));
    global.model_relatorios.setRelatorio(req.body.idRelatorio, req.body.nomeRelatorio, req.body.pdf, req.body.AreaConhecimento_idAreaConhecimento, req.body.AreaConhecimento_idAreaConhecimento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.delete('/deleteRelatorio', function(req, res) {
    //req.sanitizeBody('nomeRelatorio').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_relatorios.deleteRelatorio(req.body.idRelatorio);
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
    global.model_eventos.saveEvento(req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.Utilizador_idUtilizador, req.body.data_inicio, req.body.data_fim, req.body.idEvento);
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
    global.model_eventos.setEvento(req.body.idEvento, req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.Utilizador_idUtilizador, req.body.data_inicio, req.body.data_fim);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.delete('/deleteEvento', function(req, res) {
    //req.sanitizeBody('nomeEvento').escape();
    // console.log('body: ' + JSON.stringify(req.body));
    global.model_eventos.deleteEvento(req.body.nomeEvento);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


//rota Gestao utilizadores
//rota inicial
global.helpme.get('/utilizador', function (req, res) {
    console.log('GET /');
    //leitura do ficheiro estático - view do user 
    var html = global.fs.readFileSync('./views/admin/pages/utilizador.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(html);
});

//rota de leitura utilizador
global.helpme.get('/readUtilizador', function (req, res) {
    global.model_utilizador.readUtilizador(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Atualizado com sucesso", "status" : 200}');
        }
    });
});

//rota de gravação utilizador
global.helpme.post('/saveUtilizador', function (req, res) {
    
    console.log('body: ' + JSON.stringify(req.body));
    global.model_utilizador.saveUtilizador(req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao,
        req.body.gp_nome_emp, req.body.ramo_emp, req.body.num_trabalhadores, req.body.regiao_pais, req.body.area_cientifica, req.body.ciclo_estudo, req.body.perfil);
    res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
});

//rota de editar utilizador
global.helpme.post('/setUtilizador', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    global.model_utilizador.setUtilizador(req.body.idUtilizador, req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao,
        req.body.gp_nome_emp, req.body.ramo_emp, req.body.num_trabalhadores, req.body.regiao_pais, req.body.area_cientifica, req.body.ciclo_estudo, req.body.perfil);
    res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
});

//rota eliminar utilizador
global.helpme.delete('/deleteUtilizador', function (req, res) {
    global.model_utilizador.deleteUtilizador(req.body.idUtilizador);
    res.end('{"success" : "Utilizador eliminado com sucesso", "status" : 200}');
});

//rota de leitura estudante
global.helpme.get('/readEstudante', function (req, res) {
    global.model_utilizador.readEstudante(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Atuailziado com sucesso", "status" : 200}');
        }
    });
});

//rota de editar estudante
global.helpme.post('/setEstudante', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    global.model_utilizador.setEstudante(req.body.idUtilizador, req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao,
        req.body.area_cientifica, req.body.ciclo_estudo, req.body.perfil);
    res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
});


//rota de leitura empresa
global.helpme.get('/readEmpresa', function (req, res) {
    global.model_utilizador.readEmpresa(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Atuailziado com sucesso", "status" : 200}');
        }
    });
});

//rota de editar empresa
global.helpme.post('/setEmpresa', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    global.model_utilizador.setEmpresa(req.body.idUtilizador, req.body.nome, req.body.profissao, req.body.email, req.body.password, req.body.descricao, req.body.ramo_emp,
        req.body.num_trabalhadores, req.body.regiao_pais);
    res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
});

//rota de leitura gestor
global.helpme.get('/readGestor', function (req, res) {
    global.model_utilizador.readGestor(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Atuailziado com sucesso", "status" : 200}');
        }
    });
});

//rota de editar gestor
global.helpme.post('/setGestor', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    global.model_utilizador.setGestor(req.body.idUtilizador, req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao,
        req.body.gp_nome_emp, req.body.ramo_emp, req.body.num_trabalhadores, req.body.regiao_pais);
    res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
});

//rota admin
global.helpme.get('/admin', function (req, res) {
    global.helpme.use(global.express.static('views/admin'));
    global.helpme.use('/admin', global.express.static('views/admin'));
    res.sendfile(global.root + '/views/admin/' + 'index.html');
});


/*

<script type="text/javascript">
    const realFileBtn = document.getElementById("real-file");
    const customBtn = document.getElementById("custom-button");
    const customTxt = document.getElementById("custom-text");

    customBtn.addEventListener("click", function () {
        realFileBtn.click();
    });

    realFileBtn.addEventListener("change", function () {
        if (realFileBtn.value) {
            customTxt.innerHTML = realFileBtn.value.match(
                /[\/\\]([\w\d\s\.\-\(\)]+)$/
            )[1];
        } else {
            customTxt.innerHTML = "No file chosen, yet.";
        }
    });
</script>

<!--PDF editar relatorio-->
<script type="text/javascript">
    const realFileBtnEditar = document.getElementById("real-file-editar");
    const customBtnEditar = document.getElementById("custom-button-editar");
    const customTxtEditar = document.getElementById("custom-text-editar");

    customBtnEditar.addEventListener("click", function () {
        realFileBtnEditar.click();
    });

    realFileBtnEditar.addEventListener("change", function () {
        if (realFileBtnEditar.value) {
            customTxtEditar.innerHTML = realFileBtnEditar.value.match(
                /[\/\\]([\w\d\s\.\-\(\)]+)$/
            )[1];
        } else {
            customTxtEditar.innerHTML = "No file chosen, yet.";
        }
    });
</script>

*/
//rota admi
global.helpme.get('/admin', function (req, res) {
    global.helpme.use(global.express.static('views/admin'));
    global.helpme.use('/admin', global.express.static('views/admin'));
    res.sendFile(global.root + '/views/admin/' + 'index.html');
});

global.helpme.get('/resetPassword2', function (req, res) {
    global.helpme.use(global.express.static('views/forum'));
    global.helpme.use('/resetPassword2', global.express.static('views/forum'));
    res.sendFile(global.root + '/views/forum/pages/' + 'resetPassword2.html');
});

//rotas relatorios
global.helpme.get('/readRelatorios', function (req, res) {
    global.model_relatorios.readRelatorios(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/saveRelatorio', function (req, res) {
    global.model_relatorios.saveRelatorio(req.body.nomeRelatorio, req.body.pdf, req.body.AreaConhecimento_idAreaConhecimento, req.body.estado);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/', (req, res) => {
    if (req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)
        file.mv('./uploads/' + filename, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/admin/');
            }
        })
    }

})

global.helpme.post('/g', (req, res) => {
    if (req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)
        file.mv('./uploads/' + filename, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/inicial');
            }
        })
    }

})

global.helpme.post('/setRelatorio', function (req, res) {
    global.model_relatorios.setRelatorio(req.body.idRelatorio, req.body.nomeRelatorio, req.body.pdf, req.body.AreaConhecimento_idAreaConhecimento, req.body.Utilizador_idUtilizador);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/deleteRelatorio', function (req, res) {
    global.model_relatorios.deleteRelatorio(req.body.idRelatorio, req.body.estado);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});


//rotas eventos
global.helpme.get('/readEventos', function (req, res) {
    global.model_eventos.readEventos(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/readEventosPendentes', function (req, res) {
    global.model_pedidos.readEventosPendentes(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.post('/saveEvento', function (req, res) {
    global.model_eventos.saveEvento(req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.descricao, req.body.imagem, req.body.data_inicio, req.body.data_fim, req.body.estado);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/savePedido', function (req, res) {
    global.model_pedidos.savePedido(req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.descricao, req.body.imagem, req.body.data_inicio, req.body.data_fim, req.body.estado);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/setEvento', function (req, res) {
    global.model_eventos.setEvento(req.body.idEvento, req.body.nomeEvento, req.body.AreaConhecimento_idAreaConhecimento, req.body.tipoEvento, req.body.descricao, req.body.imagem, req.body.data_inicio, req.body.data_fim);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/aceitar', function (req, res) {
    global.model_pedidos.aceitar(req.body.idEvento, req.body.estado);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/deleteEvento', function (req, res) {
    global.model_eventos.deleteEvento(req.body.idEvento, req.body.estado);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

global.helpme.post('/rejeitar', function (req, res) {
    global.model_pedidos.rejeitar(req.body.idEvento, req.body.estado);
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
        console.log(data);
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
    global.connect.con.query('SELECT email FROM utilizador where email ="' + req.body.email + '"', function (err, rows, fields) {
        console.log(rows)
        if (rows.length == 0) {
            global.model_utilizador.saveUtilizador(req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao,
                req.body.gp_nome_emp, req.body.ramo_emp, req.body.num_trabalhadores, req.body.regiao_pais, req.body.area_cientifica, req.body.ciclo_estudo, req.body.perfil, req.body.estado);
            res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
        }
        else {
            res.end('{"success" : "Email já existe", "status" : 201}');
        }
    });
});

//rota de editar utilizador
global.helpme.post('/setUtilizador', function (req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    global.model_utilizador.setUtilizador(req.body.idUtilizador, req.body.nome, req.body.idade, req.body.genero, req.body.profissao, req.body.email, req.body.password, req.body.descricao,
        req.body.gp_nome_emp, req.body.ramo_emp, req.body.num_trabalhadores, req.body.regiao_pais, req.body.area_cientifica, req.body.ciclo_estudo, req.body.perfil);
    res.end('{"success" : "Utilizador editado com sucesso", "status" : 200}');
});

//rota eliminar utilizador
global.helpme.post('/deleteUtilizador', function (req, res) {
    global.model_utilizador.deleteUtilizador(req.body.idUtilizador, req.body.estado);
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

//rotas sugestões
global.helpme.get('/readSugestoes', function (req, res) {
    global.model_sugestoes.readSugestoes(function (err, data) {
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Atuailziado com sucesso", "status" : 200}');
        }
    });
});

global.helpme.post('/deleteSugestao', function (req, res) {
    global.model_sugestoes.deleteSugestao(req.body.sugestao, req.body.estado);
    res.end('{"success" : "Sugestão eliminado com sucesso", "status" : 200}');
});

global.helpme.post('/saveSugestao', function (req, res) {
    global.model_sugestoes.saveSugestao(req.body.sugestao, req.body.estado);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

//rotas dashboards
global.helpme.get('/countPerguntas', function (req, res) {
    global.model_dashboards.countPerguntas(function (err, data) {
        console.log(data)
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/countUtilizadores', function (req, res) {
    global.model_dashboards.countUtilizadores(function (err, data) {
        console.log(data)
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/countEventos', function (req, res) {
    global.model_dashboards.countEventos(function (err, data) {
        console.log(data)
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/countPedidos', function (req, res) {
    global.model_dashboards.countPedidos(function (err, data) {
        console.log(data)
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/countRelatorios', function (req, res) {
    global.model_dashboards.countRelatorios(function (err, data) {
        console.log(data)
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

global.helpme.get('/countSugestoes', function (req, res) {
    global.model_dashboards.countSugestoes(function (err, data) {
        console.log(data)
        if (err) {
            console.log("ERROR : ", err);
        }
        else {
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});

//rota leitura grafico utilizador
global.helpme.get('/graficoUtilizador', function (req, res) {
    //chamada da função read que está no Speaker.model
    global.model_dashboards.graficoUtilizador(function (err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
});

//rota leitura grafico pergunta por area
global.helpme.get('/graficoPerguntaArea', function (req, res) {
    //chamada da função read que está no Speaker.model
    global.model_dashboards.graficoPerguntaArea(function (err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
});

//rota leitura grafico relatorio por tipo de utilizador
global.helpme.get('/graficoRelatorioUser', function (req, res) {
    //chamada da função read que está no Speaker.model
    global.model_dashboards.graficoRelatorioUser(function (err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
});

//rota leitura utilizador mais ativo
global.helpme.get('/userAtivo', function (req, res) {
    //chamada da função read
    global.model_dashboards.userAtivo(function (err, data) {
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            res.send(data);
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
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

//rota para o mail
global.helpme.post('/forgot', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            global.connect.con.query('SELECT email from utilizador where email="' + req.body.email + '"', function (err, user) {
                if (!user) {
                    req.flash('error', 'Não existe nenhum utilizador com esse e-mail.');
                    return res.redirect('/pages/resetPassword.html');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                global.connect.con.query('UPDATE utilizador SET resetPasswordToken="' + user.resetPasswordToken + '", resetPasswordExpires="' + user.resetPasswordExpires + '"where email="' + req.body.email + '"', function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'helppmeprojects',
                    pass: 'PTSI2020'
                }
            });
            var mailOptions = {
                to: req.body.email,
                from: 'helppmeprojects@gmail.com',
                subject: 'Redefinição de password',
                text: 'Recebeu este e-mail, porque o senhor(a) (ou outra pessoa) solicitou a redefinição da password da sua conta.\n\n' +
                    'Clique no link a seguir ou cole-o no navegador para concluir o processo:\n\n' +
                    'http://' + req.headers.host + '/resetPassword2/#' + token + '\n\n' +
                    'Se o(a) senhor(a) não pediu a redefinição da password, ignore este e-mail e sua password permanecerá inalterada.\n'
            };
            console.log(mailOptions)
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');
                req.flash('success', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
                done(err, 'done');
            });
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    ], function (err) {
        if (err) return next(err);
        return res.redirect('/pages/resetPassword.html');
    });
});


global.helpme.get('/resetPassword2/:token', function (req, res) {
    global.connect.con.query('SELECT resetPasswordToken, resetPasswordExpires from utilizador where resetPasswordToken = ?', [req.params.token], function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/pages/resetPassword.html');
        }
        res.sendFile(global.root + '/views/forum/pages/' + 'resetPassword2.html');
    });
});

global.helpme.post('/resetPassword2/:token', function (req, res) {
    async.waterfall([
        function (done) {
            global.connect.con.query('SELECT email, resetPasswordToken, resetPasswordExpires from utilizador where resetPasswordToken = ?', req.body.token, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('/pages/resetPassword.html');
                }
                global.connect.con.query('UPDATE utilizador SET password="' + req.body.password + '"where resetPasswordToken="' + req.body.token + '"', function (err, rows) {
                    if (!err) {
                        console.log("Numero de linhas inseridas: " + rows.affectedRows);
                    }
                    else
                        console.log('Erro na Query.', err);
                    done(err, user);
                })
            });
        },

        function (user, done) {
            global.connect.con.query('SELECT email from utilizador where resetPasswordToken = ?', req.body.token, function (err, rows, fields) {
                console.log(rows);
                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'helppmeprojects',
                        pass: 'PTSI2020'
                    }
                });
                var mailOptions = {
                    to: rows[0].email,
                    from: 'helppmeprojects.com',
                    subject: 'A sua password foi redefinida.',
                    text: 'Olá,\n\n' +
                        'Isto é uma confirmação de que a password da sua conta ' + rows[0].email + ' foi redefinida.\n'
                };
                console.log(mailOptions)
                smtpTransport.sendMail(mailOptions, function (err) {
                    req.flash('success', 'Success! Your password has been changed.');
                    done(err);
                });
                res.end('{"success" : "Updated Successfully", "status" : 200}');
            });
        }
    ], function (err) {
        res.redirect('/pages/resetPassword.html');
    });
});
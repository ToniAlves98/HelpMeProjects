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

global.helpme.post('/submit', function (req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(email == null){
        res.redirect('/teste');
    }
    console.log('Login post forum_routes.js'+ req.body);
    if (email && password) {
		global.connect.con.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/forum');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

//rota de gravação
global.helpme.post('/login', function(req, res) {
    console.log('body: ' + JSON.stringify(req.body));
    if(req.body == null){
        res.redirect('/teste');
    }
    //chamada da função save que está no user.model e envio dos parâmetros
    global.model_utilizador.login(req.body.email, req.body.password, function(err, data, fields) {
        console.log(data);
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
            res.end('{"denied" : "dados inexistentes/errados", "status" : 201}')
        }
        else {
            //envio para o cliente dos dados retornados pelo model
            global.sessData = req.session;
            global.sessData.dadosUtilizador = data;
            console.log(req.session);
            
            res.send(data);
            
            console.log();
            res.end('{"success" : "Updated Successfully", "status" : 200}');

        }
    });
});

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

global.helpme.post('/auth', function (req, res){
    var email = req.body.email;
    var password = req.body.password;
    console.log('Login post forum_routes.js'+ req.body.email);
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
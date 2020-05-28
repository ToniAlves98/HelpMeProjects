function readPerguntas(idUser, lingua, callback) {
    global.connect.con.query('SELECT idPergunta, titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador FROM pergunta WHERE lingua = \''+lingua+'\' ORDER BY num_likes DESC', function(err, rows, fields) {
    var string = JSON.stringify(rows);
    var json = JSON.parse(string);

    if(idUser != null){
        json.forEach(function (row) {
            row.idUser = idUser; 
        });
    }
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function getNumPerguntas(lingua, callback) {
    global.connect.con.query('SELECT count(*) as numero from pergunta where AreaConhecimento_idAreaConhecimento = 1 AND lingua = \''+lingua+'\'UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 2 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 3 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 4 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 5 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 6 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 7 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 8 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 9 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 10 AND lingua = \''+lingua+'\' UNION ALL SELECT count(*) from pergunta', function (err, rows, fields) {
    var string = JSON.stringify(rows);
    var json = JSON.parse(string);

    if (!err) {
        callback(null, json);
    }
    else
        console.log('Error while performing Query.', err);
    });
};

function readPerguntasPorArea(idUser, lingua, id, callback){
    global.connect.con.query('SELECT * FROM pergunta WHERE AreaConhecimento_idAreaConhecimento =\''+ id +'\' AND lingua = \''+lingua+'\' order by num_likes DESC', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (!err) {
            json.forEach(function (row) {
                row.idUser = idUser; 
            });
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function getPergunta(idPergunta, callback){
    var id = idPergunta[0];
    //global.session.idPergunta = id;
    global.connect.con.query('SELECT titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, nome FROM pergunta INNER JOIN utilizador ON pergunta.Utilizador_idUtilizador = utilizador.idUtilizador WHERE idPergunta =\''+ id +'\'', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function getResposta(idPergunta, callback){
    var id = idPergunta[0];
    //global.session.idPergunta = id;
    global.connect.con.query('SELECT idResposta, resposta, data_resposta, num_likes, Utilizador_idUtilizador, nome FROM resposta INNER JOIN utilizador ON resposta.Utilizador_idUtilizador = utilizador.idUtilizador WHERE resposta.Pergunta_idPergunta =\''+ id +'\'', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function savePergunta(idUser, titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, callback){
    console.log(idUser);
   var post = { titulo_pergunta: titulo_pergunta, pergunta: pergunta, data_pergunta:data_pergunta, lingua: lingua, num_likes:num_likes,  AreaConhecimento_idAreaConhecimento:  AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador:idUser}
   var query = global.connect.con.query('INSERT INTO pergunta SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    if (!err) {
        console.log("Number of records inserted: " + rows.affectedRows);
    }
    else
        console.log('Error while performing Query.', err);
});
}

function saveLikes(idPergunta, num_likes, callback){
    var id = idPergunta[0];
    //var id = global.session.idPergunta;
    var query = global.connect.con.query('UPDATE pergunta SET num_likes = ' + num_likes + ' WHERE idPergunta = ' + id, function(err, rows, fields) {
    console.log(query.sql);
     if (!err) {
         console.log("Number of records updated: " + rows.affectedRows);
     }
     else
         console.log('Error while performing Query.', err);
 });
    global.connect.con.query('select num_likes from pergunta WHERE idPergunta = ' + id, function(err, rows2, fields) {
        if (!err) {
            console.log("Number of records updated: " + rows2.affectedRows);
            callback(null, rows2);
        }
        else
            console.log('Error while performing Query.', err);
    });
 }

function saveLikesResp(idResposta, num_likes, callback){
    var query = global.connect.con.query('UPDATE resposta SET num_likes = ' + num_likes + ' WHERE idResposta = ' + idResposta, function(err, rows, fields) {
     console.log(query.sql);
     if (!err) {
         console.log("Number of records updated: " + rows.affectedRows);
     }
     else
         console.log('Error while performing Query.', err);
 });
 global.connect.con.query('select num_likes, idResposta from resposta WHERE idResposta = ' + idResposta, function(err, rows2, fields) {
    if (!err) {
        console.log("Number of records updated: " + rows2.affectedRows);
        callback(null, rows2);
    }
    else
        console.log('Error while performing Query.', err);
});
 }

module.exports = {
    readPerguntas: readPerguntas,
    getPergunta: getPergunta,
    getResposta: getResposta,
    savePergunta: savePergunta,
    saveLikes: saveLikes,
    readPerguntasPorArea: readPerguntasPorArea,
    getNumPerguntas: getNumPerguntas,
    saveLikesResp: saveLikesResp
    }
function readPerguntas(callback) {
    global.connect.con.query('SELECT idPergunta, titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador FROM pergunta ORDER BY num_likes', function(err, rows, fields) {
    var string = JSON.stringify(rows);
    var json = JSON.parse(string);

    if(global.session.idUser != null){
        json.forEach(function (row) {
            row.idUser = global.session.idUser; 
        });
    }
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function getPergunta(idPergunta, callback){
    var id = idPergunta[0];
    global.session.idPergunta = id;
    global.connect.con.query('SELECT titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, nome FROM pergunta INNER JOIN utilizador ON pergunta.Utilizador_idUtilizador = utilizador.idUtilizador WHERE idPergunta =\''+ id +'\'', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function getResposta(idPergunta, callback){
    var id = idPergunta[0];
    global.session.idPergunta = id;
    global.connect.con.query('SELECT idResposta, resposta, data_resposta, num_likes, Utilizador_idUtilizador, nome FROM resposta INNER JOIN utilizador ON resposta.Utilizador_idUtilizador = utilizador.idUtilizador WHERE Pergunta_idPergunta =\''+ id +'\'', function(err, rows, fields) {
        if (!err) {
            console.log(rows);
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function savePergunta( titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, callback){
   var post = { titulo_pergunta: titulo_pergunta, pergunta: pergunta, data_pergunta:data_pergunta, lingua: lingua, num_likes:num_likes,  AreaConhecimento_idAreaConhecimento:  AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador:Utilizador_idUtilizador}
   var query = global.connect.con.query('INSERT INTO pergunta SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    if (!err) {
        console.log("Number of records inserted: " + rows.affectedRows);
    }
    else
        console.log('Error while performing Query.', err);
});
}

module.exports = {
    readPerguntas: readPerguntas,
    getPergunta: getPergunta,
    getResposta: getResposta,
    savePergunta: savePergunta
    }
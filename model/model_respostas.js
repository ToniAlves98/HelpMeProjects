function readRespostas(callback) {
    global.connect.con.query('SELECT idResposta, resposta, data_resposta, num_likes, Utilizador_idUtilizador, Pergunta_idPergunta, Pergunta_AreaConhecimento_idAreaConhecimento, Pergunta_Utilizador_idUtilizador from resposta', function(err, rows, fields) {
        if (!err) {
            console.log(rows);
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function saveResposta(resposta, callback){
    var idU = global.session.idUser;
    var idP = global.session.idPergunta;
    var post = {resposta: resposta, num_likes: 0, Utilizador_idUtilizador: idU, Pergunta_idPergunta: idP}
    var query = global.connect.con.query('INSERT INTO resposta SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    var data = {idPergunta:idP};
    var string = JSON.stringify(data);
    var json = JSON.parse(string);
    //var ler = JSON.stringify(rows);
     if (!err) {
        json.forEach(function (row) {
            row.idPergunta = global.session.idPergunta;
            console.log(row); 
        });
        //console.log("Number of records inserted: " + rows.affectedRows);
        //console.log(string + ': : ' + json.idPergunta);
        //console.log('ler' + ': : ' + JSON.stringify(json));
        callback(null, json);
     }
     else
         console.log('Error while performing Query.', err);
    });
}

module.exports = {
    readRespostas: readRespostas,
    saveResposta: saveResposta
    }
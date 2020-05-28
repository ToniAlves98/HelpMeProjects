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

function saveResposta(idUser, idPergunta, resposta, callback){
    //var idU = global.session.idUser;
    var idP = idPergunta[0];
    var post = {resposta: resposta, num_likes: 0, Utilizador_idUtilizador: idUser, Pergunta_idPergunta: idP}
    var query = global.connect.con.query('INSERT INTO resposta SET ?', post, function(err, rows, fields) {
     if (!err) {
        console.log("Number of records inserted: " + rows.affectedRows);
     }
     else
         console.log('Error while performing Query.', err);
    });
    global.connect.con.query('SELECT Pergunta_idPergunta from resposta where Pergunta_idPergunta='+idP, function(err, rows2, fields) {
        if (!err) {
            callback(null, rows2);
         }
         else
             console.log('Error while performing Query.', err);
        });
}

module.exports = {
    readRespostas: readRespostas,
    saveResposta: saveResposta
    }
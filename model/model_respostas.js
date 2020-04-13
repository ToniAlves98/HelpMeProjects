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

module.exports = {
    readRespostas: readRespostas,
    }
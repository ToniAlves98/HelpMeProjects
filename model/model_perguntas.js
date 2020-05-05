function readPerguntas(callback) {
    global.connect.con.query('SELECT idPergunta, titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador from pergunta', function(err, rows, fields) {
        if (!err) {
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
    savePergunta: savePergunta
    }
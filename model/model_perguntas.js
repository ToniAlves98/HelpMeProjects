function readPerguntas(callback) {
    global.connect.con.query('SELECT idPergunta, titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador FROM pergunta ORDER BY num_likes', function(err, rows, fields) {
    console.log('getperguntas ' + global.session.idUser);
    var string = JSON.stringify(rows);
    var json = JSON.parse(string);
    //var name = 'name';
    //json[name] = value;
    //name = 'anotherName';
    //json[name] = anotherValue;

        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function getPergunta(callback){
    id = 1;
    console.log('getperguntas ' + global.session.idUser);
    global.connect.con.query('SELECT titulo_pergunta, pergunta, data_pergunta, lingua, num_likes, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, nome FROM pergunta INNER JOIN utilizador ON pergunta.Utilizador_idUtilizador = utilizador.idUtilizador WHERE idPergunta =\''+ id +'\'', function(err, rows, fields) {
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
    getPergunta: getPergunta,
    savePergunta: savePergunta
    }
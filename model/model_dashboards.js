function countPerguntas(callback) {
    global.connect.con.query('SELECT max(idPergunta) as count from pergunta;', function(err, rows, fields) {
        console.log(count)
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

module.exports = {
    countPerguntas: countPerguntas,
}
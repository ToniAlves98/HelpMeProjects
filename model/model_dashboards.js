function countPerguntas(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from pergunta;', function(err, rows, fields) {
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
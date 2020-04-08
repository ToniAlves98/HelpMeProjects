function readRelatorios(callback) {
    global.connect.con.query('SELECT nomeRelatorio, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador from relatorio', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function deleteRelatorio(nomeRelatorio, callback) {
    var linha = { nomeRelatorio: nomeRelatorio };
    var query = global.connect.con.query('DELETE FROM relatorio WHERE nomeRelatorio = ?', linha, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}




module.exports = {
    readRelatorios: readRelatorios,
    deleteRelatorio: deleteRelatorio
    }
function readRelatoriosForum(callback) {
    global.connect.con.query('SELECT idRelatorio, nomeRelatorio, pdf, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, nome from relatorio inner join utilizador on Utilizador_idUtilizador = idUtilizador where relatorio.estado = "ativo"', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function seeAreaRel(idArea, callback) {
    var id = idArea;
    global.connect.con.query('SELECT idRelatorio, nomeRelatorio, pdf, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, nome from relatorio inner join utilizador on Utilizador_idUtilizador = idUtilizador where AreaConhecimento_idAreaConhecimento="'+id+'"', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

module.exports = {
    readRelatoriosForum: readRelatoriosForum,
    seeAreaRel: seeAreaRel
    }
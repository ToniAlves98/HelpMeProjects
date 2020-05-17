function readEventosForum(callback) {
    //var query =  global.connect.con.query('SELECT idEvento, nomeEvento, tipoEvento, imagem, data_inicio, data_fim from event where evento.estado="ativo"', function(err, rows, fields) {
    global.connect.con.query('SELECT * from evento where estado="ativo"', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function getEventoInfo(idEvento, callback) {
    var id = idEvento[0];
    global.connect.con.query('SELECT * from evento where idEvento="'+id+'"', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};


function getEventoArea(idArea, callback) {
    var id = idArea[0];
    global.connect.con.query('SELECT * from evento where AreaConhecimento_idAreaConhecimento="'+id+'"', function(err, rows, fields) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        console.log(json);
        if (!err) {
            callback(null, json);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

module.exports = {
    readEventosForum: readEventosForum,
    getEventoInfo: getEventoInfo,
    getEventoArea: getEventoArea
    }
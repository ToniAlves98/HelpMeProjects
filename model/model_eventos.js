function readEventos(callback) {
    global.connect.con.query('SELECT nomeEvento, tipoEvento, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, data_inicio, data_fim from evento', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};


function saveEvento(nomeEvento,AreaConhecimento_idAreaConhecimento, tipoEvento, Utilizador_idUtilizador, data_inicio, data_fim, callback) {
    var post = { nomeEvento: nomeEvento, AreaConhecimento_idAreaConhecimento: AreaConhecimento_idAreaConhecimento, tipoEvento: tipoEvento, Utilizador_idUtilizador: Utilizador_idUtilizador, data_inicio: data_inicio, data_fim: data_fim };
    var query = global.connect.con.query('INSERT INTO evento SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function setEvento(nomeEvento,AreaConhecimento_idAreaConhecimento, tipoEvento, Utilizador_idUtilizador, data_inicio, data_fim, idEvento, callback) {
    var query = global.connect.con.query('UPDATE evento SET nomeEvento="'+nomeEvento+'", AreaConhecimento_idAreaConhecimento="'+AreaConhecimento_idAreaConhecimento+'", Utilizador_idUtilizador="'+Utilizador_idUtilizador+'", tipoEvento="'+tipoEvento+'", data_fim="'+data_fim+'", data_inicio="'+data_inicio+'" where idEvento="'+ idEvento +'"', function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}


function deleteEvento( idEvento, callback) {
    //var linha = { nomeEvento: nomeEvento };
    var query = global.connect.con.query('DELETE FROM evento WHERE idEvento = "'+idEvento+'"',  function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

module.exports = {
    readEventos: readEventos,
    saveEvento: saveEvento,
    deleteEvento: deleteEvento,
    setEvento: setEvento
    }
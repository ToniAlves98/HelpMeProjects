function readEventosForum(callback) {
    global.connect.con.query('SELECT idEvento, nomeEvento, tipoEvento, imagem, data_inicio, data_fim from event where evento.estado="ativo";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function pedidoEvento(nomeEvento, tipoEvento, AreaConhecimento_idAreaConhecimento,  imagem, Utilizador_idUtilizador, data_inicio, data_fim, estado, callback) {
    var post = { nomeEvento: nomeEvento, tipoEvento: tipoEvento, AreaConhecimento_idAreaConhecimento: AreaConhecimento_idAreaConhecimento, imagem:imagem, Utilizador_idUtilizador: Utilizador_idUtilizador, data_inicio: data_inicio, data_fim: data_fim, estado: estado };
    var query = global.connect.con.query('INSERT INTO evento SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function setEvento(idEvento, nomeEvento,AreaConhecimento_idAreaConhecimento, tipoEvento, imagem, data_inicio, data_fim, callback) {
    var query = global.connect.con.query('UPDATE evento SET nomeEvento="'+nomeEvento+'", AreaConhecimento_idAreaConhecimento="'+AreaConhecimento_idAreaConhecimento+'", tipoEvento="'+tipoEvento+'", imagem="'+imagem+'", data_inicio="'+data_inicio+'", data_fim="'+ data_fim +'" where idEvento="'+ idEvento +'"', function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}


function deleteEvento(idEvento, callback) {
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
    readEventosForum: readEventosForum,
    pedidoEvento: pedidoEvento,
    deleteEvento: deleteEvento,
    setEvento: setEvento
    }
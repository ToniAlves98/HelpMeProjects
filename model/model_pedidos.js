function readEventosPendentes(callback) {
    global.connect.con.query('SELECT evento.idEvento, evento.nomeEvento, evento.tipoEvento, evento.descricao, areaconhecimento.tipo_area, evento.imagem, utilizador.nome, evento.data_inicio, evento.data_fim from evento INNER JOIN utilizador ON evento.Utilizador_idUtilizador=utilizador.idUtilizador INNER JOIN areaconhecimento ON evento.AreaConhecimento_idAreaConhecimento=areaconhecimento.idAreaConhecimento where evento.estado="pendente";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function aceitar(idEvento, estado, callback) {
    var query = global.connect.con.query('UPDATE evento SET estado="'+ estado +'" where idEvento="'+ idEvento +'"', function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function rejeitar(idEvento,estado, callback) {
    var query = global.connect.con.query('UPDATE evento SET estado="'+ estado +'" WHERE idEvento = "'+idEvento+'"',  function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function savePedido(nomeEvento, AreaConhecimento_idAreaConhecimento, tipoEvento, descricao,  imagem, Utilizador_idUtilizador, data_inicio, data_fim, estado, callback) {
    var post = { nomeEvento: nomeEvento, AreaConhecimento_idAreaConhecimento: AreaConhecimento_idAreaConhecimento, tipoEvento: tipoEvento, descricao:descricao, imagem:imagem, Utilizador_idUtilizador: Utilizador_idUtilizador, data_inicio: data_inicio, data_fim: data_fim, estado: estado };
    var query = global.connect.con.query('INSERT INTO evento SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

module.exports = {
    readEventosPendentes: readEventosPendentes,
    aceitar: aceitar,
    rejeitar: rejeitar,
    savePedido: savePedido
}
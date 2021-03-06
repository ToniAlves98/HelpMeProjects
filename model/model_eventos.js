function readEventos(callback) {
    global.connect.con.query('SELECT evento.idEvento, evento.nomeEvento, evento.tipoEvento, evento.descricao, areaconhecimento.tipo_area, evento.imagem, utilizador.nome, evento.data_inicio, evento.data_fim from evento INNER JOIN utilizador ON evento.Utilizador_idUtilizador=utilizador.idUtilizador INNER JOIN areaconhecimento ON evento.AreaConhecimento_idAreaConhecimento=areaconhecimento.idAreaConhecimento where evento.estado="ativo";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};


function saveEvento(idUser, nomeEvento, AreaConhecimento_idAreaConhecimento, tipoEvento, descricao,  imagem,  data_inicio, data_fim, estado, callback) {
    var post = { nomeEvento: nomeEvento, tipoEvento: tipoEvento, descricao:descricao, AreaConhecimento_idAreaConhecimento: AreaConhecimento_idAreaConhecimento, imagem:imagem, data_inicio: data_inicio, data_fim: data_fim, estado: estado, Utilizador_idUtilizador: idUser, };
    var query = global.connect.con.query('INSERT INTO evento SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function setEvento( idEvento, nomeEvento,AreaConhecimento_idAreaConhecimento, tipoEvento, descricao, imagem, data_inicio, data_fim, callback) {
    var query = global.connect.con.query('UPDATE evento SET nomeEvento="'+nomeEvento+'", tipoEvento="'+tipoEvento+'", descricao="'+ descricao +'", imagem="'+imagem+'", data_inicio="'+data_inicio+'", data_fim="'+ data_fim +'", AreaConhecimento_idAreaConhecimento="'+AreaConhecimento_idAreaConhecimento+'" where idEvento="'+ idEvento +'"', function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}


function deleteEvento(idEvento, estado,  callback) {
    //var linha = { nomeEvento: nomeEvento };
    var query = global.connect.con.query('UPDATE evento SET estado="'+ estado +'" WHERE idEvento = "'+idEvento+'"',  function(err, rows, fields) {
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
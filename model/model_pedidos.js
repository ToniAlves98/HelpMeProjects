function readEventosPendentes(callback) {
    global.connect.con.query('SELECT evento.idEvento, evento.nomeEvento, evento.tipoEvento, areaconhecimento.tipo_area, evento.imagem, utilizador.nome, evento.data_inicio, evento.data_fim from evento INNER JOIN utilizador ON evento.Utilizador_idUtilizador=utilizador.idUtilizador INNER JOIN areaconhecimento ON evento.AreaConhecimento_idAreaConhecimento=areaconhecimento.idAreaConhecimento where evento.estado="pendente";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};


module.exports = {
    readEventosPendentes: readEventosPendentes,
}
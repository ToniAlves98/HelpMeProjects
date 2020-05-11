function countPerguntas(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from pergunta;', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function countUtilizadores(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from utilizador;', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function countEventos(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from evento where estado = "ativo";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function countPedidos(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from evento where estado = "pendente";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function countRelatorios(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from relatorio;', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};


module.exports = {
    countPerguntas: countPerguntas,
    countUtilizadores: countUtilizadores,
    countEventos: countEventos,
    countPedidos: countPedidos,
    countRelatorios: countRelatorios
}
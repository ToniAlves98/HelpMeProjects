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

function countSugestoes(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from sugestao;', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

//fun��o leitura para o gr�fico de tipo de utilizador
function graficoUtilizador(callback) {
    global.connect.con.query('SELECT count(*) as numero from utilizador where profissao = "Estudante" UNION ALL SELECT count(*) from utilizador where profissao = "Professor/Investigador" UNION ALL SELECT count(*) from utilizador where profissao = "Empresa" UNION ALL SELECT count(*) from utilizador where profissao = "Gestor de Projeto" UNION ALL SELECT count(*) from utilizador', function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('ERRO', err);
    });

};

function graficoPerguntaArea(callback) {
    global.connect.con.query('SELECT count(*) as numero from pergunta where AreaConhecimento_idAreaConhecimento = 1 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 2 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 3 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 4 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 5 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 6 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 7 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 8 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 9 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 10 UNION ALL SELECT count(*) from pergunta', function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('ERRO', err);
    });

};

function graficoRelatorioUser(callback) {
    global.connect.con.query('SELECT count(*) as numero from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Estudante" UNION ALL SELECT count(*) from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Professor/Investigador" UNION ALL SELECT count(*) from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Empresa" UNION ALL SELECT count(*) from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Gestor de Projeto"  UNION ALL SELECT count(*) from utilizador', function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('ERRO', err);
    });

};


module.exports = {
    countPerguntas: countPerguntas,
    countUtilizadores: countUtilizadores,
    countEventos: countEventos,
    countPedidos: countPedidos,
    countRelatorios: countRelatorios,
    countSugestoes: countSugestoes,
    graficoUtilizador: graficoUtilizador,
    graficoPerguntaArea: graficoPerguntaArea,
    graficoRelatorioUser: graficoRelatorioUser
}
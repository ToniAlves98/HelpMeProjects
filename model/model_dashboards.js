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
    global.connect.con.query('SELECT COUNT(*) as count from utilizador where estado="ativo";', function(err, rows, fields) {
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
    global.connect.con.query('SELECT COUNT(*) as count from relatorio where estado = "ativo";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function countSugestoes(callback) {
    global.connect.con.query('SELECT COUNT(*) as count from sugestao where estado= "ativo";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

//função leitura para o gráfico de tipo de utilizador
function graficoUtilizador(callback) {
    global.connect.con.query('SELECT count(*) as numero from utilizador where profissao = "Estudante" UNION ALL SELECT count(*) from utilizador where profissao = "Professor/Investigador" UNION ALL SELECT count(*) from utilizador where profissao = "Empresa" UNION ALL SELECT count(*) from utilizador where profissao = "Gestor de Projeto" UNION ALL SELECT count(*) from utilizador', function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('ERRO', err);
    });

};

//função leitura para o gráfico de pergunta por área
function graficoPerguntaArea(callback) {
    global.connect.con.query('SELECT count(*) as numero from pergunta where AreaConhecimento_idAreaConhecimento = 1 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 2 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 3 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 4 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 5 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 6 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 7 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 8 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 9 UNION ALL SELECT count(*) from pergunta where AreaConhecimento_idAreaConhecimento = 10 UNION ALL SELECT count(*) from pergunta', function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('ERRO', err);
    });

};

//função leitura para o gráfico de relatório por tipo de utilizador
function graficoRelatorioUser(callback) {
    global.connect.con.query('SELECT count(*) as numero from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Estudante" UNION ALL SELECT count(*) from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Professor/Investigador" UNION ALL SELECT count(*) from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Empresa" UNION ALL SELECT count(*) from relatorio INNER JOIN utilizador ON relatorio.Utilizador_idUtilizador = utilizador.idUtilizador where profissao = "Gestor de Projeto"  UNION ALL SELECT count(*) from utilizador', function (err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('ERRO', err);
    });

};

//função leitura para nº perguntas por utilizador
function userAtivo(callback) {
    global.connect.con.query('SELECT nome, COUNT(*) AS num FROM pergunta, resposta INNER JOIN utilizador ON Utilizador_idUtilizador = idUtilizador GROUP BY Utilizador_idUtilizador ORDER BY COUNT(*) DESC;', function (err, rows, fields) {
        global.connect.con.query('SELECT nome, COUNT(*) AS num FROM resposta INNER JOIN utilizador ON Utilizador_idUtilizador = idUtilizador GROUP BY Utilizador_idUtilizador ORDER BY COUNT(*) DESC;', function (err, rows2, fields) {
        //console.log('Rows: ' + rows);
        //console.log('Rows2: ' + rows2);
/*        var object = mergeJSON.merge(rows, rows2);

        const result = {};
        let key;

for (key in rows) {
  if(rows.hasOwnProperty(key)){
    //result[key] = rows[key];
    console.log(rows[key].nome);
    if(result[key] != null && result[key].nome == rows[key].nome){
        //result[key].num += rows[key].num;
        console.log('bom caminho');
    }else{
        console.log('not bad');
        result[key] = rows[key];
    }
  }
}

for (key in rows2) {
  if(rows2.hasOwnProperty(key)){
    result[key] = rows2[key];
  }
}*/

        if (!err) {
            //var object2 = JSON.stringify(object);
            //var result2 = JSON.stringify(result);
            console.log('Rows: ' + rows);
            console.log('Rows2: ' + rows2);
            //console.log('obj2: ' + object2);
            //console.log('result2: ' + result2);
            callback(null, rows);
        }
        else
            console.log('ERRO', err);
        });
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
    graficoRelatorioUser: graficoRelatorioUser,
    userAtivo: userAtivo
}
//função de gravação que recebe os parâmetros
function saveUtilizador(nome, idade, genero, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, area_cientifica, ciclo_estudo, perfil) {
    //receber os dados do formuário que são enviados por post e guarda em objeto JSON
    var post = {
        nome: nome, idade: idade, genero: genero, profissao: profissao, email: email, password: password, descricao: descricao,
        ramo_emp: ramoEp, num_trabalhadores: nEmpregados, regiao_pais: regiao, area_cientifica: area, ciclo_estudo: estudo, perfil: perfil
    };
    //criar e executar a query de gravação na BD para inserir os dados presentes no post
    var query = global.connect.con.query('INSERT INTO utilizador SET ?', post, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Numero de linhas inseridas: " + rows.affectedRows);
        }
        else
            console.log('Erro na Query.', err);
    });
}
//função de leitura que retorna o resultado no callback
function readUtilizador(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT nome, idade, genero, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, area_cientifica, ciclo_estudo, perfil from utilizador', function (err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Erro na Query Query.', err);
    });
};

//exportar as funções
module.exports = {
    readUtilizador: readUtilizador,
    saveUtilizador: saveUtilizador
}
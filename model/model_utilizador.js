//função de leitura que retorna o resultado no callback
function readUtilizador(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT idUtilizador, nome, idade, genero, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, area_cientifica, ciclo_estudo, perfil from utilizador', function (err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Erro na Query.', err);
    });
};

//função de gravação que recebe os parâmetros
function saveUtilizador(nome, idade, genero, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, area_cientifica, ciclo_estudo, perfil, callback) {
    //receber os dados do formu�rio que são enviados por post e guarda em objeto JSON
    var post = {
        nome: nome, idade: idade, genero: genero, profissao: profissao, email: email, password: password, descricao: descricao,
        ramo_emp: ramo_emp, num_trabalhadores: num_trabalhadores, regiao_pais: regiao_pais, area_cientifica: area_cientifica, ciclo_estudo: ciclo_estudo, perfil: perfil
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

//função de edição utilizador
function setUtilizador(idUtilizador, nome, idade, genero, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, area_cientifica, ciclo_estudo, perfil, callback) {

    var post = {
        idUtilizador: idUtilizador, nome: nome, idade: idade, genero: genero, profissao: profissao, email: email, password: password, descricao: descricao,
        ramo_emp: ramo_emp, num_trabalhadores: num_trabalhadores, regiao_pais: regiao_pais, area_cientifica: area_cientifica, ciclo_estudo: ciclo_estudo, perfil: perfil
    };
    var query = global.connect.con.query('UPDATE utilizador SET', post, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Erro na Query.', err);
    });
}

//função delete utilizador
function deleteUtilizador(idUtilizador, callback) {
    var query = global.connect.con.query('DELETE FROM utilizador WHERE idUtilizador = "' + idUtilizador + '"', function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Erro na Query.', err);
    });
}


//função de leitura que retorna o estudante no callback
function readEstudante(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT idUtilizador, nome, idade, genero, profissao, email, password, descricao, area_cientifica, ciclo_estudo, perfil from utilizador WHERE profissao = "Estudante" OR profissao = "Professor/Investigador"', function (err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Erro na Query.', err);
    });
};

//função de edição estudante
function setEstudante(idUtilizador, nome, idade, genero, profissao, email, password, descricao, area_cientifica, ciclo_estudo, callback) {

    /*var post = {
        idUtilizador: idUtilizador, nome: nome, idade: idade, genero: genero, profissao: profissao, email: email, password: password, descricao: descricao,
        area_cientifica: area_cientifica, ciclo_estudo: ciclo_estudo, perfil: perfil
    };*/
    var query = global.connect.con.query('UPDATE utilizador SET nome="' + nome + '", idade="' + idade + '", genero="' + genero + '", profissao="' + profissao + '", email="' + email + '", password="' + password + '", descricao="' + descricao + '", area_cientifica="' + area_cientifica + '", ciclo_estudo="' + ciclo_estudo + '"where idUtilizador="' + idUtilizador + '"', function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Erro na Query.', err);
    });
}

//função de leitura que retorna a empresa no callback
function readEmpresa(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT idUtilizador, nome, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, perfil from utilizador WHERE profissao = "Empresa"', function (err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Erro na Query.', err);
    });
};

//função de edição utilizador
function setEmpresa(idUtilizador, nome, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, callback) {

    /*var post = {
        idUtilizador: idUtilizador, nome: nome, profissao: profissao, email: email, password: password, descricao: descricao,
        ramo_emp: ramo_emp, num_trabalhadores: num_trabalhadores, regiao_pais: regiao_pais, perfil: perfil
    };*/
    var query = global.connect.con.query('UPDATE utilizador SET nome="' + nome + '", profissao="' + profissao + '", email="' + email + '", password="' + password + '", descricao="' + descricao + '", ramo_emp="' + ramo_emp + '", num_trabalhadores="' + num_trabalhadores + '", regiao_pais="' + regiao_pais + '"where idUtilizador="' + idUtilizador + '"', function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Erro na Query.', err);
    });
}

//função de leitura que retorna o gestor no callback
function readGestor(callback) {
    //criar e executar a query de leitura na BD
    global.connect.con.query('SELECT idUtilizador, nome, idade, genero, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, perfil from utilizador WHERE profissao = "Gestor de Projeto"', function (err, rows, fields) {
        if (!err) {
            //gravar os resultados rows no callback
            callback(null, rows);
        }
        else
            console.log('Erro na Query.', err);
    });
};

//função de edição empresa
function setGestor(idUtilizador, nome, idade, genero, profissao, email, password, descricao, ramo_emp, num_trabalhadores, regiao_pais, callback) {

   /* var post = {
        idUtilizador: idUtilizador, nome: nome, idade: idade, genero: genero, profissao: profissao, email: email, password: password, descricao: descricao,
        ramo_emp: ramo_emp, num_trabalhadores: num_trabalhadores, regiao_pais: regiao_pais, perfil: perfil
    };*/
    var query = global.connect.con.query('UPDATE utilizador SET nome="' + nome + '", idade="' + idade + '", genero="' + genero + '", profissao="' + profissao + '", email="' + email + '", password="' + password + '", descricao="' + descricao + '", ramo_emp="' + ramo_emp + '", num_trabalhadores="' + num_trabalhadores + '"regiao_pais="' + regiao_pais + '"where idUtilizador="' + idUtilizador + '"', function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Erro na Query.', err);
    });
}


module.exports = {
    readUtilizador: readUtilizador,
    saveUtilizador: saveUtilizador,
    setUtilizador: setUtilizador,
    deleteUtilizador: deleteUtilizador,
    readEstudante: readEstudante,
    setEstudante: setEstudante,
    readEmpresa: readEmpresa,
    setEmpresa: setEmpresa,
    readGestor: readGestor,
    setGestor: setGestor
}
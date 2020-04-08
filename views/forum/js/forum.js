let bd = require('../../../bd');
//funcao login
function login(nome, password, callback) {
    //receber os dados do formuário que săo enviados por get e guarda em objeto JSON 
    global.bd.con.query('Select * from utilizador where idutilizador ="'+ idutilizador + '"', function (err, rows) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        if (json != "") {
            if (!err) {
                //verifica a password
                if (json.password = password) {
                    var response = { "user": "a", "nome": json[0].nome, "idutilizador": json[0].idutilizador };
                    callback(null, response);
                } else if (json[0].passwordEE = password) {
                    var response = { "user": "a", "nome": json[0].nome, "idutilizador": json[0].idutilizador };
                    callback(null, response);
                }
            }
        } else {
            var response = {};
            callback(null,response);
        }
    });
};

//exportar as funçőes
define(function (require, exports, module) {
module.exports = {
    login: login,
};
});
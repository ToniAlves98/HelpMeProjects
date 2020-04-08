let bd = require('../../../bd');

//funcao login
function login(nome, password, callback) {
    //receber os dados do formuário que săo enviados por get e guarda em objeto JSON 
    /*global.bd.con.query('Select * from utilizador where idutilizador ="'+ idutilizador + '"', function (err, rows) {
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
    });*/

    bd.con.query("SELECT * FROM areaconhecimento", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });

};

//exportar as funçőes
define(function (require, exports, module) {
module.exports = {
    login: login,
};
});
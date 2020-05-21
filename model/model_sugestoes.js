function readSugestoes(callback) {
    global.connect.con.query('SELECT sugestao from sugestao where estado = "ativo";', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function deleteSugestao(sugestao, estado, callback) {
    var query = global.connect.con.query('UPDATE sugestao SET estado="'+ estado +'" WHERE sugestao = "'+sugestao+'"',  function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}


function saveSugestao(sugestao, estado, callback) {
    var post = { sugestao:sugestao, estado:estado };
    var query = global.connect.con.query('INSERT INTO sugestao SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

module.exports = {
    readSugestoes:readSugestoes,
    deleteSugestao:deleteSugestao,
    saveSugestao:saveSugestao

}
function readSugestoes(callback) {
    global.connect.con.query('SELECT sugestao from sugestao;', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function deleteSugestao(sugestao, callback) {
    var query = global.connect.con.query('DELETE FROM sugestao WHERE sugestao = "'+sugestao+'"',  function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}


function saveSugestao(sugestao, callback) {
    var post = { sugestao:sugestao };
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
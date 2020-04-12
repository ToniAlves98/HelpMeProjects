function readAreas(callback) {
    global.connect.con.query('SELECT idAreaConhecimento, tipo_area from areaconhecimento', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

module.exports = {
    readAreas: readAreas,
    }
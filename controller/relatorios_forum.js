$(document).ready(function() {
    allRelatorios();
});

function allRelatorios() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readRelatoriosForum',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(data, status, request) {
            var txt = "";

            data.forEach(function(row) {
                txt += "<div style=\"border-bottom: 1px solid #515769;\">";
                txt += "<h3>" + row.nomeRelatorio + "</h3>";
                txt += "<p>" + row.nome + "    " + row.AreaConhecimento_idAreaConhecimento + "</p>";
                txt += "<a onclick=\"window.open('../../../uploads/" + row.pdf + "')\">" + row.pdf + "</a>";
                txt += "</div>";
            });

            $("#allrelatorios").html(txt);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};

function seeAreaRel() {
    var id = document.getElementById("area").value;
    var data = {};
    data.idArea = id;

    if (id == 0) {
        allRelatorios();
    } else {
        $.ajax({
            type: "POST",
            url: '/seeAreaRel',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',

            success: function(result, data) {
                var txt = "";

            result.forEach(function(row) {
                txt += "<div style=\"border-bottom: 1px solid #515769;\">";
                txt += "<h3>" + row.nomeRelatorio + "</h3>";
                txt += "<p>" + row.nome + "    " + row.AreaConhecimento_idAreaConhecimento + "</p>";
                txt += "<a onclick=\"window.open('../../../uploads/" + row.pdf + "')\">" + row.pdf + "</a>";
                txt += "</div>";
            });

            $("#allrelatorios").html(txt);
            },
            error: function(data) {
                console.log(data)
            }
        });
    }
};
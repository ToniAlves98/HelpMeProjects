$(document).ready(function() {
    tabelaEventos();
});

function tabelaEventos() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readEventosForum',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(data, status, request) {
            var txt = "";

            data.forEach(function(row) {
                txt += "<div class=\"col-md-3\" style=\"margin-right:6em; margin-bottom: 60px\"><div class=\"item-box-blog-image\">";
                txt += "<div class=\"item-box-blog-date bg-blue-ui white\"><span class=\"mon\">" + row.data_inicio + "</span></div>";
                txt += "<div class=\"crop\"><img class=\"img-responsive\" src=\"../../../uploads/" + row.imagem + "\" alt=\"\"></div>";
                txt += "</div><div class=\"item-box-blog-body\">";
                txt += "<div class=\"item-box-blog-heading\"><a href=\"#\" tabindex=\"0\"><h5>" + row.nomeEvento + "</h5></a></div>";
                txt += "<div class=\"mt\"> <a data-toggle=\"modal\" data-target=\"#myModal\" tabindex=\"0\" class=\"btn bg-blue-ui white read\" onclick=\"seeEvento(" + row.idEvento + ")\">read more</a></div></div></div>";
            });

            $("#alleventos").html(txt);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};

function seeEvento(id) {
    var data = {};
    data.idEvento = $(id);

    $.ajax({
        type: "POST",
        url: '/getEventoInfo',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(result, data) {
            txt = "";
            result.forEach(function(row) {
                txt += "<img alt=\"\" style=\"max-height:360px; max-width:360px;\" src=\"../../../uploads/" + row.imagem + "\">";
                $("#modalImg").html(txt);
                $("#nomeEvento").html(row.nomeEvent o);
                $("#descricaoEvento").html(row.tipoEvento);
            });
        },
        error: function(data) {
            console.log(data)
        }
    });
};

function seeArea() {
    var id = document.getElementById("area").value;
    var data = {};
    data.idArea = id;

    if (id == 0) {
        tabelaEventos();
    } else {
        $.ajax({
            type: "POST",
            url: '/getEventoArea',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',

            success: function(result, data) {
                txt = "";
                result.forEach(function(row) {
                    txt += "<div class=\"col-md-3\" style=\"margin-right:6em; margin-bottom: 60px\"><div class=\"item-box-blog-image\">";
                    txt += "<div class=\"item-box-blog-date bg-blue-ui white\"><span class=\"mon\">" + row.data_inicio + "</span></div>";
                    txt += "<div class=\"crop\"><img class=\"img-responsive\" src=\"../../../uploads/" + row.imagem + "\" alt=\"\"></div>";
                    txt += "</div><div class=\"item-box-blog-body\">";
                    txt += "<div class=\"item-box-blog-heading\"><a href=\"#\" tabindex=\"0\"><h5>" + row.nomeEvento + "</h5></a></div>";
                    txt += "<div class=\"mt\"> <a data-toggle=\"modal\" data-target=\"#myModal\" tabindex=\"0\" class=\"btn bg-blue-ui white read\" onclick=\"seeEvento(" + row.idEvento + ")\">read more</a></div></div></div>";
                });

                $("#alleventos").html(txt);
            },
            error: function(data) {
                console.log(data)
            }
        });
    }
};
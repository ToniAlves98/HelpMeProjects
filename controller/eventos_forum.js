$(document).ready(function () {
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
                /*txt+="<div class=\"col-md-4\"><div class=\"item-box-blog\"><div class=\"item-box-blog-image\">";
                txt+="<div class=\"item-box-blog-date bg-blue-ui white\"> <span class=\"mon\">"+row.data_inicio+"</span></div>";
                txt+="<div class=\"crop\"><figure> <img alt=\"\" src=\"./img/carousel/"+row.imagem+"\"> </figure></div></div>";
                txt+="<div class=\"item-box-blog-body\"><div class=\"item-box-blog-heading\"><a href=\"#\" tabindex=\"0\"><h5>"+row.nomeEvento+"</h5></a></div><div class=\"mt\"> <a href=\"#\" tabindex=\"0\" class=\"btn bg-blue-ui white read\">read more</a> </div></div>";
                txt+="</div></div>";*/
                txt+="<div class=\"col-md-3\" style=\"margin-right:6em\"><div class=\"item-box-blog-image\">";
                txt+="<div class=\"item-box-blog-date bg-blue-ui white\"><span class=\"mon\">"+row.data_inicio+"</span></div>";
                txt+="<div class=\"crop\"><img class=\"img-responsive\" src=\"./img/carousel/"+row.imagem+"\" alt=\"\"></div>";
                txt+="</div><div class=\"item-box-blog-body\">";
                txt+="<div class=\"item-box-blog-heading\"><a href=\"#\" tabindex=\"0\"><h5>"+row.nomeEvento+"</h5></a></div>";
                txt+="<div class=\"mt\"> <a data-toggle=\"modal\" data-target=\"#myModal\" tabindex=\"0\" class=\"btn bg-blue-ui white read\" onclick=\"seeEvento("+row.idEvento+")\">read more</a> </div></div></div>";
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
            txt="";
            result.forEach(function(row) {
                txt+="<img alt=\"\" src=\"./img/carousel/"+row.imagem+"\">";
                $("#modalImg").html(txt);
                $("#nomeEvento").html(row.nomeEvento);
                $("#descricaoEvento").html(row.tipoEvento);
            });
        },
        error: function(data) {
            console.log(data)
        }
    });
};
$(document).ready(function () {
    tabelaEventos();
    console.log('Ah?');
});

function tabelaEventos() {
    console.log('pls');
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readEventosForum',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(data, status, request) {
            if (request.status == 200) {
                var txt = "";

                data.forEach(function(row) {
                    txt="<div class=\"col-md-4\"><div class=\"item-box-blog\"><div class=\"item-box-blog-image\">";
                    txt="<div class=\"item-box-blog-date bg-blue-ui white\"> <span class=\"mon\">"+row.data_inicio+"</span></div>";
                    txt="<div class=\"crop\"><figure> <img alt=\"\" src=\"./img/carousel/102.jpg\"> </figure></div></div>";
                    txt="<div class=\"item-box-blog-body\"><div class=\"item-box-blog-heading\"><a href=\"#\" tabindex=\"0\"><h5>"+row.nomeEvento+"</h5></a></div><div class=\"mt\"> <a href=\"#\" tabindex=\"0\" class=\"btn bg-blue-ui white read\">read more</a> </div></div>";
                    txt="</div></div>";
                });

                $("#tabela_eventos").html(txt);
            } else {
                console.log("Erro");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};
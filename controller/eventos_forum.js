$(document).ready(function() {
    tabelaEventos();
    getCarousel();
});

function tabelaEventos() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readEventosForum',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
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
        dataType: 'json',
        success: function(result, data) {
            txt = "";
            result.forEach(function(row) {
                txt += "<img alt=\"\" style=\"max-height:360px; max-width:360px;\" src=\"../../../uploads/" + row.imagem + "\">";
                $("#modalImg").html(txt);
                $("#nomeEvento").html(row.nomeEvento);
                $("#descricaoEvento").html(row.descricao);
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
            dataType: 'json',
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

function seeTipo() {
    var id = document.getElementById("tipo").value;
    var data = {};
    data.tipoEvento = id;

    if (id == 0) {
        tabelaEventos();
    } else {
        $.ajax({
            type: "POST",
            url: '/getEventoTipo',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
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

var i = 0;
var f = 3;

function getCarousel() {
    var data = {};
    var n = 0;
    id=1;

    $.ajax({
        type: "GET",
        url: '/readEventosForum',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data, status, request) {
            var txt = "";

            data.slice(i, f).forEach(function(row) {
                if(n == 0){
                    txt+="<div id=\"slide"+id+"\" class=\"item active\">";
                    txt+="<div class=\"row\">";
                }
                txt+="<div class=\"col-md-4\">";
                txt+="<div class=\"item-box-blog\">";
                txt+="<div class=\"item-box-blog-image\">";
                txt+="<div class=\"item-box-blog-date bg-blue-ui white\"><span class=\"mon\">"+row.data_inicio+"</span> </div>";
                txt+="<div class=\"crop\">";
                txt+="<img class=\"img-responsive\" src=\"../../../uploads/"+row.imagem+"\" alt=\"\">";
                txt+="</div></div>";
                txt+="<div class=\"item-box-blog-body\">";
                txt+="<div class=\"item-box-blog-heading\">";
                txt+="<a href=\"#\" tabindex=\"0\">";
                txt+="<h5>"+row.nomeEvento+"</h5>";
                txt+="</a></div>";
                txt+="<div class=\"mt\"> <a href=\"#\" tabindex=\"0\" class=\"btn bg-blue-ui white read\" read\" onclick=\"seeEvento(" + row.idEvento + ")\">read more</a> </div>";
                txt+="</div></div></div>";
                n+=1;
                if(n == 3){
                    txt+="</div></div>";
                    n=0;
                    id+=1;
                    $("#eventCarrosel").html(txt);
                    console.log('clean');
                    txt="";
                    if(f < data.length){
                        i +=3;
                        f += 3;
                    }else if(f >= data.length){
                        i = 0;
                        f = 3;
                    }
                    setTimeout(function(){getCarousel()}, 9000);
                }
            });
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};
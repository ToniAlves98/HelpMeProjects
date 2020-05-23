$(document).ready(function () {
    getSugestoes();

});

function getSugestoes() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readSugestoes',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
               

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.sugestao + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_sugestoes").html(txt);
            }
            else {
                console.log("Erro");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);

        }

    });

};

function eliminarSugestao() {
    var data = {};
    data.sugestao = teste_sug.sugestao;
    data.estado = "eliminado";
    console.log(data);

    $.ajax({
        type: 'POST',
        url: '/deleteSugestao',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#avisoSugestaoEli').modal('show');
            }
            else {
                $('#avisoSugestaoEliMal').modal('show');
            }
            getSugestoes();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};

$("#eliminarSugestao").on("click", function() {
    eliminarSugestao();
 });


 var teste_sug= {}
$('#tabela_sugestoes').on('click', 'tr', function () {
    $(this).toggleClass('selected');
     //get row contents into an array
     var tableData = $(this).children("td").map(function() {
         return $(this).text();
     }).get();

     teste_sug.sugestao = tableData[0]  
     
     console.log(teste_sug)
 });




   function sugestao() {
        var data = {};
        data.sugestao = $('#sugestao').val();
        data.estado = "ativo"
        
       
        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/saveSugestao',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if (result.status == 200) {
                    $('#avisoSugestaoAdd').modal('show');
                }
                $('#formSugestao')[0].reset();
            },
        });
    }


$("#AddSugestao").on("click", function() {
    sugestao();          
 });
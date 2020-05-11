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
    console.log(data);

    $.ajax({
        type: 'DELETE',
        url: '/deleteSugestao',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
                
            }
            else {
                console.log("Erro");
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
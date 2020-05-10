$(document).ready(function () {
    getEventosPendentes();
   

});

function getEventosPendentes() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readEventosPendentes',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Id</th><th>Nome</th><th>Área de Conhecimento</th><th>Tipo</th><th>Imagem</th><th>Utilizador</th><th>Data de Ínicio</th><th>Data de Fim</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.idEvento + "</td><td>" + row.nomeEvento + "</td><td>" + row.tipo_area + "</td><td>" + row.tipoEvento + "</td><td>" + row.imagem + "</td> <td>" + row.nome + "</td><td>" + row.data_inicio + "</td><td>" + row.data_fim + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_pedidos").html(txt);
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

$(document).ready(function () {
    getAreas();
});

function getAreas() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readAreas',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.nomeEvento + "</td><td>" + row.AreaConhecimento_idAreaConhecimento + "</td><td>" + row.tipoEvento + "</td> <td>" + row.Utilizador_idUtilizador + "</td><td>" + row.data_inicio + "</td><td>" + row.data_fim + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_eventos").html(txt);
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
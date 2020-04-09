$(document).ready(function () {
    getEventos();
});

function getEventos() {
    var data = {};

    $.ajax({
        type: "POST",
        url: '/readEventos',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
                txt += "<table>";
                txt += "<thead>";
                txt += "<tr><th>Nome</th><th>Area de Conhecimento</th><th>Tipo</th><th>Utilizador</th><th>Data de Ínicio</th><th>Data de Fim</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.nomeEvento + "</td><td>" + row.AreaConhecimento + "</td><td>" + row.tipoEvento + "</td> <td>" + row.Utilizador + "</td><td>" + row.data_inicio + "</td><td>" + row.data_fim + "</td></tr>";

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

$('#formEvento').validator().on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Evento possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeEvento = $('#nomeEvento').val();
        data.AreaConhecimento_idAreaConhecimento = $('#').val();
        data.tipoEvento = $('#tipoEvento').val();
        data.Utilizador_idUtilizador = $('#').val();
        data.data_inicio = $('#inicioEvento').val();
        data.data_fim = $('#fimEvento').val();

        console.log(data);
       
        $('#')[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/saveEvento',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Evento adicionado com sucesso");
                }
            },
        });
    }
});


$('#editar_evento').validator().on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Evento possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeEvento = $('#nomeEvento').val();
        data.AreaConhecimento_idAreaConhecimento = $('#').val();
        data.tipoEvento = $('#tipoEvento').val();
        data.Utilizador_idUtilizador = $('#').val();
        data.data_inicio = $('#inicioEvento').val();
        data.data_fim = $('#fimEvento').val();

        console.log(data);
       
        $('#')[0].reset();
    
        $.ajax({
            type: 'PUT',
            url: '/setEvento',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Evento editado com sucesso");
                }
            },
        });
    }
});

$("#formEvento").on("click", "#eliminarEvento", function() {
    $(this).closest("tr").remove();
 });
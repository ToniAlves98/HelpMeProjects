$(document).ready(function () {
    getRelatorios();
});

function getRelatorios() {
    var data = {};

    $.ajax({
        type: "POST",
        url: '/readRelatorios',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
                txt += "<table>";
                txt += "<thead>";
                txt += "<tr><th>Título</th><th>Area de Conhecimento</th><th>Utilizador</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.nomeRelatorio + "</td><td>" + row.AreaConhecimento + "</td><td>" + row.Utilizador + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_relatorios").html(txt);
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

$('#adicionar_relatorio').validator().on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeEvento = $('#nome_relatorio').val();
        data.pdf = $('#pdf').val();
        data.AreaConhecimento_idAreaConhecimento = $('#').val();
        data.Utilizador_idUtilizador = $('#').val();
    
        console.log(data);
       
        $('#')[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/saveRelatorio',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Relatório adicionado com sucesso");
                }
            },
        });
    }
});


$('#editar_relatorio').validator().on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeEvento = $('#nome_relatorio').val();
        data.pdf = $('#pdf').val();
        data.AreaConhecimento_idAreaConhecimento = $('#').val();
        data.Utilizador_idUtilizador = $('#').val();
        

        console.log(data);
       
        $('#')[0].reset();
    
        $.ajax({
            type: 'PUT',
            url: '/setRelatorio',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Relatório editado com sucesso");
                }
            },
        });
    }
});

$("#formRelatorio").on("click", "#elimarRelatorio", function() {
    $(this).closest("tr").remove();
 });
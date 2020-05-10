$(document).ready(function () {

});
/*
function getPergunta_resposta(id) {
    console.log('getPerguntas_resposta');

    var data = {};

    $.ajax({
        type: "GET",
        url: '/readPerguntas',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            if (request.status == 200) {
                var txt = "";

                data.forEach(function (row) {
                    console.log('id ' + id + ', idp ' + row.idPergunta);
                    if(id == row.idPergunta){
                        txt+="<h2>"+ row.titulo_pergunta +"</h2>";
                        txt+="<p><strong>" + row.Utilizador_idUtilizador + "</strong><p>Data</p>";
                        txt+="<p style='border-bottom: 1px solid #515769;'>"+ row.pergunta +"</p>";
                        txt+="<div style='border-bottom: 1px solid #515769;'>";
                    }
                    else{
                        console.log('id != idPergunta');
                    }
                });

                $("#pergunta").html(txt);
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

};*/

$('#novaResposta').on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formulario com erros")
    } else {
        event.preventDefault();

        var data = {};
        data.resposta = $('#text').val();

        $.ajax({
            type: 'POST',
            url: '/saveResposta',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function(result, data) {
                seePergunta(result.Pergunta_idPergunta);
            },
            error: function(data) {
                console.log(data)
            }
        });
    }
});
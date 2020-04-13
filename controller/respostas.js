$(document).ready(function () {
    //getPergunta_resposta();
});
/*
function getPergunta_resposta() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readPerguntas',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
                data.forEach(function (row) {
                    txt+="<h2>"+ row.titulo_pergunta +"</h2>";
                    txt+="<p><strong>" + row.Utilizador_idUtilizador + "</strong><p>Data</p>";
                    txt+="<p style='border-bottom: 1px solid #515769;'>"+ row.pergunta +"</p>";
                    txt+="<div style='border-bottom: 1px solid #515769;'>";
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
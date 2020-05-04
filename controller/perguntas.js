$(document).ready(function () {
    getPerguntas();
});

function getPerguntas() {
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
                    txt+="<div class='panel panel-default'>";
                    txt+="<div class='panel-heading' role='tab' id='pIntegracao' style='background-color:white'>";
                    txt+="<h4 style='font-size: 15px'>";
                    txt+="<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick='seePergunta("+ row.idPergunta +")'>"
                    txt+=row.titulo_pergunta + "</a></h4><p>" + row.pergunta + "</p></div></div>";
                });

                $("#perguntas_forum").html(txt);
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

function seePergunta(id){
    console.log('seePergunta ' + id);
    req.session.idPergunta = id;
    console.log('session '+req.session.idPergunta);
    window.location = "./perg_resp.html";
};

$('#formNewPergunta').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("A Questão possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.titulo_pergunta = $('#tit_pergunta').val();
        data.pergunta = $('#descricao').val();
        data.data_pergunta = null;
        data.lingua = "PT";
        data.num_likes = 0;
        data.AreaConhecimento_idAreaConhecimento = 3;
        data.Utilizador_idUtilizador = 2;
        
        console.log(data);
       
        $("#formNewPergunta")[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/savePergunta',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Pergunta adicionada com sucesso");
                }
               getPerguntas();
            },
            
        });
    }
});
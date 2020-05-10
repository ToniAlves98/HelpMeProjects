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


function aceitarEvento() {
    var data = {};
    data.idEvento = teste_ped.idEvento;
    data.nomeEvento = teste_ped.nomeEvento;
    data.AreaConhecimento_idAreaConhecimento = teste_ped.AreaConhecimento_idAreaConhecimento;
    data.tipoEvento = teste_ped.tipoEvento;
    data.imagem = teste_ped.imagem;
    data.Utilizador_idUtilizador = teste_ped.Utilizador_idUtilizador;
    data.data_inicio = teste_ped.data_inicio;
    data.data_fim = teste_ped.data_fim;
    data.estado = 'ativo';
    console.log(data);

    $.ajax({
        type: 'POST',
        url: '/aceitar',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
                
            }
            else {
                console.log("Erro");
            }
            getEventosPendentes();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};

$("#aceitarEvento").on("click", function() {
    aceitarEvento();
 });


 function rejeitarEvento() {
    var data = {};
    data.idEvento = teste_ped.idEvento;
    console.log(data);

    $.ajax({
        type: 'DELETE',
        url: '/rejeitar',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
                
            }
            else {
                console.log("Erro");
            }
            getEventos();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};

$("#rejeitarEvento").on("click", function() {
    rejeitarEvento();
 });

var teste_ped= {}
$('#tabela_pedidos').on('click', 'tr', function () {
    $(this).toggleClass('selected');
     //get row contents into an array
     var tableData = $(this).children("td").map(function() {
         return $(this).text();
     }).get();

     teste_ped.idEvento = tableData[0]  
     teste_ped.nomeEvento = tableData[1]
     teste_ped.AreaConhecimento_idAreaConhecimento = tableData[2]
     teste_ped.tipoEvento = tableData[3]
     teste_ped.imagem = tableData [4]
     teste_ped.Utilizador_idUtilizador = tableData[5]
     teste_ped.data_inicio= tableData[6]
     teste_ped.data_fim = tableData[7]
     console.log(teste_ped)
 });


 $(document).ready(function () {
    $("#verEvento").on("click", function (e) {
        e.preventDefault();
        window.open("/uploads/" + teste_ped.imagem)
    });
});
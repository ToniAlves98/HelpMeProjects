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
        dataType: 'json',
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Id</th><th>Nome</th><th>Área de Conhecimento</th><th>Tipo</th><th>Descrição</th><th>Imagem</th><th>Utilizador</th><th>Data de Ínicio</th><th>Data de Fim</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.idEvento + "</td><td>" + row.nomeEvento + "</td><td>" + row.tipo_area + "</td><td>" + row.tipoEvento + "</td><td>" + row.descricao + "</td><td>" + row.imagem + "</td> <td>" + row.nome + "</td><td>" + row.data_inicio + "</td><td>" + row.data_fim + "</td></tr>";

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
    data.descricao = teste_ped.descricao;
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
        dataType: 'json',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#avisoPedidoAceite').modal('show');
            }
            else {
                $('#avisoPedidoAceiteMal').modal('show');
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
    data.estado = "recusado"
    console.log(data);

    $.ajax({
        type: 'POST',
        url: '/rejeitar',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#avisoPedidoEli').modal('show');
            }
            else {
                $('#avisoPedidoEliMal').modal('show');
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
     teste_ped.descricao = tableData[4]
     teste_ped.imagem = tableData [5]
     teste_ped.Utilizador_idUtilizador = tableData[6]
     teste_ped.data_inicio= tableData[7]
     teste_ped.data_fim = tableData[8]
     console.log(teste_ped)
 });


 $(document).ready(function () {
    $("#verEvento").on("click", function (e) {
        e.preventDefault();
        window.open("/uploads/" + teste_ped.imagem)
    });
});

 
$('#formNewPedido').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Pedido possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeEvento = $('#testeEvento').val();
        if ($('#area_conhecimento').val() == "Gestão do Âmbito") {
            data.AreaConhecimento_idAreaConhecimento = 1;
        } else if ($('#area_conhecimento').val() == "Gestão de Aquisições") {
            data.AreaConhecimento_idAreaConhecimento = 2;
        } else if ($('#area_conhecimento').val() == "Gestão da Comunicação") {
            data.AreaConhecimento_idAreaConhecimento = 3;
        } else if ($('#area_conhecimento').val() == "Gestão do Cronograma") {
            data.AreaConhecimento_idAreaConhecimento = 4;
        } else if ($('#area_conhecimento').val() == "Gestão do Custo") {
            data.AreaConhecimento_idAreaConhecimento = 5;
        } else if ($('#area_conhecimento').val() == "Gestão da Integração") {
            data.AreaConhecimento_idAreaConhecimento = 6;
        } else if ($('#area_conhecimento').val() == "Gestão da Qualidade") {
            data.AreaConhecimento_idAreaConhecimento = 7;
        } else if ($('#area_conhecimento').val() == "Gestão dos Recursos") {
            data.AreaConhecimento_idAreaConhecimento = 8;
        } else if ($('#area_conhecimento').val() == "Gestão de Riscos") {
            data.AreaConhecimento_idAreaConhecimento = 9;
        } else if ($('#area_conhecimento').val() == "Gestão dos Stakeholders") {
            data.AreaConhecimento_idAreaConhecimento = 10;
        };
        data.tipoEvento = $('#tipoEvento').val();
        data.descricao = $('#descricao').val();
        data.imagem = ($('#testeEvento').val()) + '.png';
        data.data_inicio = $('#inicioEvento').val();
        data.data_fim = $('#fimEvento').val();
        data.estado = 'pendente';

        console.log(data);
       
        $("#formNewPedido")[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/savePedido',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Pedido adicionado com sucesso");
                }
            },
            
        });
    }
});
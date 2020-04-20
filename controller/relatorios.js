$(document).ready(function () {
    getRelatorios();
});

function getRelatorios() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readRelatorios',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
            
                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Id</th><th>Título</th><th>pdf</th><th>Area de Conhecimento</th><th>Utilizador</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.idRelatorio + "</td><td>" + row.nomeRelatorio + "</td><td>" + row.pdf + "</td><td>" + row.AreaConhecimento_idAreaConhecimento + "</td><td>" + row.Utilizador_idUtilizador + "</td></tr>";

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

$('#formNewRelatorio').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeRelatorio = $('#nome_relatorio').val();
        data.pdf = $('#pdf').val();;
        data.AreaConhecimento_idAreaConhecimento = 1;
        data.Utilizador_idUtilizador = 1;
    
        console.log(data);
       
       //$('#tabela_eventos')[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/saveRelatorio',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Relatório adicionado com sucesso");
                    $('#formNewRelatorio')[0].reset();
                }
                getRelatorios();
            },
        });
    }
});

//Quando selecionar o utilizador carregar os dados para o modal editar
function getDadosRelatorio() {
    var data = {}

    $.ajax({
        type: 'GET',
        url: '/readRelatorios',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#idRelatorio_edi').val(teste_rel.idRelatorio);
                $('#nomeRelatorio_edi').val(teste_rel.nomeRelatorio);
                $('#real-file-editar').val(teste_rel.pdf);
            
             console.log(data)
             
            }
            else {
                console.log("Erro");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};

$('#editar_relatorio').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.idRelatorio =  $('#idRelatorio_edi').val();
        data.nomeRelatorio = $('#nomeRelatorio_edi').val();
        data.pdf = $('#real-file-editar').val();
        data.AreaConhecimento_idAreaConhecimento = teste_rel.AreaConhecimento_idAreaConhecimento;
        data.Utilizador_idUtilizador = teste_rel.Utilizador_idUtilizador;
        
        

        console.log(data);
       
        //$('#')[0].reset();
    
        $.ajax({
            type: 'POST',
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

function removeRelatorio() {
    var data = {};
    data.idRelatorio = teste_rel.idRelatorio;
    console.log(data);

    $.ajax({
        type: 'DELETE',
        url: '/deleteRelatorio',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
            }
            else {
                console.log("Erro");
            }
            getRelatorios();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};

$("#eliminarRelatorio").on("click",  function() {
      removeRelatorio();
 });


var teste_rel = {}
$('#tabela_relatorios').on('click', 'tr', function () {
    $(this).toggleClass('selected');
     //get row contents into an array
     var tableData = $(this).children("td").map(function() {
         return $(this).text();
     }).get();

     getDadosRelatorio();
     
     teste_rel.idRelatorio = tableData[0]  
     teste_rel.nomeRelatorio = tableData[1]
     teste_rel.pdf = tableData[2]
     teste_rel.AreaConhecimento_idAreaConhecimento = tableData[3]
     teste_rel.Utilizador_idUtilizador = tableData[4]
    
     console.log(teste_rel)
 });
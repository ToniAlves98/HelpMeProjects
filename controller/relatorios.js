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
        dataType: 'json',
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
            

                var txt = "";
            
                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Id</th><th>Título</th><th>pdf</th><th>Área de Conhecimento</th><th>Utilizador</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.idRelatorio + "</td><td>" + row.nomeRelatorio + "</td><td>" + row.pdf + "</td><td>" + row.tipo_area + "</td><td>" + row.nome + "</td></tr>";

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

 

$('#formNewRelatorio').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeRelatorio = $('#nome_relatorio').val();
        data.Utilizador_idUtilizador = 1;
        data.pdf = ($('#nome_relatorio').val()) + '.pdf';
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
        data.estado = "ativo"

        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/saveRelatorio',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if (result.status == 200 ) {
                    alert("Relatório adicionado com sucesso");
                }
                else {
                    alert("Não foi adicionado adicionado com sucesso");
                }
                $('#formNewRelatorio')[0].reset();
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
        dataType: 'json',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#idRelatorio_edi').val(teste_rel.idRelatorio);
                $('#nomeRelatorio_edi').val(teste_rel.nomeRelatorio);
                $('#area_conhecimento_edi').val(teste_rel.AreaConhecimento_idAreaConhecimento);
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

$('#formEditarRelatorio').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.idRelatorio = teste_rel.idRelatorio;
        //data.pdf = $('#real-file-editar').val();
        data.nomeRelatorio = $('#nomeRelatorio_edi').val();
        data.pdf = ($('#nomeRelatorio_edi').val()) + '.pdf';
        if ($('#area_conhecimento_edi').val() == "Gestão do Âmbito") {
            data.AreaConhecimento_idAreaConhecimento = 1;
        } else if ($('#area_conhecimento_edi').val() == "Gestão de Aquisições") {
            data.AreaConhecimento_idAreaConhecimento = 2;
        } else if ($('#area_conhecimento_edi').val() == "Gestão da Comunicação") {
            data.AreaConhecimento_idAreaConhecimento = 3;
        } else if ($('#area_conhecimento_edi').val() == "Gestão do Cronograma") {
            data.AreaConhecimento_idAreaConhecimento = 4;
        } else if ($('#area_conhecimento_edi').val() == "Gestão do Custo") {
            data.AreaConhecimento_idAreaConhecimento = 5;
        } else if ($('#area_conhecimento_edi').val() == "Gestão da Integração") {
            data.AreaConhecimento_idAreaConhecimento = 6;
        } else if ($('#area_conhecimento_edi').val() == "Gestão da Qualidade") {
            data.AreaConhecimento_idAreaConhecimento = 7;
        } else if ($('#area_conhecimento_edi').val() == "Gestão dos Recursos") {
            data.AreaConhecimento_idAreaConhecimento = 8;
        } else if ($('#area_conhecimento_edi').val() == "Gestão de Riscos") {
            data.AreaConhecimento_idAreaConhecimento = 9;
        } else if ($('#area_conhecimento_edi').val() == "Gestão dos Stakeholders") {
            data.AreaConhecimento_idAreaConhecimento = 10;
        };

        console.log(data);
       
        $.ajax({
            type: 'POST',
            url: '/setRelatorio',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function(result) {
                if (result.status == 200 ) {
                    alert("Relatório editado com sucesso");
                }
                else {
                    alert("Naõ foi editado com sucesso");
                }
                $('#formEditarRelatorio')[0].reset();
                getRelatorios();
            },
        });
    }
});

function removeRelatorio() {
    var data = {};
    data.idRelatorio = teste_rel.idRelatorio;
    data.estado = "eliminado"
    console.log(data);

    $.ajax({
        type: 'POST',
        url: '/deleteRelatorio',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, status, request) {

            if (request.status == 200) {
                alert("Eliminado com sucesso");
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


/*
function download(){
    const blob = new Blob();
    downloadFile(blob, "cv.pdf") 
}

function downloadFile(blob, filename){
    const url = window.webkitURL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
    document.addEventListener("focus", w=>{window.URL.revokeObjectURL(blob)});
}
*/
$(document).ready(function () {
    $("#downloadRelatorio").on("click", function (e) {
        e.preventDefault();
        //window.location.href = teste_rel.pdf;
        window.open("/uploads/" + teste_rel.pdf)
        // download();   
    });
});


/*
function upload(fakepath){
    var splits = fakepath.split('fakepath\\');
}

$("#real-file").on("change",  function() {
    upload();
});

*/
 //var viewpdf = $("#dataTable")
 //PDFObject.embed(teste_rel.pdf, viewpdf)

 
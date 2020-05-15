$(document).ready(function() {
    getPerguntasInicio();
    countArea();
});

var x = 5;
var y = 0;

function next() {
    x += 5;
    y += 5;
}

function previous() {
    x -= 5;
    y -= 5;
}


function getPerguntasInicio() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readPerguntas',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(data, status, request) {
            if (request.status == 200) {
                var txt = "";
                
                data.slice(y, x).forEach(function(row) {
                    txt += "<div class='panel panel-default'>";
                    txt += "<div class='panel-heading' role='tab' id='pIntegracao' style='background-color:white'>";
                    txt += "<h4 style='font-size: 15px'>";
                    if (row.idUser != null) {
                        txt += "<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"pages('perg_resp'); seePergunta(" + row.idPergunta + ")\">"
                    } else {
                        txt += "<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"alert('Precisas fazer login para ter acesso às perguntas completas')\">"
                    }
                    txt += row.titulo_pergunta + "</a></h4><p>" + row.pergunta + "</p></div></div>";
                });

                $("#perguntas_forum").html(txt);
            } else {
                console.log("Erro");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);

        }

    });

};

function pages(page) {

    load_home("about", page);

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }

    function load_home(var1, var2) {
        $.ajax({
            type: "GET",
            url: "./pages/" + var2 + ".html",
            data: {},
            success: function(data) {
                $("#" + var1).html(data);
            },
            error: function(data, err, err2) {
                console.log(data);
                console.log(err);
                console.log(err2);
                console.log(err2);
            }
        });
        var body = document.body;
        var html = document.documentElement;
    }
    $("#accordionSidebar").children("li").on('click', function() {
        var targetID = $(this).children('a').attr('id');
        //alert(targetID);
        load_home("content-wrapper", targetID);
    });
};

function seePergunta(id) {

    var data = {};
    data.idPergunta = $(id);
    var data2 = {};
    data2.idPergunta = $(id);

    $.ajax({
        type: "POST",
        url: '/getPergunta',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(result, data) {

            var txt = "";
            result.forEach(function(row) {
                txt += "<h2>" + row.titulo_pergunta + "</h2>";
                txt += "<p style=\"margin-top:2px\" data-toggle=\"modal\" data-target=\"#perfil_view\" onclick=\"getPerfil("+row.Utilizador_idUtilizador+")\"><strong>" + row.nome + "</strong></p>";
                txt += "<p style=\"border-bottom: 1px solid #515769;\">" + row.pergunta + "<i class=\"fa fa-thumbs-up\" style = \"position: absolute;right: 15px;\" onclick=\"like(this," + row.num_likes + ")\"></i><a id=\"num_likes\" style = \"position: absolute;right: 0px;\">" + row.num_likes + "</a></p>";

                $.ajax({
                    type: "POST",
                    url: '/getResposta',
                    data: JSON.stringify(data2),
                    contentType: 'application/json; charset=utf-8',

                    success: function(result, data) {

                        var resp = "";
                        result.forEach(function(row) {
                            resp += "<div style=\"border-bottom: 1px solid #515769;\"><p data-toggle=\"modal\" data-target=\"#perfil_view\" onclick=\"getPerfil("+row.Utilizador_idUtilizador+")\"><strong>" + row.nome + "</strong><br><p>" + row.resposta + "<i class=\"fa fa-thumbs-up\" style = \"position: absolute;right: 15px;\" onclick=\"likeResp(this," + row.num_likes + ")\"></i><a id=\"num_likes\" style = \"position: absolute;right: 0px;\">" + row.num_likes + "</a></p></div>";
                        });
                        $("#resposta").html(resp);
                    },
                    error: function(data) {
                        console.log(data)
                    }
                });
            });
            $("#pergunta").html(txt);

        },
        error: function(data) {
            console.log(data)
        }
    });
};

$('#formNewPergunta').on('submit', function(e) {

    if (e.isDefaultPrevented()) {
        alert("A Questão possui erros")
    } else {
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

function like(x, y) {
    var data = {};

    if (x.classList == "fa fa-thumbs-up") {
        data.num_likes = y + 1;
        x.classList.toggle("fa-thumbs-down");
    } else {
        data.num_likes = y - 1;
        x.classList.toggle("fa fa-thumbs-up");
    }

    $.ajax({
        type: 'POST',
        url: '/saveLikes',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(result) {
            console.log('It works: ' + y);
            $("#num_likes").html(y);
        },
    });
}

function likeResp(x, y) {
    var data = {};

    if (x.classList == "fa fa-thumbs-up") {
        data.num_likes = y + 1;
        x.classList.toggle("fa-thumbs-down");
    } else {
        data.num_likes = y - 1;
        x.classList.toggle("fa fa-thumbs-up");
    }

    $.ajax({
        type: 'POST',
        url: '/saveLikesResp',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(result) {
            console.log('It works: ' + y);
            $("#num_likes").html(y);
        },
    });
}

function getPerfil(id) {
    var data = {};
    data.idUtilizador = id;

    $.ajax({
        type: 'POST',
        url: '/getUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(result, data) {

            result.forEach(function(row){
                if(row.perfil == "privado"){
                    console.log('Privado');
                    alert('Este perfil é privado!');

                }else{
                    console.log('Publico');
                    $("#nomeUtilizador").html(row.nome);
                    $("#profissao").html(row.profissao);

                    if(row.profissao == "Estudante"){
                        $("#email").html("Email: " + row.email);
                        $("#idade").html("Idade: " + row.idade);
                        $("#genero").html("Género: " + row.genero);
                        $("#ciclo").html("Ciclo de Estudos: " + row.ciclo_estudo);
                        $("#descricao").html("Descrição: " + row.descricao);

                    } else if (row.profissao == "Professor/Investigador") {
                        $("#email").html("Email: " + row.email);
                        $("#idade").html("Idade: " + row.idade);
                        $("#genero").html("Género: " + row.genero);
                        $("#descricao").html("Descrição: " + row.descricao);
                        $("#ciclo").html("Área Científica: " + row.area_cientifica);

                    } else if (row.profissao == "Gestor de Projetos") {
                        $("#email").html("Email: " + row.email);
                        $("#idade").html("Idade: " + row.idade);
                        $("#ciclo").html("Ramo Empresarial: " + row.ramo_emp);
                        $("#genero").html("Género: " + row.genero);
                        $("#descricao").html("Descrição: " + row.descricao);

                    } else if (row.profissao == "Empresa") {
                        $("#email").html("Email: " + row.email);
                        $("#idade").html("Ramo Empresarial: " + row.ramo_emp);
                        $("#descricao").html("Descrição: " + row.descricao);
                        $("#genero").html("Nº de Empregados: " + row.num_trabalhadores);
                        $("#ciclo").html("Região do País: " + row.regiao_pais);

                    } else {
                        console.log('No Email?');
                    }
                }
            });
        },
    });
};

function countArea() {

    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '/graficoPerguntaArea',
        //os dados recebidos do model estão na variável data
        success: function (data) {
            console.log(data)
            //criação de uma tabela para demonstração dos resultados recebidos
            //$('#gIntegracao').val(data[5].numero);
            var gAmbito = data[0].numero;
            var gAquisicoes = data[1].numero;
            var gComunicacao = data[2].numero;
            var gCronograma = data[3].numero;
            var gCusto = data[4].numero;
            var gIntegracao = data[5].numero;
            var gQualidade = data[6].numero;
            var gRecursos = data[7].numero;
            var gRiscos = data[8].numero;
            var gStakeholders = data[9].numero;

            $('#gAmbito').html("(" + gAmbito + ")");
            $('#gAquisicoes').html("(" + gAquisicoes + ")");
            $('#gComunicacao').html("(" + gComunicacao + ")");
            $('#gCronograma').html("(" + gCronograma + ")");
            $('#gCusto').html("(" + gCusto + ")");
            $('#gIntegracao').html("(" + gIntegracao + ")");
            $('#gQualidade').html("(" + gQualidade + ")");
            $('#gRecursos').html("(" + gRecursos + ")");
            $('#gRiscos').html("(" + gRiscos + ")");
            $('#gStakeholders').html("(" + gStakeholders + ")");
        }
    });

};
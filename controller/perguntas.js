$(document).ready(function () {
    getPerguntasInicio();
    countArea();
});

var idA = 0;
var x = 5;
var y = 0;
var buttonP = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"previous()\">Previous</a>";
var buttonN = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"next()\">Next</a>";
var buttonA = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"previous()\">Anterior</a>";
var buttonS = "<a class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"next()\">Seguinte</a>";
var buttonFPT = "<div class=\"row\">" + buttonA + buttonS + "</div>";
var buttonFEN = "<div class=\"row\">" + buttonP + buttonN + "</div>";
var buttonPA = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"previous()\">Previous</a>";
var buttonNA = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"next()\">Next</a>";
var buttonAA = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"previous()\">Anterior</a>";
var buttonSA = "<a class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"next()\">Seguinte</a>";
var buttonFPTA = "<div class=\"row\">" + buttonAA + buttonSA + "</div>";
var buttonFENA = "<div class=\"row\">" + buttonPA + buttonNA + "</div>";


function next() {
    x += 5;
    y += 5;
    getPerguntasInicio();
}

function previous() {
    x -= 5;
    y -= 5;
    getPerguntasInicio();
}

function nextA(id) {
    x += 5;
    y += 5;
    getAreaConhecimento(id);
}

function previousA(id) {
    x -= 5;
    y -= 5;
    getAreaConhecimento(id);
}


function getPerguntasInicio() {
    var lin = document.getElementById("lin").textContent;
    var data = {};
    data.lingua = lin;

    $.ajax({
        type: "POST",
        url: '/readPerguntas',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, status, request) {
            if (request.status == 200) {
                var txt = "";

                data.slice(y, x).forEach(function (row) {
                    if (lin == "PT") {
                        if (y == 0 && (data.length - x) <= 0) {
                            console.log('noButtons');
                        } if (y == 0) {
                            $("#page").html(buttonS);
                            console.log(y+' seg '+x);
                        } else if ((data.length - x) <= 0) {
                            $("#page").html(buttonA);
                            console.log('ant');
                        } else {
                            $("#page").html(buttonFPT);
                            console.log('amb');
                        }
                    } else if (lin == "EN") {
                        if (y == 0 && (data.length - x) <= 0) {
                            console.log('noButtons');
                        } else if (y == 0) {
                            $("#page").html(buttonN);
                        } else if ((data.length - x) <= 0) {
                            $("#page").html(buttonP);
                        } else {
                            $("#page").html(buttonFEN);
                        }
                    }
                    txt += "<div class='panel panel-default'>";
                    txt += "<div class='panel-heading' role='tab' id='pIntegracao' style='background-color:white'>";
                    txt += "<h4 style='font-size: 15px'>";
                    if (row.idUser != null && row.idUser != 0) {
                        if(lin == "EN"){
                            txt += "<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"pages('perg_resp_en'); seePergunta(" + row.idPergunta + ")\">"
                        }else{
                            txt += "<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"pages('perg_resp'); seePergunta(" + row.idPergunta + ")\">"
                        }
                    } else {
                        txt += "<a class='panel-title-child' role='button' data-parent='#accordion' data-toggle='modal' data-target='#avisoPLoginNec'>"
                    }
                    txt += row.titulo_pergunta + "</a></h4><p>" + row.pergunta + "</p></div></div>";
                });

                $("#perguntas_forum").html(txt);
            } else {
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

function pages(page) {
    load_home("about", page);
    var x = 5;
    var y = 0;

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }

    function load_home(var1, var2) {
        $.ajax({
            type: "GET",
            url: "./pages/" + var2 + ".html",
            data: {},
            success: function (data) {
                $("#" + var1).html(data);
            },
            error: function (data, err, err2) {
                console.log(data);
                console.log(err);
                console.log(err2);
                console.log(err2);
            }
        });
        var body = document.body;
        var html = document.documentElement;
    }
    $("#accordionSidebar").children("li").on('click', function () {
        var targetID = $(this).children('a').attr('id');
        //alert(targetID);
        load_home("content-wrapper", targetID);
    });
};

function seePergunta(id) {
    console.log('seePergunta');
    var data = {};
    data.idPergunta = $(id);
    var data2 = {};
    data2.idPergunta = $(id);
    
    var txt = "";

    $.ajax({
        type: "POST",
        url: '/getPergunta',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result, data) {
            console.log('seePergunta:pergunta' + result);

            result.forEach(function (row) {
                txt += "<h2>" + row.titulo_pergunta + "</h2>";
                txt += "<p style=\"margin-top:2px\" data-toggle=\"modal\" data-target=\"#perfil_view\" onclick=\"getPerfil(" + row.Utilizador_idUtilizador + ")\"><strong>" + row.nome + "</strong></p>";
                txt += "<p style=\"border-bottom: 1px solid #515769;\">" + row.pergunta + "<i class=\"fa fa-thumbs-up\" style = \"position: absolute;right: 15px;\" onclick=\"like(this," + row.num_likes + ")\"></i><a id=\"num_likes\" style = \"position: absolute;right: 0px;\">" + row.num_likes + "</a></p>";

                $.ajax({
                    type: "POST",
                    url: '/getResposta',
                    data: JSON.stringify(data2),
                    contentType: 'application/json; charset=utf-8',

                    success: function (result, data) {
                        console.log('seePergunta:resposta'  + result);

                        var resp = "";
                        result.forEach(function (row) {
                            resp += "<div style=\"border-bottom: 1px solid #515769;\"><p data-toggle=\"modal\" data-target=\"#perfil_view\" onclick=\"getPerfil(" + row.Utilizador_idUtilizador + ")\"><strong>" + row.nome + "</strong><br><p>" + row.resposta + "<i class=\"fa fa-thumbs-up\" style = \"position: absolute;right: 15px;\" onclick=\"likeResp(this," + row.num_likes + ","+row.idResposta+")\"></i><a id=\"num_likes_resp"+row.idResposta+"\" style = \"position: absolute;right: 0px;\">" + row.num_likes + "</a></p></div>";
                        });
                        $("#resposta").html(resp);
                    },
                    error: function (data) {
                        console.log(data)
                    }
                });
            });
            $("#pergunta").html(txt);

        },
        error: function (data) {
            console.log(data)
        }
    });
};

$('#formNewPergunta').on('submit', function (e) {

    var lin = document.getElementById("lin").textContent;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    if (e.isDefaultPrevented()) {
        alert("A Questão possui erros")
    } else {
        event.preventDefault();
        var data = {};
        data.titulo_pergunta = $('#tit_pergunta').val();
        data.pergunta = $('#descricao').val();
        data.data_pergunta = date;
        data.lingua = lin;
        data.num_likes = 0;
        if ($('#per_are').val() == "Gestão do Âmbito") {
            data.AreaConhecimento_idAreaConhecimento = 1;
        } else if ($('#per_are').val() == "Gestão de Aquisições") {
            data.AreaConhecimento_idAreaConhecimento = 2;
        } else if ($('#per_are').val() == "Gestão da Comunicação") {
            data.AreaConhecimento_idAreaConhecimento = 3;
        } else if ($('#per_are').val() == "Gestão do Cronograma") {
            data.AreaConhecimento_idAreaConhecimento = 4;
        } else if ($('#per_are').val() == "Gestão do Custo") {
            data.AreaConhecimento_idAreaConhecimento = 5;
        } else if ($('#per_are').val() == "Gestão da Integração") {
            data.AreaConhecimento_idAreaConhecimento = 6;
        } else if ($('#per_are').val() == "Gestão da Qualidade") {
            data.AreaConhecimento_idAreaConhecimento = 7;
        } else if ($('#per_are').val() == "Gestão dos Recursos") {
            data.AreaConhecimento_idAreaConhecimento = 8;
        } else if ($('#per_are').val() == "Gestão de Riscos") {
            data.AreaConhecimento_idAreaConhecimento = 9;
        } else if ($('#per_are').val() == "Gestão dos Stakeholders") {
            data.AreaConhecimento_idAreaConhecimento = 10;
        };

        $.ajax({
            type: 'POST',
            url: '/savePergunta',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if (result.status == 200) {
                    $('#add_pergunta').modal('hide');
                    $('body').removeClass('modal-open');
                    $('body').css('padding-right', '0px');
                    $('.modal-backdrop').remove();
                    $('#avisoPerguntaAdd').modal('show');
                }
                else if (result.status == 202) {
                    $('#add_pergunta').modal('hide');
                    $('body').removeClass('modal-open');
                    $('body').css('padding-right', '0px');
                    $('.modal-backdrop').remove();
                    $('#avisoPerguntaAddMal2').modal('show');
                }
                else if (result.status == 201) {
                    $('#add_pergunta').modal('hide');
                    $('body').removeClass('modal-open');
                    $('body').css('padding-right', '0px');
                    $('.modal-backdrop').remove();
                    $('#avisoPLoginNec').modal('show');
                } else {
                    $('#add_pergunta').modal('hide');
                    $('body').removeClass('modal-open');
                    $('body').css('padding-right', '0px');
                    $('.modal-backdrop').remove();
                    $('#avisoPLoginNec2').modal('show');
                }
                getPerguntasInicio();
                $("#formNewPergunta")[0].reset();
                countArea();
            },

        });
    }
});

function like(x, y) {
    var data = {};

    if (x.classList == "fa fa-thumbs-up") {
        data.num_likes = y + 1;
        x.classList.remove("fa", "fa-thumbs-up");
        x.classList.add("fa", "fa-thumbs-down");
    } else {
        data.num_likes = y - 1;
        x.classList.remove("fa", "fa-thumbs-down");
        x.classList.add("fa", "fa-thumbs-up");
    }

    $.ajax({
        type: 'POST',
        url: '/saveLikes',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            result.forEach(function (row) {
                $("#num_likes").html(row.num_likes);
            });
        },
    });
}

function likeResp(x, y, z) {
    var data = {};
    data.idResposta = z;
    y = document.getElementById("num_likes_resp"+z+"").textContent;

    if (x.classList == "fa fa-thumbs-up") {
        data.num_likes = y + 1;
        //x.classList.toggle("fa-thumbs-down");
        x.classList.remove("fa", "fa-thumbs-up");
        x.classList.add("fa", "fa-thumbs-down");
    } else {
        data.num_likes = y - 1;
        //x.classList.toggle("fa fa-thumbs-up");
        x.classList.remove("fa", "fa-thumbs-down");
        x.classList.add("fa", "fa-thumbs-up");
    }

    $.ajax({
        type: 'POST',
        url: '/saveLikesResp',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data, result) {
            data.forEach(function (row) {
                console.log("num_likes_resp"+row.idResposta+"");
                $("num_likes_resp"+row.idResposta+"").html(row.num_likes);
            });
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
        dataType: 'json',
        success: function (result, data) {

            result.forEach(function (row) {
                if (row.perfil == "privado") {
                    alert('Este perfil é privado!');

                } else {
                    $("#nomeUtilizador").html(row.nome);
                    $("#profissao").html(row.profissao);

                    if (row.profissao == "Estudante") {
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

function getAreaConhecimento(id) {
    if (idA != id) {
        x = 5;
        y = 0;
        idA = id;
    }
    var lin = document.getElementById("lin").textContent;
    var data = {};
    data.AreaConhecimento_idAreaConhecimento = id;
    data.lingua = lin;
    var txt = "";

    var buttonPA = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"previousA(" + id + ")\">Previous</a>";
    var buttonNA = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"nextA(" + id + ")\">Next</a>";
    var buttonAA = "<a style=\"margin-right: 10px; margin-left: 20px;\" class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"previousA(" + id + ")\">Anterior</a>";
    var buttonSA = "<a class=\"btn-theme btn-theme-sm btn-white-bg text-uppercase\" onclick=\"nextA(" + id + ")\">Seguinte</a>";
    console.log('buttons updated');

    $.ajax({
        type: 'POST',
        url: '/readPerguntasPorArea',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result, data) {
            console.log('buttons pre');

            result.slice(y, x).forEach(function (row) {
                if (lin == "PT") {
                    if (y == 0 && (data.length - x) <= 0) {
                        console.log('noButtons');
                    } if (y == 0) {
                        $("#page").html(buttonSA);
                        console.log('buttons next');
                    } else if ((data.length - x) <= 0) {
                        $("#page").html(buttonAA);
                    } else {
                        $("#page").html(buttonFPTA);
                    }
                } else if (lin == "EN") {
                    if (y == 0 && (data.length - x) <= 0) {
                        console.log('noButtons');
                    } else if (y == 0) {
                        $("#page").html(buttonNA);
                    } else if ((data.length - x) <= 0) {
                        $("#page").html(buttonPA);
                    } else {
                        $("#page").html(buttonFENA);
                    }
                }
                txt += "<div class='panel panel-default'>";
                txt += "<div class='panel-heading' role='tab' id='pIntegracao' style='background-color:white'>";
                txt += "<h4 style='font-size: 15px'>";
                if (row.idUser != null) {
                    txt += "<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"pages('perg_resp'); seePergunta(" + row.idPergunta + ")\">"
                } else {
                    txt += "<a class='panel-title-child' role='button' data-parent='#accordion' data-toggle='modal' data-target='#avisoPLoginNec'>"
                }
                txt += row.titulo_pergunta + "</a></h4><p>" + row.pergunta + "</p></div></div>";
            });

            $("#perguntas_forum").html(txt);
        },
    });
};

function countArea() {
    var lin = document.getElementById("lin").textContent;
    var data = {};
    data.lingua = lin;

    //chamada ajax
    $.ajax({
        type: 'POST',
        url: '/getNumPerguntas',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
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

$('#novaResposta').on('submit', function (e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formulario com erros")
    } else {
        event.preventDefault();

        var data = {};
        data.resposta = $('#texto').val();

        $.ajax({
            type: 'POST',
            url: '/saveResposta',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data, status, result) {

                if (result.status == 200) {
                    $('#avisoRespostaAdd').modal('show');
                    data.forEach(function (row) {
                        
                    seePergunta(row.Pergunta_idPergunta);
                    $("#novaResposta")[0].reset();
                    });
                }
                else if (result.status == 202 || data.status == 202) {
                    $('#avisoRespostaAddMal').modal('show');
                }

            },
            error: function (data) {
                console.log(data)
            }
        });
    }
});
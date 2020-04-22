$(document).ready(function () {
    getEstudante(); 
});

var user = {}
$('#tabela_estudante').on('click', 'tr', function () {
    $(this).toggleClass('selected');
    //get row contents into an array
    var tableData = $(this).children("td").map(function () {
        return $(this).text();
    }).get();
    getDadosEstudante();

    user.idUtilizador = tableData[0]
    user.nome = tableData[1]
    user.idade = tableData[2]
    user.genero = tableData[3]
    user.profissao = tableData[4]
    user.email = tableData[7]
    user.password = tableData[8]
    user.descricao = tableData[9]
    user.area_cientifica = tableData[5]
    user.ciclo_estudo = tableData[6]
    console.log(user)
});

$('#eliminar_estudante').on('click', function () {
    removeEstudante();
});

//Carregar dados para a página gestão de utilizadores
function getEstudante() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readEstudante',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";

                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Id</th><th>Nome</th><th>Idade</th><th>Género</th><th>Profissão</th><th>Área de Conhecimento</th><th>Ciclo de Estudo</th><th>Email</th><th>Password</th><th>Descrição</th><th>Perfil</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.idUtilizador + "</td><td>" + row.nome + "</td><td>" + row.idade + "</td><td>" + row.genero + "</td><td>" + row.profissao +
                        "</td><td>" + row.area_cientifica + "</td><td>" + row.ciclo_estudo + "</td><td>" + row.email +
                        "</td><td>" + row.password + "</td><td>" + row.descricao + "</td><td>" + row.perfil + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_estudante").html(txt);
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

//Quando selecionar o utilizador carregar os dados para o modal editar
function getDadosEstudante() {
    var data = {}

    $.ajax({
        type: 'GET',
        url: '/readEstudante',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#idUtilizador').val(user.idUtilizador);
                $('#nome_estudante').val(user.nome);
                $('#idade_estudante').val(user.idade);
                $('#genero_estudante').val(user.genero);
                $('#profissao_estudante').val(user.profissao);
                $('#email_estudante').val(user.email);
                $('#password_estudante').val(user.password);
                $('#descricao_estudante').val(user.descricao);
                $('#area_estudante').val(user.area_cientifica);
                $('#estudo_estudante').val(user.ciclo_estudo);
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


$('#formEditarEstudante').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.idUtilizador = user.idUtilizador;
        data.nome = $('#nome_estudante').val();
        data.idade = $('#idade_estudante').val();
        data.genero = $('#genero_estudante').val();
        data.profissao = $('#profissao_estudante').val();
        data.email = $('#email_estudante').val();
        data.password = $('#password_estudante').val();
        data.descricao = $('#descricao_estudante').val();
        if ($('#area_estudante').val("Estudante")) {
            data.area_cientifica = null
        } else { 
            data.area_cientifica = $('#area_estudante').val();
        }
        data.ciclo_estudo = $('#estudo_estudante').val();

        console.log(data);
        $('#formEditarEstudante')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/setEstudante',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.status == 200) {
                    alert("Editado com sucesso")
                }
                else {
                    alert("Não foi editado com sucesso");
                }
                getEstudante();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(errorThrown);
                alert("erro");
            }
        });
    }
});

function removeEstudante() {
    var data = {};
    data.idUtilizador = user.idUtilizador;
    console.log(data);

    $.ajax({
        type: 'DELETE',
        url: '/deleteUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function (data, status, request) {

            if (request.status == 200) { 
            }
            else {
                console.log("Erro");
            }
            getEstudante();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};
$(document).ready(function () {
    getGestor();
});

var user = {}
$('#tabela_gestor').on('click', 'tr', function () {
    $(this).toggleClass('selected');
    //get row contents into an array
    var tableData = $(this).children("td").map(function () {
        return $(this).text();
    }).get();
    getDadosGestor();

    user.idUtilizador = tableData[0]
    user.nome = tableData[1]
    user.idade = tableData[2]
    user.genero = tableData[3]
    user.profissao = tableData[4]
    user.email = tableData[5]
    user.password = tableData[6]
    user.descricao = tableData[7]
    user.ramo_emp = tableData[8]
    user.num_trabalhadores = tableData[9]
    user.regiao_pais = tableData[10]
    console.log(user)
});

$('#eliminar_gestor').on('click', function () {
    removeGestor();
});

//Carregar dados para a página gestão de utilizadores
function getGestor() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readGestor',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";

                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Id</th><th>Nome</th><th>Idade</th><th>Género</th><th>Profissão</th><th>Ramo Empresarial</th><th>Nº trabalhadores</th><th>Região País</th><th>Email</th><th>Password</th><th>Descrição</th><th>Perfil</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.idUtilizador + "</td><td>" + row.nome + "</td><td>" + row.idade + "</td><td>" + row.genero + "</td><td>" + row.profissao +
                        "</td><td>" + row.ramo_emp + "</td><td>" + row.num_trabalhadores + "</td><td>" + row.regiao_pais +
                        "</td><td>" + row.email + "</td><td>" + row.password + "</td><td>" + row.descricao + "</td><td>" + row.perfil + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_gestor").html(txt);
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
function getDadosGestor() {
    var data = {}

    $.ajax({
        type: 'GET',
        url: '/readGestor',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#idUtilizador').val(user.idUtilizador);
                $('#nome_gestor').val(user.nome);
                $('#idade_gestor').val(user.idade);
                $('#genero_gestor').val(user.genero);
                $('#profissao_gestor').val(user.profissao);
                $('#email_gestor').val(user.email);
                $('#password_gestor').val(user.password);
                $('#descricao_gestor').val(user.descricao);
                $('#ramoEp_gestor').val(user.ramo_emp);
                $('#nEmpregados_gestor').val(user.num_trabalhadores);
                $('#regiao_gestor').val(user.regiao_pais);
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


('#formEditarGestor').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.idUtilizador = user.idUtilizador;
        data.nome = $('#nome_gestor').val();
        data.idade = $('#idade_gestor').val();
        data.genero = $('#genero_gestor').val();
        data.profissao = $('#profissao_gestor').val();
        data.email = $('#email_gestor').val();
        data.password = $('#password_gestor').val();
        data.descricao = $('#descricao_gestor').val();
        data.ramo_emp = $('#ramoEp_gestor').val();
        data.num_trabalhadores = $('#nEmpregados_gestor').val();
        data.regiao_pais = $('#regiao_gestor').val();
        //data.perfil = 'Perfil p�blico';

        console.log(data);
        $('#formEditarGestor')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/setGestorr',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.status == 200) {
                    alert("Editado com sucesso")
                }
                else {
                    alert("Não foi editado com sucesso");
                }
                getGestor();
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

function removeGestor() {
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
            getGestor();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};
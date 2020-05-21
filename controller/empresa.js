$(document).ready(function () {
    getEmpresa();
});

var user = {}
$('#tabela_empresa').on('click', 'tr', function () {
    $(this).toggleClass('selected');
    //g/et row contents into an array
    var tableData = $(this).children("td").map(function () {
        return $(this).text();
    }).get();
    getDadosEmpresa();

    user.idUtilizador = tableData[0]
    user.nome = tableData[1]
    user.profissao = tableData[2]
    user.email = tableData[6]
    user.password = tableData[7]
    user.descricao = tableData[8]
    user.ramo_emp = tableData[3]
    user.num_trabalhadores = tableData[4]
    user.regiao_pais = tableData[5]
    console.log(user)
});

$('#eliminar_empresa').on('click', function () {
    removeEmpresa();
});

//Carregar dados para a página gestão de utilizadores
function getEmpresa() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readEmpresa',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";

                txt += '<table class="table table-hover table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Id</th><th>Nome</th><th>Profissão</th><th>Ramo Empresarial</th><th>Nº trabalhadores</th><th>Região do País</th><th>Email</th><th>Password</th><th>Descrição</th><th>Perfil</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.idUtilizador + "</td><td>" + row.nome + "</td><td>" + row.profissao +
                        "</td><td>" + row.ramo_emp + "</td><td>" + row.num_trabalhadores + "</td><td>" + row.regiao_pais +
                        "</td><td>" + row.email + "</td><td>" + row.password + "</td><td>" + row.descricao + "</td><td>" + row.perfil + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_empresa").html(txt);
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
function getDadosEmpresa() {
    var data = {}

    $.ajax({
        type: 'GET',
        url: '/readEmpresa',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#idUtilizador').val(user.idUtilizador);
                $('#nome_empresa').val(user.nome);
                $('#profissao_empresa').val(user.profissao);
                $('#email_empresa').val(user.email);
                $('#password_empresa').val(user.password);
                $('#descricao_empresa').val(user.descricao);
                $('#ramoEp_empresa').val(user.ramo_emp);
                $('#nEmpregados_empresa').val(user.num_trabalhadores);
                $('#regiao_empresa').val(user.regiao_pais);
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


$('#formEditarEmpresa').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.idUtilizador = user.idUtilizador;
        data.nome = $('#nome_empresa').val();
        data.profissao = $('#profissao_empresa').val();
        data.email = $('#email_empresa').val();
        data.password = $('#password_empresa').val();
        data.descricao = $('#descricao_empresa').val();
        data.ramo_emp = $('#ramoEp_empresa').val();
        data.num_trabalhadores = $('#nEmpregados_empresa').val();
        data.regiao_pais = $('#regiao_empresa').val();

        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/setEmpresa',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result = { "success": "Utilizador editado com sucesso", "status": 200 }) {
                    alert("Editado com sucesso");
                }
                else {
                    alert("Não foi editado com sucesso")
                }
                $('#formEditarEmpresa')[0].reset();
                getEmpresa();
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

function removeEmpresa() {
    var data = {};
    data.idUtilizador = user.idUtilizador;
    data.estado = "eliminado";
    console.log(data);

    $.ajax({
        type: 'POST',
        url: '/deleteUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function (data, status, request) {

            if (request.status == 200) {
            }
            else {
                console.log("Erro");
            }
            getEmpresa();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};
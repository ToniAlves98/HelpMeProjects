$(document).ready(function () {
    getUtilizador(); 
});

var user = {}
$('#tabela_utilizador').on('click', 'tr', function () {
    $(this).toggleClass('selected');
    //get row contents into an array
    var tableData = $(this).children("td").map(function () {
        return $(this).text();
    }).get();
    getDadosUtilizador();

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
    user.area_cientifica = tableData[11]
    user.ciclo_estudo = tableData[12]
    console.log(user)
});

//Carregar dados para a página gestão de utilizadores
function getUtilizador() {
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

                $("#tabela_utilizador").html(txt);
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
function getDadosUtilizador() {
    var data = {}

    $.ajax({
        type: 'GET',
        url: '/readUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#idUtilizador').val(user.idUtilizador);
                $('#nome').val(user.nome);
                $('#idade').val(user.idade);
                $('#genero').val(user.genero);
                $('#profissao').val(user.profissao);
                $('#email').val(user.email);
                $('#password').val(user.password);
                $('#descricao').val(user.descricao);
                $('#ramoEp').val(user.ramo_emp);
                $('#nEmpregados').val(user.num_trabalhadores);
                $('#regiao').val(user.regiao_pais);
                $('#area').val(user.area_cientifica);
                $('#estudo').val(user.ciclo_estudo);
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


('#formEditarUtilizador').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.idUtilizador = user.idUtilizador;
        data.nome = $('#nome').val();
        data.idade = $('#idade').val();
        data.genero = $('#genero').val();
        data.profissao = $('#profissao').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();
        data.ramo_emp = $('#ramoEp').val();
        data.num_trabalhadores = $('#nEmpregados').val();
        data.regiao_pais = $('#regiao').val();
        data.area_cientifica = $('#area').val();
        data.ciclo_estudo = $('#estudo').val();
        //data.perfil = 'Perfil p�blico';

        console.log(data);
        $('#formEditarUtilizador')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/setUtilizador',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.status == 200) {
                    alert("Editado com sucesso")
                }
                else {
                    alert("Não foi editado com sucesso");
                }
                getUtilizador();
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


$(document).ready(function () {
    getUtilizador();
    getDadosUtilizador();
});

///Carregar o registo de um novo utilzador
('#formNewRegisto').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.profissao = $('#profissao').val();
        data.ramo_emp = $('#ramoEp').val();
        data.num_trabalhadores = $('#nEmpregados').val();
        data.regiao_pais = $('#regiao').val();
        data.area_cientifica = $('#area').val();
        data.ciclo_estudo = $('#estudo').val();
        data.nome = $('#nome').val();
        data.idade = $('#idade').val();
        data.genero = $('#genero').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();
        data.perfil = 'Perfil público';

        console.log(data);
        $('#formNewRegisto')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/saveUtilizador',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.status == 200) {
                    alert("Bem Vindo à HeplMe Projects")
                    window.location.assign("/forum");
                }
                else {
                    alert("O seu Registo não foi efetuado, por favor tente outra vez");
                }
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

//Carregar dados para a página gestão de utilizadores
function getUtilizador() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',


        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";

                txt += '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Nome</th><th>Idade</th><th>Género</th><th>Profissão</th><th>Ramo Empresarial</th><th>Nº Empregados</th><th>Região do País</th><th>Área de Conhecimento</th><th>Ciclo de Estudo</th><th>Email</th><th>Password</th><th>Descrição</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.nome + "</td><td>" + row.idade + "</td><td>" + row.genero + "</td><td>" + row.profissao +
                        "</td><td>" + row.ramo_emp + "</td><td>" + row.num_trabalhadores + "</td><td>" + row.regiao_pais + "</td><td>" + row.area_cientifica +
                        "</td><td>" + row.ciclo_estudo + "</td><td>" + row.email + "</td><td>" + row.password + "</td><td>" + row.descricao + "</td></tr>";

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
    var data = {};
    data.idUtilizador = 1;

    $.ajax({
        type: 'GET',
        url: '/readUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function (data, status, request) {
            if (request.status == 200) {
                $('#profissao').val(data[0].profissao);
                $('#ramoEp').val(data[0].ramo_emp);
                $('#nEmpregados').val(data[0].num_trabalhadores);
                $('#regiao').val(data[0].regiao_pais);
                $('#area').val(data[0].area_cientifica);
                $('#estudo').val(data[0].ciclo_estudo);
                $('#nome').val(data[0].nome);
                $('#idade').val(data[0].idade);
                $('#genero').val(data[0].genero);
                $('#email').val(data[0].email);
                $('#password').val(data[0].password);
                $('#descricao').val(data[0].descricao);
                console.log(data);
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
        data.idUtilizador = 1
        data.profissao = $('#profissao').val();
        data.ramo_emp = $('#ramoEp').val();
        data.num_trabalhadores = $('#nEmpregados').val();
        data.regiao_pais = $('#regiao').val();
        data.area_cientifica = $('#area').val();
        data.ciclo_estudo = $('#estudo').val();
        data.nome = $('#nome').val();
        data.idade = $('#idade').val();
        data.genero = $('#genero').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();
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
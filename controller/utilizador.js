$(document).ready(function () {
    dadosUtilizador();
});

//Carregar o registo de um novo utilzador
$('#formNewRegisto').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.nome = $('#nome').val();
        data.profissao = $('#profissao').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();
        data.perfil = "Perfil público";
        if ($('#profissao').val() == "Estudante") {
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.gp_nome_emp = '';
            data.ramo_emp = '';
            data.num_trabalhadores = 0;
            data.regiao_pais = '';
            data.area_cientifica = '';
            data.ciclo_estudo = $('#estudo').val();
        }
        else if ($('#profissao').val() == "Professor/Investigador") {
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.gp_nome_emp = '';
            data.ramo_emp = '';
            data.num_trabalhadores = 0;
            data.regiao_pais = '';
            data.area_cientifica = $('#area').val();
            data.ciclo_estudo = '';
        }
        else if ($('#profissao').val() == "Gestor de Projeto" && $('#nEmpregados_gp') == "") { //não funciona pqp
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.descricao = $('#descricao').val();
            data.gp_nome_emp = $('#gp_nome_emp').val();;
            data.ramo_emp = $('#ramoEp_gp').val();
            data.num_trabalhadores = 0;
            data.regiao_pais = $('#regiao_gp').val();
            data.area_cientifica = '';
            data.ciclo_estudo = '';
        }
        else if ($('#profissao').val() == "Gestor de Projeto") {
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.descricao = $('#descricao').val();
            data.gp_nome_emp = $('#gp_nome_emp').val();;
            data.ramo_emp = $('#ramoEp_gp').val();
            data.num_trabalhadores = $('#nEmpregados_gp').val();
            data.regiao_pais = $('#regiao_gp').val();
            data.area_cientifica = '';
            data.ciclo_estudo = '';
        }
        else if ($('#profissao').val() == "Empresa") {
            data.idade = 0;
            data.genero = '';
            data.gp_nome_emp = '';
            data.ramo_emp = $('#ramoEp').val();
            data.num_trabalhadores = $('#nEmpregados').val();
            data.regiao_pais = $('#regiao').val();
            data.area_cientifica = '';
            data.ciclo_estudo = '';
           
        } else { };

        console.log(data);
        $('#formNewRegisto')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/saveUtilizador',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.status == 200) {
                    alert("O seu Registo não foi efetuado, por favor tente outra vez");
                }
                else {
                    alert("Bem Vindo à HeplMe Projects")
                    window.location.assign("/forum");
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

//Carregar dados para a página perfil utilziador
function dadosUtilizador() {
    var data = {};

    $.ajax({
        type: 'GET',
        url: '/readUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#nome').val(data[0].nome);
                $('#idade').val(data[0].idade);
                $('#genero').val(data[0].genero);
                $('#profissao').val(data[0].profissao);
                $('#email').val(data[0].email);
                $('#password').val(data[0].password);
                $('#descricao').val(data[0].descricao);
                $('#gp_nome_emp').val(data[0].gp_nome_emp);
                $('#ramoEp').val(data[0].ramo_emp);
                $('#nEmpregados').val(data[0].num_trabalhadores);
                $('#regiao').val(data[0].regiao_pais);
                $('#area').val(data[0].area_cientifica);
                $('#estudo').val(data[0].ciclo_estudo);
                $('perfil').val(data[0].perfil);
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

//Carregar os dados atualizados pelo utilizador
$('#formUtilizador').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.nome = $('#nome').val();
        data.profissao = $('#profissao').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();
        if ($('#profissao').val() == "Estudante") {
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.gp_nome_emp = '';
            data.ramo_emp = '';
            data.num_trabalhadores = 0;
            data.regiao_pais = '';
            data.area_cientifica = '';
            data.ciclo_estudo = $('#estudo').val();
            data.perfil = $('#perfil').val(); //ver isto
        }
        else if ($('#profissao').val() == "Professor/Investigador") {
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.gp_nome_emp = '';
            data.ramo_emp = '';
            data.num_trabalhadores = 0;
            data.regiao_pais = '';
            data.area_cientifica = $('#area').val();
            data.ciclo_estudo = '';
            data.perfil = $('#perfil').val(); //ver isto
        }
        else if ($('#profissao').val() == "Gestor de Projeto" && $('#nEmpregados_gp') == "") { //não funciona pqp
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.descricao = $('#descricao').val();
            data.gp_nome_emp = $('#gp_nome_emp').val();;
            data.ramo_emp = $('#ramoEp_gp').val();
            data.num_trabalhadores = 0;
            data.regiao_pais = $('#regiao_gp').val();
            data.area_cientifica = '';
            data.ciclo_estudo = '';
            data.perfil = $('#perfil').val(); //ver isto
        }
        else if ($('#profissao').val() == "Gestor de Projeto") {
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.descricao = $('#descricao').val();
            data.gp_nome_emp = $('#gp_nome_emp').val();;
            data.ramo_emp = $('#ramoEp_gp').val();
            data.num_trabalhadores = $('#nEmpregados_gp').val();
            data.regiao_pais = $('#regiao_gp').val();
            data.area_cientifica = '';
            data.ciclo_estudo = '';
            data.perfil = $('#perfil').val(); //ver isto
        }
        else if ($('#profissao').val() == "Empresa") {
            data.idade = 0;
            data.genero = '';
            data.gp_nome_emp = '';
            data.ramo_emp = $('#ramoEp').val();
            data.num_trabalhadores = $('#nEmpregados').val();
            data.regiao_pais = $('#regiao').val();
            data.area_cientifica = '';
            data.ciclo_estudo = '';
            data.perfil = $('#perfil').val(); //ver isto

        } else { };

        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/setUtilizador',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result.status == 200) {
                    console.log("Erro");
                }
                else {
                    alert("submetido com sucesso");
                    $("#formUtilziador")[0].reset();
                }
                dadosUtilizador();
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

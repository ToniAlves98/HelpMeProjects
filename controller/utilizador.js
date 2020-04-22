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
        //data.idade = $('#idade').val();
        data.genero = $('#genero').val();
        data.profissao = $('#profissao').val();
        

        if ($('#profissao').val("Estudante")){
            data.idade = $('#idade').val();
            data.num_trabalhadores = 0;
         }
         if ($('#profissao').val("Professor/Investigador")){
            data.idade = $('#idade').val();
            data.num_trabalhadores = 0;
         }
         if ($('#profissao').val("Gestor de Projetos")){
            data.idade = $('#idade').val();
            data.num_trabalhadores = 0;
         }
         
         if ($('#profissao').val("Empresa")) {
            data.idade = 0;
            data.num_trabalhadores = $('#nEmpregados').val();
    }
      
        //data.num_trabalhadores = $('#nEmpregados').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();      
        data.ramo_emp = $('#ramoEp').val();
        data.regiao_pais = $('#regiao').val();
        data.area_cientifica = $('#area').val();
        data.ciclo_estudo = $('#estudo').val();
        data.perfil = 'Perfil público';

        console.log(data);
        $('#formNewRegisto')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/saveUtilizador',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
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

//Carregar dados para a página perfil utilziador
function dadosUtilizador() {
    var data = {};
    data.idUtilizador = 1;

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
                $('#ramoEp').val(data[0].ramo_emp);
                $('#nEmpregados').val(data[0].num_trabalhadores);
                $('#regiao').val(data[0].regiao_pais);
                $('#area').val(data[0].area_cientifica);
                $('#estudo').val(data[0].ciclo_estudo);
                //$('perfil').val(data[0].perfil);
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
$('#formUtilizador').validator().on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
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
        //data.perfil = $('#perfil').val();
        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/saveUtilizador',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                if (result.status == 200) {
                    alert("submetido com sucesso");
                    $("#formUtilziador")[0].reset();
                }
                else {
                    console.log("Erro");
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

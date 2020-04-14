$(document).ready(function () {
    dadosUtilizador();
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

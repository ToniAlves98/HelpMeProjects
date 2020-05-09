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
                $('#perfil').val(data[0].perfil);
                console.log(data);

                if (data.profissao == "Estudante") {
                    var aluno = "";
                    aluno += '<div class="col-lg-3">';
                    aluno += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" placeholder="' + data[0].nome + '"></div>';
                    aluno += '<div class="form-group" id="idadeDiv"><label class="custom-label">Idade:</label><input type="number" class="form-control form-control-user" id="idade" placeholder="' + data[0].idade + '"></div>';
                    aluno += '<div class="form-group" id="generoDiv"><label class="custom-label">Género:</label><select class="form-control form-control-user" data-live-search="true" id="genero">';
                    aluno += '<option value="" disabled selected>' + data[0].genero + '</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>';
                    aluno += '</div>';
                    aluno += '<div class="col-lg-3">';
                    aluno += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" placeholder = "' + data[0].email + '"></div>';
                    aluno += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" placeholder = "' + data[0].password + '"></div>';
                    aluno += '</div>';
                    aluno += '<div class="col-lg-3">';
                    aluno += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" name = "message" rows = "5" cols = "30" placeholder = "' + data[0].descricao + '"></textarea ></div>';
                    aluno += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    aluno += '<option value="" disabled selected>' + data[0].profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    aluno += '<div class="form-group" id="Estudante"><label class="custom-label">Ciclo de Estudo:</label><input type="text" class="form-control form-control-user" id="estudo" aria-describedby="" placeholder="' + data[0].ciclo_estudo + '"></div>';
                    aluno += '</div>';
                    $("#aluno_section").html(aluno);
                } else if (data.profissao == "Professor/Investigador") {
                    var pi = "";
                    pi += '<div class="col-lg-3">';
                    pi += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" aria-describedby="" placeholder="' + data.nome + '"></div>';
                    pi += '<div class="form-group" id="idadeDiv"><label class="custom-label">Idade:</label><input type="number" class="form-control form-control-user" id="idade" aria-describedby="" placeholder="' + data.idade + '"></div>';
                    pi += '<div class="form-group" id="generoDiv"><label class="custom-label">Género:</label><select class="form-control form-control-user" data-live-search="true" id="genero">';
                    pi += '<option value="" disabled selected>' + data.genero + '</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>';
                    pi += '</div>';
                    pi += '<div class="col-lg-3">';
                    pi += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" placeholder = "' + data.email + '"></div>';
                    pi += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" placeholder = "' + data.password + '"></div>';
                    pi += '</div>';
                    pi += '<div class="col-lg-3">';
                    pi += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" name = "message" rows = "5" cols = "30" placeholder = "' + data.descricao + '"></textarea ></div>';
                    pi += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    pi += '<option value="" disabled selected>' + data.profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    pi += '<div class="form-group" id="PI"><label class="custom-label">Área Científica:</label><input type="text" class="form-control form-control-user" id="area" aria-describedby="" placeholder="' + data.area_cientifica + '"></div>';
                    pi += '</div>';
                    $("#pi_section").html(pi);
                } else if (data.profissao == "Gestor de Projeto") {
                    var gp = "";
                    gp += '<div class="col-lg-3">';
                    gp += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" aria-describedby="" placeholder="' + data.nome + '"></div>';
                    gp += '<div class="form-group" id="idadeDiv"><label class="custom-label">Idade:</label><input type="number" class="form-control form-control-user" id="idade" aria-describedby="" placeholder="' + data.idade + '"></div>';
                    gp += '<div class="form-group" id="generoDiv"><label class="custom-label">Género:</label><select class="form-control form-control-user" data-live-search="true" id="genero">';
                    gp += '<option value="" disabled selected>' + data.genero + '</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>';
                    gp += '</div>';
                    gp += '<div class="col-lg-3">';
                    gp += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" placeholder = "' + data.email + '" ></div>';
                    gp += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" placeholder = "' + data.password + '"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" name = "message" rows = "5" cols = "30" placeholder = "' + data.descricao + '"></textarea ></div>';
                    gp += '</div>';
                    gp += '<div class="col-lg-3">';
                    gp += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    gp += '<option value="" disabled selected>' + data.profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    gp += '<div class="form-group"><label class="custom-label">Nome da Empresa:</label><input type="text" class="form-control form-control-user" id="gp_nome_emp" aria-describedby="" placeholder="' + data.gp_nome_emp + '(Opcional)"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Ramo Empresarial:</label><input type="text" class="form-control form-control-user" id="ramoEp" aria-describedby="" placeholder="' + data.ramo_emp + '(Opcional)"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Nº de Empregados:</label><input type="number" class="form-control form-control-user" id="nEmpregados" aria-describedby="" placeholder="' + data.num_trabalhadores + '(Opcional)"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Região do País:</label><select class="form-control form-control-user" data-live-search="true" id="regiao">';
                    gp += '<option value="" disabled selected>' + data.regiao_pais + '</option><option value="Alentejo">Alentejo</option><option value="Algarve">Algarve</option><option value="Beira Interior">Beira Interior</option>';
                    gp += '<option value="Beira Litoral">Beira Litoral</option><option value="Entre Douro e Minho">Entre Douro e Minho</option><option value="Ribatejo e Oeste">Ribatejo e Oeste</option><option value="Região Autónoma dos Açores">Região Autónoma dos Açores</option><option value="Região Autónoma da Madeira">Região Autónoma da Madeira</option></select></div>';
                    gp += '</div>';
                    $("#gp_section").html(gp);
                } else if (data[29].profissao == "Empresa") {
                    var empresa = "";
                    empresa += '<div class="col-lg-3">';
                    empresa += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" aria-describedby="" placeholder="' + data.nome + '"></div>';
                    empresa += '</div>';
                    empresa += '<div class="col-lg-3">';
                    empresa += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" placeholder = "' + data.email + '"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" placeholder = "' + data.password + '"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" name = "message" rows = "5" cols = "30" placeholder = "' + data.descricao + '"></textarea ></div>';
                    empresa += '</div>';
                    empresa += '<div class="col-lg-3">';
                    empresa += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    empresa += '<option value="" disabled selected>' + data.profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Ramo Empresarial:</label><input type="text" class="form-control form-control-user" id="ramoEp" aria-describedby="" placeholder="' + data.ramo_emp + '(Opcional)"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Nº de Empregados:</label><input type="number" class="form-control form-control-user" id="nEmpregados" aria-describedby="" placeholder="' + data.num_trabalhadores + '(Opcional)"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Região do País:</label><select class="form-control form-control-user" data-live-search="true" id="regiao">';
                    empresa += '<option value="" disabled selected>' + data.regiao_pais + '</option><option value="Alentejo">Alentejo</option><option value="Algarve">Algarve</option><option value="Beira Interior">Beira Interior</option>';
                    empresa += '<option value="Beira Litoral">Beira Litoral</option><option value="Entre Douro e Minho">Entre Douro e Minho</option><option value="Ribatejo e Oeste">Ribatejo e Oeste</option><option value="Região Autónoma dos Açores">Região Autónoma dos Açores</option><option value="Região Autónoma da Madeira">Região Autónoma da Madeira</option></select></div>';
                    empresa += '</div>';
                    $("#empresa_section").html(empresa);
                }
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
            data.perfil = $('#perfil').val();
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
            data.perfil = $('#perfil').val();
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
            data.perfil = $('#perfil').val();
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
            data.perfil = $('#perfil').val();
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
            data.perfil = $('#perfil').val();

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

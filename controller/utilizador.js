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


        }
        
        else { };
        data.estado = "ativo"
        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/saveUtilizador',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                console.log(result.status)
                console.log(status)
                if (result.status == 200 ) {
                    $('#formNewRegisto')[0].reset();
                    alert("Bem Vindo à HeplMe Projects")
                    window.location.assign("/");
                }
                else if (result.status == 201) {
                    alert("Já existe  utilizador registado com esse e-mail");
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
        dataType: 'json',
        success: function (data, status, request) {

            if (request.status == 200) {
                console.log(data);

                if (data[0].profissao == "Estudante") {
                    var aluno = "";
                    aluno += '<div class="col-lg-3">';
                    aluno += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" value="' + data[0].nome + '"></div>';
                    aluno += '<div class="form-group" id="idadeDiv"><label class="custom-label">Idade:</label><input type="number" class="form-control form-control-user" id="idade" value="' + data[0].idade + '"></div>';
                    aluno += '<div class="form-group" id="generoDiv"><label class="custom-label">Género:</label><select class="form-control form-control-user" data-live-search="true" id="genero">';
                    aluno += '<option value="' + data[0].genero + '">' + data[0].genero + '</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>';
                    aluno += '</div>';
                    aluno += '<div class="col-lg-3">';
                    aluno += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" value = "' + data[0].email + '"></div>';
                    aluno += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" value = "' + data[0].password + '"></div>';
                    aluno += '</div>';
                    aluno += '<div class="col-lg-3">';
                    aluno += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" rows = "5" cols = "30" value ="">' + data[0].descricao +'</textarea ></div>';
                    aluno += '<div class="form-group"><label class="custom-label">Profissao:</label><input type = "text" class="form-control form-control-user" id="profissao" value="' + data[0].profissao + '" disabled></div>';
                    //aluno += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    //aluno += '<option value="" disabled selected>' + data[0].profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    aluno += '<div class="form-group" id="Estudante"><label class="custom-label">Ciclo de Estudo:</label><input type="text" class="form-control form-control-user" id="estudo" aria-describedby="" value="' + data[0].ciclo_estudo + '"></div>';
                    aluno += '</div>';
                    $("#aluno_section").html(aluno);
                } else if (data[0].profissao == "Professor/Investigador") {
                    var pi = "";
                    pi += '<div class="col-lg-3">';
                    pi += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" aria-describedby="" value="' + data[0].nome + '"></div>';
                    pi += '<div class="form-group" id="idadeDiv"><label class="custom-label">Idade:</label><input type="number" class="form-control form-control-user" id="idade" aria-describedby="" value="' + data[0].idade + '"></div>';
                    pi += '<div class="form-group" id="generoDiv"><label class="custom-label">Género:</label><select class="form-control form-control-user" data-live-search="true" id="genero">';
                    pi += '<option value="' + data[0].genero + '">' + data[0].genero + '</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>';
                    pi += '</div>';
                    pi += '<div class="col-lg-3">';
                    pi += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" value = "' + data[0].email + '"></div>';
                    pi += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" value = "' + data[0].password + '"></div>';
                    pi += '</div>';
                    pi += '<div class="col-lg-3">';
                    pi += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" name = "message" rows = "5" cols = "30" value = "">' + data[0].descricao +'</textarea></div>';
                    pi += '<div class="form-group"><label class="custom-label">Profissao:</label><input type = "text" class="form-control form-control-user" id="profissao" value="' + data[0].profissao + '" disabled></div>';
                    //pi += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    //pi += '<option value="" disabled selected>' + data[0].profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    pi += '<div class="form-group" id="PI"><label class="custom-label">Área Científica:</label><input type="text" class="form-control form-control-user" id="area" aria-describedby="" value="' + data[0].area_cientifica + '"></div>';
                    pi += '</div>';
                    $("#pi_section").html(pi);
                } else if (data[0].profissao == "Gestor de Projeto") {
                    var gp = "";
                    gp += '<div class="col-lg-3">';
                    gp += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" aria-describedby="" value="' + data[0].nome + '"></div>';
                    gp += '<div class="form-group" id="idadeDiv"><label class="custom-label">Idade:</label><input type="number" class="form-control form-control-user" id="idade" aria-describedby="" value="' + data[0].idade + '"></div>';
                    gp += '<div class="form-group" id="generoDiv"><label class="custom-label">Género:</label><select class="form-control form-control-user" data-live-search="true" id="genero">';
                    gp += '<option value="' + data[0].genero + '">' + data[0].genero + '</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>';
                    gp += '</div>';
                    gp += '<div class="col-lg-3">';
                    gp += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" value = "' + data[0].email + '" ></div>';
                    gp += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" value = "' + data[0].password + '"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" name = "message" rows = "5" cols = "30" value = "">' + data[0].descricao +'</textarea ></div>';
                    gp += '</div>';
                    gp += '<div class="col-lg-3">';
                    gp += '<div class="form-group"><label class="custom-label">Profissao:</label><input type = "text" class="form-control form-control-user" id="profissao" value="' + data[0].profissao + '" disabled></div>';
                    //gp += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    //gp += '<option value="" disabled selected>' + data[0].profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    gp += '<div class="form-group"><label class="custom-label">Nome da Empresa:</label><input type="text" class="form-control form-control-user" id="gp_nome_emp" aria-describedby="" value="' + data[0].gp_nome_emp + '"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Ramo Empresarial:</label><input type="text" class="form-control form-control-user" id="ramoEp" aria-describedby="" value="' + data[0].ramo_emp + '"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Nº de Empregados:</label><input type="text" class="form-control form-control-user" id="nEmpregados" aria-describedby="" value="' + data[0].num_trabalhadores + '"></div>';
                    gp += '<div class="form-group"><label class="custom-label">Região do País:</label><select class="form-control form-control-user" data-live-search="true" id="regiao">';
                    gp += '<option value="' + data[0].regiao_pais + '">' + data[0].regiao_pais + '</option><option value="Alentejo">Alentejo</option><option value="Algarve">Algarve</option><option value="Beira Interior">Beira Interior</option>';
                    gp += '<option value="Beira Litoral">Beira Litoral</option><option value="Entre Douro e Minho">Entre Douro e Minho</option><option value="Ribatejo e Oeste">Ribatejo e Oeste</option><option value="Região Autónoma dos Açores">Região Autónoma dos Açores</option><option value="Região Autónoma da Madeira">Região Autónoma da Madeira</option></select></div>';
                    gp += '</div>';
                    $("#gp_section").html(gp);
                } else if (data[0].profissao == "Empresa") {
                    var empresa = "";
                    empresa += '<div class="col-lg-3">';
                    empresa += '<div class="form-group"><label class="custom-label">Nome:</label><input type="text" class="form-control form-control-user" id="nome" aria-describedby="" value="' + data[0].nome + '"></div>';
                    empresa += '</div>';
                    empresa += '<div class="col-lg-3">';
                    empresa += '<div class="form-group"><label class="custom-label">E-mail:</label><input type = "email" class="form-control form-control-user" id = "email" aria - describedby="" value = "' + data[0].email + '"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Password:</label><input type = "text" class="form-control form-control-user" id = "password" aria - describedby="" value = "' + data[0].password + '"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Descrição:</label><textarea class="form-control form-control-user" id = "descricao" name = "message" rows = "5" cols = "30" value = "">' + data[0].descricao +'</textarea ></div>';
                    empresa += '</div>';
                    empresa += '<div class="col-lg-3">';
                    empresa += '<div class="form-group"><label class="custom-label">Profissao:</label><input type = "text" class="form-control form-control-user" id="profissao" value="' + data[0].profissao + '" disabled></div>';
                    //empresa += '<div class="form-group"><label class="custom-label">Profissão:</label><select class="form-control form-control-user" data-live-search="true" id="profissao" onchange="checkProfissao(this);">';
                    //empresa += '<option value="" disabled selected>' + data[0].profissao + '</option><option value="Empresa">Empresa</option>option value="Gestor de Projetos">Gestor de Projetos</option><option value="Professor/Investigador">Professor/Investigador</option><option value="Estudante">Estudante</option></select></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Ramo Empresarial:</label><input type="text" class="form-control form-control-user" id="ramoEp" aria-describedby="" value="' + data[0].ramo_emp +'"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Nº de Empregados:</label><input type="text" class="form-control form-control-user" id="nEmpregados" value="' + data[0].num_trabalhadores +'"></div>';
                    empresa += '<div class="form-group"><label class="custom-label">Região do País:</label><select class="form-control form-control-user" data-live-search="true" id="regiao">';
                    empresa += '<option value="' + data[0].regiao_pais + '">' + data[0].regiao_pais + '</option><option value="Alentejo">Alentejo</option><option value="Algarve">Algarve</option><option value="Beira Interior">Beira Interior</option>';
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
        data.profissao = $('#profissao').val();
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
        else if ($('#profissao').val() == "Gestor de Projeto") {
            data.idade = $('#idade').val();
            data.genero = $('#genero').val();
            data.descricao = $('#descricao').val();
            data.gp_nome_emp = $('#gp_nome_emp').val();;
            data.ramo_emp = $('#ramoEp').val();
            data.num_trabalhadores = $('#nEmpregados').val();
            data.regiao_pais = $('#regiao').val();
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
            dataType: 'json',
            success: function (result) {
                if (result.status == 200 ) {
                    alert("Editador com sucesso");
                }
                else {
                    alert("Não foi editado com sucesso")
                }
                $("#formUtilziador")[0].reset();
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

//Carregar mail forgot password
$('#formResetPassword').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("formulário com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.email = $('#resetEmail').val();
        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/forgot',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                if (result.status == 200) {
                    alert("E-mail enviado com sucesso");
                    $("#formResetPassword")[0].reset();
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
    }
});

//Enviar nova password
$('#formNewPassword').on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("formulário com erros")
    }
    else {
        event.preventDefault();

        var hash_token = document.location.hash;
        var token = hash_token.substr(1);

        var data = {};
        data.password = $('#novaPassword').val();
        data.token = token;
        console.log(data);

        $.ajax({
            type: 'POST',
            url: '/resetPassword2/:token',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                if (result.status == 200) {
                    alert("Password redefinida com sucesso.");
                    $("#formNewPassword")[0].reset();
                    window.location.assign("/");
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
    }
});
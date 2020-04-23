$(document).ready(function() {
   console.log('login.js');
}); 
/*
// //validacao do formulario ao submeter executa a funcao validator
$('#formNewLogin').validator().on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formulario com erros") 
    }
  
    else {
        event.preventDefault();
        
        var data = {};
        data.email = $('#email').val();
        data.password = $('#password').val();
     
        console.log(data);
        
        $.ajax({
            type: 'POST',
            url: '',
            data: data,
           // contentType: 'application/json',
            success: function(result) {
                console.log(result)
                if (result.email == "antonio@gmail.com") {
                    alert("Bem Vindo");
                    window.location.assign("/admin");
                }
                else {
                    alert("Bem Vindo");
                    window.location.assign("/forum"); 
                }
                 $('#formNewLogin')[0].reset();
            },
            error: function(data) { console.log(data) }
        });
    }
});*/

$('#formNewLogin').validator().on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("form with errors") // handle the invalid form...
    }
    //se estiver tudo bem
    else {
        event.preventDefault();
        //carregamento dos dados do form para variávels JS
        //como a chamada é feita do lado do cliente o carregamento é com jQuery
        var data = {};
        data.email = $('#mailLogin').val();
        data.password = $('#passLogin').val();
        //debugging para ver os dados que foram enviados
        console.log(data);
        login(data);
        //limpeza dos dados do form*
        //$('#formLogin')[0].reset();
    }
});

function login(data) {
    //chamada AJAX para envio dos dados para o servidor via POST convertendo o array em JSON
    $.ajax({
        type: 'POST',
        url: '../login',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(results) {
            console.log(results.TipoUtilizador_idTipoUtilizador);
            //analisa a resposta (res.end) que está no result e se o status for 200 envia um alerta
            if (results.login == 1) {
                alert("login com sucesso");

                if (results.Tipo == 1) {
                    window.location.assign("/admin");
                }
                else if (results.Tipo == 2) {
                    window.location.assign("/colab");
                }
                else {
                    window.location.assign("/part");
                }
            }
            else {
                alert("email ou password errada");
            }

        },
        error: function(data) { console.log(data) }
    });
}

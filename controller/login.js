//validacao do formulario ao submeter executa a funcao validator
$('#formNewLogin').on('submit', function(e) {
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
            url: '/login',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function(result) {
                console.log(result)
                global.session.idUser = result.idUtilizador;
                console.log('session login.js ' + global.session.idUser);
                if (result.status== 200) {
                    alert("Bem Vindo");
                    window.location.assign("/admin");
                }
                else {
                    alert("Bem Vindo");
                    console.log(data.idUtilizador);
                    window.location.assign("/forum"); 
                }
                 $('#formNewLogin')[0].reset();
            },
            error: function(data) { console.log(data) }
        });
    }
});
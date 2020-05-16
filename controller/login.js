$('#formNewLogin').on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formulario com erros")
    } else {
        event.preventDefault();

        var data = {};
        data.email = $('#email').val();
        data.password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: '/login',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function(result, data) {

                if (result = {
                        "success": "Login realizado com sucesso",
                        "status": 200
                    } && $('#email').val() == "admin@gmail.com") {

                    alert("Bem Vindo");
                    window.location.assign("/admin");
                } else if (result = {
                        "success": "Login realizado com sucesso",
                        "status": 200
                    } && $('#email').val() != "admin@gmail.com") {

                    alert("Bem Vindo");
                    window.location.href = "/inicial";
                } else if (result = {
                        "denied": "dados inexistentes/errados",
                        "status": 201
                    }) {
                    alert("email ou password errada")
                }

                $('#formNewLogin')[0].reset();
            },
            error: function(data) {
                console.log(data)
            }
        });
    }
});
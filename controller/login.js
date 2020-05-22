$('#formNewLogin').on('submit', function (e) {
    var lin = document.getElementById("lin").textContent;
    console.log(lin);
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formulario com erros")
    } else {
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
            dataType: 'json',
            success: function (result) {
                console.log(result);
                console.log(result.status);
                if (result.status == 200 && $('#email').val() == "admin@gmail.com") {
                    alert("Bem Vindo à HelpMe Projects - Admin");
                    window.location.assign("/admin");
                }
                else if (result.status == 200 && $('#email').val() != "admin@gmail.com") {
                    if (lin == 'PT') {
                        alert("Bem Vindo à HelpMe Projects");
                        window.location.href = "/inicial";
                    } else {
                        alert('Welcome to HelpMe Projects');
                        window.location.href = "/inicial_en";
                    }
                }
                else if (result.status == 201) {
                    if (lin == 'PT') {
                        alert("E-mail ou password errada");
                    }
                    else {
                        alert("Wrong e-mail or password");
                    }
                }
                else {
                    alert("Login realizado sem sucesso.")
                }
                $('#formNewLogin')[0].reset();
            },
            error: function (data) {
                console.log(data)
            }
        });
    }
});

function logout() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/logout',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
            window.location.assign("/");
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);

        }

    });

};
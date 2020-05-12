$('#novaResposta').on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formulario com erros")
    } else {
        event.preventDefault();

        var data = {};
        data.resposta = $('#texto').val();

        if(data.resposta == null){
            alert('Não é permitido o envio de respostas vazias');
        }

        $.ajax({
            type: 'POST',
            url: '/saveResposta',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, data) {
                /*console.log('result '+ result);
                console.log('data ' + data);
                console.log('status ' + status);
                console.log('data2 ' + data.idPergunta);
                var string = JSON.stringify(data);
                console.log('string ' + string);*/
                //data.quotesArray.forEach(function(row) {
                /*data.forEach(function(row) {
                    seePergunta(row.idPergunta);
                });*/
                //window.location.reload(false);
                pages("perg_resp");
            },
            error: function(data) {
                console.log(data)
            }
        });
    }
});
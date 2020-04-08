$(document).ready(function() {
    console.log('Controller');
    getPerguntas();
});

function getPerguntas() {
    var data = {};
    data.root = {};
	//data.root.perguntas = perguntas;
    console.log(data);
	var linha = "";

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8081/lerPerguntas',
		data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function (data, status, request) {
			console.log("Success");
			console.log(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro Get Perguntas");
        }
    });
};
/*
function getPerguntas() {
    $.ajax({
        type: 'GET',
        url: '/perguntas',
        success: function (data, status, request) {
            console.log(data);
            console.log(request);
        }
    });
};*/
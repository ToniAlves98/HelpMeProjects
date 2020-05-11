$(document).ready(function () {
    getPerguntas();
    getNumUtilizadores();
    getNumEventos();
    getNumPedidos();
    getNumRelatorios();
});


function getPerguntas() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/countPerguntas',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                $("#total_perguntas").html(data[0].count);
            }
        },
    });
};

function getNumUtilizadores() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/countUtilizadores',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                $("#total_utilizadores").html(data[0].count);
            }
        },
    });
};

function getNumEventos() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/countEventos',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                $("#total_eventos").html(data[0].count);
            }
        },
    });
};

function getNumPedidos() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/countPedidos',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                $("#total_pedidos").html(data[0].count);
            }
        },
    });
};

function getNumRelatorios() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/countRelatorios',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                $("#total_relatorios").html(data[0].count);
            }
        },
    });
};
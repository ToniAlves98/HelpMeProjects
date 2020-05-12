$(document).ready(function () {
    getPerguntas();
    getNumUtilizadores();
    getNumEventos();
    getNumPedidos();
    getNumRelatorios();
    getNumSugestoes();
    graficoUtilizador();
    graficoPerguntaArea();
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

function getNumSugestoes() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/countSugestoes',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                $("#total_sugestoes").html(data[0].count);
            }
        },
    });
};


function graficoUtilizador() {

    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '/graficoUtilizador',
        //os dados recebidos do model est�o na vari�vel data
        success: function (data) {
            //debugging para ver se foi pedido com sucesso
            console.log('');
            //cria��o de uma tabela para demonstra��o dos resultados recebidos
            var estudante = data[0].numero;
            var professor = data[1].numero;
            var empresa = data[2].numero;
            var gp = data[3].numero;
            var ctx = document.getElementById("pieChart"),
                pieChart = new Chart(ctx, {
                    type: 'doughnut', // bar, horizontalBar, pie.....
                    data: {
                        labels: ['N�mero de Estudantes', 'N�mero de Professores/Investigadores', 'N�mero de Empresa', 'N�mero de Gestores de projeto'],
                        datasets: [{
                            label: 'N�mero',
                            data: [
                                estudante,
                                professor,
                                empresa,
                                gp],

                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'RGB(24, 247, 140, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'RGB(24, 247, 140, 1)'

                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {}
                }
                )

        }

    });
}

function graficoPerguntaArea() {

    //chamada ajax
    $.ajax({
        type: 'GET',
        url: '/graficoPerguntaArea',
        //os dados recebidos do model est�o na vari�vel data
        success: function (data) {
            //cria��o de uma tabela para demonstra��o dos resultados recebidos
            var gAmbito = data[0].numero;
            var gAquisicoes = data[1].numero;
            var gComunicacao = data[2].numero;
            var gCronograma = data[3].numero;
            var gCusto = data[4].numero;
            var gIntegracao = data[5].numero;
            var gQualidade = data[6].numero;
            var gRecursos = data[7].numero;
            var gRiscos = data[8].numero;
            var gStakeholders = data[9].numero;
            var ctx = document.getElementById("myChart"),
                myChart = new Chart(ctx, {
                    type: 'bar', // bar, horizontalBar, pie.....
                    data: {
                        labels: ['Gest�o do �mbito', 'Gest�o de Aquisi��es', 'Gest�o da Comunica��o', 'Gest�o do Cronograma', 'Gest�o do Custo', 'Gest�o da Integra��o', 'Gest�o da Qualidade', 'Gest�o dos Recursos', 'Gest�o de Riscos', 'Gest�o dos Stakeholders'],
                        datasets: [{
                            label: 'N�mero de Perguntas',
                            data: [
                                gAmbito,
                                gAquisicoes,
                                gComunicacao,
                                gCronograma,
                                gCusto,
                                gIntegracao,
                                gQualidade,
                                gRecursos,
                                gRiscos,
                                gStakeholders],

                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(54, 162, 235, 0.2)'

                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {}
                }
                )

        }
    });

}
$(document).ready(function () {
    getPerguntas();
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
                $("#total_perguntas").html(data[0]);
                console.log(data[0].count)
            }
           
        },


    });

};
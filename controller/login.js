$(document).ready(function() {
   
}); 

// //valida��o do formul�rio ao submeter � executa a fun��o validator
$('#formNewLogin').validator().on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formul�rio com erros") 
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
});

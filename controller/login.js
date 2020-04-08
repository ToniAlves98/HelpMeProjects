$(document).ready(function() {
   
}); 

// //validação do formulário ao submeter – executa a função validator
$('#formNewLogin').validator().on('submit', function(e) {
    //se submeter com erros
    if (e.isDefaultPrevented()) {
        alert("Formulário com erros") 
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
                if (result.tipo == "utilizador") {
                    
                    document.cookie  = "idUtilizador=" + result.idUtilizador.toString() ;
                    alert("Bem Vindo");

                    window.location.assign("/PerfildoUtilizador");
                }
                
                else if (result.tipo =="administrador"){
                    
                    alert("Bem Vindo");
                    document.cookie  = result;
                    window.location.assign("/"); 
                }
                else {
                    alert("LogIn sem sucesso")
                    
                }
                 $('#formNewLogin')[0].reset();
            },
            error: function(data) { console.log(data) }
        });
    }
});

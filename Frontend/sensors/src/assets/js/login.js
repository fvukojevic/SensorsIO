$(document).ready(function(){
    function serverInput(){
        swal({
            title: 'Unesite adresu servera:',
            input: 'text',
            inputPlaceholder: 'primjer: 46.35.158.207:2565/piis',
            showCancelButton: true,
            inputValidator: function (value) {
              return new Promise(function (resolve, reject) {
                if (value) {
                  resolve()
                } else {
                  reject('Molimo unesite adresu da bi se povezali na server!')
                }
              });
            }
          }).then(function (name) {
            localStorage.setItem("serverName", name);
            location.reload();
          }).catch(swal.noop);
    }
    var serverName = localStorage.getItem("serverName");
    if(!serverName){
        serverInput();
    };
    $("#selectIP").click(function(e){
        serverInput();
    });

    $("#loggMeIn").click(function(e){
      e.preventDefault();
 
        var user = $("#user").val();
        var pass = $("#pass").val();
        //console.log(user + pass);
		//console.log(serverName);
        $.ajax({url: 'http://'+ serverName + '/index.php',
        type: "POST",
		 dataType: 'JSON',
        data: {method:'login', username: user, password: pass},
        success: function(obj){
			/*console.log("hehehh");
			console.log(obj.url);*/
		if(obj.loggedIn==false){
                swal({
                    title: 'Greška!',
                    text: 'Molimo unesite točan username i password!',
                    type: 'error',
                }).catch(swal.noop);
			}
			else
			eval(obj.url);
         
        },
        error: function(err){
            console.log("hehe")
        }
        }); 
        
    });

});
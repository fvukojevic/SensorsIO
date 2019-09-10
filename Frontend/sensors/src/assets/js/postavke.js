$(document).ready(function(){

    var serverName = localStorage.getItem("serverName");
    $("#current").text(serverName);    

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
    }

    $("#selectIP").click(function(e){
        serverInput();
    });

});
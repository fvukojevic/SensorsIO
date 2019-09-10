$(document).ready(function(){

    var serverName = localStorage.getItem("serverName");
    
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

    function load(url, type, dataType, callback) {
    $.ajax({url: url,
            type: type,
            dataType: dataType, 
            success: function(result){
                callback(result);
                swal({
                position: 'top-right',
                type: 'success',
                title: 'Uspješno spajanje sa serverom!',
                showConfirmButton: false,
                timer: 1000,
                width: '300px'
                }).catch(swal.noop);
                $.notify({
                icon: 'pe-7s-back-2',
                message: "Molimo vas izaberitite pločicu a zatim senzor za postavljanje obavijesti."
            },{
                type: 'info',
                timer: 2000,
                placement: {
                    from: 'bottom',
                    align: 'right'
                },
                animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                }
            });
            },
            error: function(){
                swal({
                    title: 'Greška pri konekciji s serverom!',
                    text: 'Pokušajte se ponovo spojit, ako se greška ponovi, kontaktirajte službu za korisnike.',
                    type: 'error',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Pokušaj ponovno',
                    cancelButtonText: 'Promijeni server'
                }).then(function () {
                    load('http://'+ serverName + '/index.php?method=getAllBoards', "GET", "json", parse);
                },function (dismiss) {
                    if (dismiss === 'cancel') {
                        serverInput();
                    }
                }).catch(swal.noop);
                console.log("err");
            }
        });
    }
      
    function parse(data){
    console.log(data);
    displayDataNotify(data.data);
    }

    function displayDataNotify(data){
    for(var i = 0; i < data.length; i++){
        console.log(data[i].name);
        var boardItem = document.createElement("option");
        boardItem.setAttribute("value", data[i].id);
        boardItem.innerHTML = data[i].name;
        $("#selectBoard").append(boardItem);
    }

    $("#selectBoard").change(function() {
        $("#selectSensor option").remove();
        var id = $('#selectBoard :selected').attr("value");
        $.ajax({url: 'http://'+ serverName + '/index.php?method=getSensorsFromBoard&id_waspmote=' + id,
            type: "GET",
            dataType: "json",
            success: function(result){
                console.log(result.data);
                for(var i = 0; i < result.data.length; i++){
                    var boardItem = document.createElement("option");
                    boardItem.setAttribute("value", result.data[i].id);
                    boardItem.innerHTML = result.data[i].name;
                    $("#selectSensor").append(boardItem);
                }
            },
            error: function(err){
                console.log(err);
            }
        }); 
    });

    $("#selectSensor").change(function() {            
        var id = $('#selectBoard :selected').attr("value");
        $.ajax({url: 'http://'+ serverName + '/index.php?method=getSensorsFromBoard&id_waspmote=' + id,
            type: "GET",
            dataType: "json",
            success: function(result){
                console.log(result.data);
                for(var i = 0; i < result.data.length; i++){
                    var boardItem = document.createElement("option");
                    boardItem.setAttribute("value", result.data[i].id);
                    boardItem.innerHTML = result.data[i].name;
                    $("#selectSensor").append(boardItem);
                }
            },
            error: function(err){
                console.log(err);
            }
        }); 
    });

    $("#notifyMeButton").click(function(e) {
        e.preventDefault();            
        var id = $('#selectBoard :selected').attr("value");            
        var idS = $('#selectSensor :selected').attr("value");
        var val = $('#notifyValue').val();
        console.log(id +" "+ idS + ' ' + val);
        if(val != ""){
        $.ajax({url: 'http://'+ serverName + '/index.php',
                type: "POST",
                data: {method:'addNewRule', id_waspmote: id, id_sensor: idS, value: val},
                dataType: "json",
                success: function(){
                    console.log("succes");
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Uspješno dodavanje pravila!',
                        showConfirmButton: false,
                        timer: 2000,
                        width: '300px'
                        }).catch(swal.noop);
                },
                error: function(err){
                    console.log(err);
                }
        }); 
        }else{
            $('#notifyValue').focus();
            swal(
                'Greška',
                'Molimo unesite vrijednost u odgovarajuće polje.',
                'error'
                )
        }
    });

    }
    
    load('http://'+ serverName + '/index.php?method=getAllBoards', "GET", "json", parse);

    });
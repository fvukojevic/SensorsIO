$(document).ready(function(){
    var serverName = localStorage.getItem("serverName");
    
    var id, name, surname, username, email, newName, newSurname, newEmail, newUsername;;

    $.ajax({url: 'http://'+ serverName + '/index.php?method=getUserInfo',
            type: "GET",
            dataType: "json",
            success: function(result){
                console.log(result.data);
                id = result.data[0].id;
                name = result.data[0].name;
                surname = result.data[0].surname;
                username = result.data[0].username;
                email = result.data[0].email;

                $("#headFullName").text(name + " " + surname + " / " + "@" + username);
                $("#formUsername").attr("value", username);                
                $("#formName").attr("value", name);
                $("#formSurname").attr("value", surname);
                $("#formEmail").attr("value", email);
            },
            error: function(err){
                console.log(err);
            }
    });                          
    
    $("#updateProfile").click(function(e) {
        e.preventDefault(); 
        newName = $("#formName").val();
        newSurname = $("#formSurname").val();
        newEmail = $("#formEmail").val();
        newUsername = $("#formUsername").val();                
        
        $.ajax({url: 'http://'+ serverName + '/index.php',
                type: "POST",
                data: {method:'setUserInfo', username: newUsername, email: newEmail, name: newName, surname: newSurname, id: id},
                dataType: "json",
                success: function(){
                    $("#headFullName").text(newName + " " + newSurname + " / " + "@" + newUsername);                    
                    console.log("succes");
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Uspješno ažuriranje profila!',
                        showConfirmButton: false,
                        timer: 2000,
                        width: '300px'
                        }).catch(swal.noop);
                },
                error: function(err){
                    console.log(err);
                }
        }); 
    });

    $("#changePassword").click(function(e) {
        e.preventDefault(); 
        swal({
            title: 'Unesite novu lozinku:',
            input: 'password',
            showCancelButton: true,
            inputValidator: function (value) {
              return new Promise(function (resolve, reject) {
                if (value.length > 4 && value.length < 15) {
                  resolve()
                } else {
                  reject('Molimo unesite ispravnu lozinku lozinku! <br> (broj karaktera mora biti viši od 4 i manji od 15)')
                }
              });
            }
          }).then(function (pass) {
              console.log(pass);
              $.ajax({url: 'http://'+ serverName + '/index.php',
                    type: "POST",
                    data: {method:'changePassword', password: pass},
                    dataType: "json",
                    success: function(){
                        console.log("succes");
                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: 'Uspješno ažuriranje lozinke!',
                            showConfirmButton: false,
                            timer: 2000,
                            width: '300px'
                            }).catch(swal.noop);
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
          }).catch(swal.noop);
    });
    
    console.log("d");
});
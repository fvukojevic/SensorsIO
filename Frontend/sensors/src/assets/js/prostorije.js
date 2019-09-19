$(document).ready(function () {
    function display(result) {
        result.data.forEach(room => {
            var row = $('<tr><td>' + room.name + '</td><td><select id="selectBoard' + room.id + '" class="selectBoard"><option selected="true" disabled="true">Odaberi pločicu:</option></select></td><td><button id="' + room.id + '" class="deleteRoom delButton btn-block" style="margin: 0px; padding: 8px 0;"><i class="fa fa-times" aria-hidden="true"></i></button></td><td><button id="' + room.id + '" class="addBoard moarButton" style="margin: 0px; padding: 8px 0;"><i class="fa fa-floppy-o" aria-hidden="true"></i></button></td></tr>');

            $("#tbody").append(row);

            getBoards(room.id);
        });

        $(".addBoard").click(function () {
            var idR = this.id;
            var idW = $("#selectBoard" + idR).val();
            console.log(idW);
            $.ajax({
                url: 'http://' + serverName + '/index.php',
                type: "POST",
                data: {
                    method: 'saveBoardToRoom',
                    id_waspmote: idW,
                    id_room: parseInt(idR)
                },
                dataType: "json",
                success: function (r) {
                    //location.reload();  
                    console.log(r);
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Uspješno dodana soba!',
                        showConfirmButton: false,
                        timer: 1000,
                        width: '300px'
                    }).catch(swal.noop);
                    setTimeout(function(){
                        location.reload();                        
                    }, 2000); 
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    }

    function getBoards(id) {
        $.ajax({
            url: 'http://' + serverName + '/index.php?method=getAllAvalibleBoards',
            type: "GET",
            dataType: "json",
            success: function (boards) {
                console.log(boards);
                if (boards.data) {
                    boards.data.forEach(board => {
                        var option = $('<option value="' + board.id + '">' + board.name + '</option>');
                        $("#selectBoard" + id).append(option);
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

});

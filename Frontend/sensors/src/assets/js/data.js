var global_id;
var serverName = localStorage.getItem("serverName");
var chart;
//real time
function change(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            jsonObj = JSON.parse(this.responseText);
            console.log(jsonObj)
            for (var i in jsonObj.data) {
                //console.log(jsonObj.data)
                //console.log(jsonObj.data[i].reading_value)
                //console.log(jsonObj.data[i])
                if (i != "motion_sensor") {
                    document.getElementsByClassName(i)[1].innerText = jsonObj.data[i].reading_value + " " + jsonObj.data[i].measure_unit
                    document.getElementsByClassName(i)[0].innerText = i + "\n" + jsonObj.data[i].reading_time
                } else {
                    document.getElementsByClassName(i)[0].innerText = i + "\n" + jsonObj.data[i].reading_time
                    document.getElementsByClassName(i)[1].innerText = "\n" + "Zadnje prisustvo : \n" + jsonObj.data[i].reading_time
                }
            }
        }
    }
    xhttp.open("GET", 'http://' + serverName + '/index.php?method=getLastBoardData&id_waspmote=' + id, true);
    xhttp.send();
}

function ajaxGET(url, type, callback) {
    $.ajax({
        url: url,
        type: type,
        success: function (result) {
            //console.log(result)
            callback(result);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function displayRooms(data) {
    createSelectList("selectBoard", "Odaberi sobu: ", "listContainer");
    populateSelectList(data, "selectBoard");
    var params = "method=getBoardsFromRoom&id_room=";
    onSelectListChange("selectBoard", displayItems, params);
}

function createSelectList(id, selectText, whereToAppendList) {
    var list = $('<select id="' + id + '"><option selected="true" disabled="true">' + selectText + '</option></select>');
    $("#" + whereToAppendList).append(list);
}

function populateSelectList(data, whereToAppendOptions) {
    data.data.forEach(item => {
        var option = $('<option value="' + item.id + '">' + item.name + '</option>');
        $("#" + whereToAppendOptions).append(option);
    });
}

function displayItems(data) {
    $("#allCont2").remove();
    console.log(data);
    var container = $('<div id="allCont"></div>');
    var container2 = $('<div id="allCont2"></div>');
    if (data.data != null) {
        data.data.forEach(function (item) {
            var name = item.name ? item.name : "";
            var time = item.reading_time ? item.reading_time : "";
            var val = item.reading_value ? item.reading_value : "";
            var id = item.id ? item.id : "";

            var wrap = $('<div class="col-md-3"></div>');
            var card = $('<div class="card cards"></div>');
            var type = $('<h3 class="typeHeader"></h3>');
            var header = $('<div class="header"></div>');
            //  var title = $('<h4 id="title">' + name + '</h4>');
            var title = $('<h4 id="title" class=' + name + '>' + name + '</h4>');
            var date = $('<p id="date" class="category">' + time + '</p>');
            var content = $('<div class="content"></div>');
            //  var value = $('<h3 id="valTitle">' + val + '</h3>');
            var value = $('<h3 id="valTitle" class=' + name + '>' + val + '</h3>');
            var details = $('<button id="' + id + '" class="moarButton ' + data.containerName + '">Detalji</h3>');
            var deleteItem = $('<button id="' + id + '" class="delButton">Izbriši</h3>');

            $(header).append(title).append(date);
            $(content).append(value).append(details);
            $(card).append(header).append(content);
            $(wrap).append(card);

            if (data.containerName === "boardContainer") {
                $(type).text("Pločica: ");
                $(header).prepend(type);
                $(content).append(deleteItem);
                $("#allCont").remove();
                $(container).append(wrap);
            } else if (data.containerName === "sensorContainer") {
                var image = $('<img width="80%" src="/PiiS/web/web2/assets/img/' + item.name + '.svg">');
                $(content).prepend(image);
                $(type).text("Senzor: ");
                $(header).prepend(type);
                $(container2).append(wrap);
            }
        });
    } else {
        console.log("No data to display!");
        removeAll();
    }

    $(container).insertAfter("#selector");
    $(container2).insertAfter("#selector2");

    if (data.data != null) {
        data.data.forEach(function (item) {
            var id = item.id ? item.id : "";
            $("#" + id).click(function (e) {
                $("#wrapDate").remove();
                console.log(data.method);
                localStorage.setItem("sensorId", id);
                var call = window[data.callback];
                ajaxGET('http://' + serverName + '/index.php?method=' + data.method + '' + id, "GET", call);
            });
        })
    } else {
        console.log("No data to display!");
        removeAll();
    };

    $(".boardContainer").click(function () {
        $("#graphRow").hide();
        scrollToItem("allCont2", 220);
        var id = this.id;
        global_id = id;
        change(global_id);
        setInterval(function () {
            change(global_id);
        }, 3000);
        localStorage.setItem("boardID", id);
    });

 $(".delButton").click(function (e) {
        var id = this.id;
        console.log(id);
        var parent = $(event.target).parent().parent().parent();
        swal({
            title: 'Jeste li sigurni da želitet izbrisat ovu pločicu?',
            type: 'error',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Da, želim!",
            cancelButtonText: "Ne želim!",
        }).then(function () {
            $.ajax({
                url: 'http://' + serverName + '/index.php',
                type: "POST",
                data: {
                    method: 'saveBoardToRoom',
                    id_waspmote: id,
                    id_room: "null"
                },
                dataType: "json",
                success: function (r) {
                    $(parent).remove();
                    swalConfirm("Uspješno izbrisana pločica!");
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }).catch(swal.noop);
    });
}

function removeAll() {
    $("#allCont").remove();
    $("#allCont2").remove();
    $("#graphRow").hide();
    $("#wrapDate").remove();
}

function getXaxis(data) {
    xAxis = [];
    data.data.forEach(function (item) {
        xAxis.push(item.reading_time);
    });
    return xAxis;
}

function getYaxis(data) {
    yAxis = [];
    data.data.forEach(function (item) {
        yAxis.push(item.reading_value);
    });
    return yAxis;
}

function displayGraph(data) {
    console.log(data);
    $("#graphRow").show();
    generateGraph(getXaxis(data), getYaxis(data));
    displayGraphOptions();
    scrollToItem("chartContainer", -100);
}

function generateGraph(x, y) {
	if(chart!==undefined && chart!==null){
	 chart.destroy();
	// console.log("unisito sam " + chart);
	}
	console.log(chart);
    var ctx = document.getElementById('myChart').getContext('2d');
     chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: x,
            datasets: [{
                fill: false,
                borderColor: '#1D62F0',
                data: y,
            }]
        },
        options: {
            legend: {
                display: false
            },
        }
    });
}

function displayGraphOptions() {
    var wrapOptions = $('<div id="wrapDate" class="col-md-12"></div>');
    var formDate = $('<form></form>');
    var dateInputStart = $('<h2>Prikaz grafa uz zadani interval<br><hr></h2><h3>Početak: </h3><input id="dateStart" type="date">');
    var dateInputEnd = $('<h3>Kraj: </h3><input id="dateEnd" type="date">');
    var sendDateButton = $('<button id="sendDate" style="width:50%;">Pošalji - <i class="fa fa-check" aria-hidden="true"></i></button>');
    var closeGraphButton = $('<button id="closeGraph" class="delButton" style="width:50%;">Zatvori prikaz grafa - <i class="fa fa-close" aria-hidden="true"></i></button>');    

    $(wrapOptions).append(formDate);
    $(formDate).append(dateInputStart).append(dateInputEnd).append(sendDateButton).append(closeGraphButton);
    $("#graphOptions").append(wrapOptions);

    $("#sendDate").click(function (e) {
        e.preventDefault();
        var start = $("#dateStart").val();
        var end = $("#dateEnd").val();
        var id = localStorage.getItem("boardID");
        var idS = localStorage.getItem("sensorId");
        var url = 'http://' + serverName + '/index.php?method=getSensorDataByDate&id_waspmote=' + id + '&id_sensor=' + idS + '&start_date=' + start + '&end_date=' + end;
        ajaxGET(url, "GET", generateGraphInterval);
    });

    $("#closeGraph").click(function (e) {
        e.preventDefault();
        $("#graphRow").hide(500);
        $("#wrapDate").remove(500);
    });
}

function generateGraphInterval(data) {
    console.log(data);
    generateGraph(getXaxis(data), getYaxis(data));
    scrollToItem("chartContainer", -50);
}

function onSelectListChange(id, callback, params) {
    $("#" + id).change(function () {
        $("#allCont").remove();
        $("#graphRow").hide();
        $("#wrapDate").remove();
        var idSelected = $('#' + id + ' :selected').attr("value")
        ajaxGET('http://' + serverName + '/index.php?' + params + idSelected, "GET", callback);
    });
}

function scrollToItem(id, off) {
    $('html, body').animate({
        scrollTop: $("#" + id).offset().top + off
    }, 500);
}

function swalConfirm(text) {
    swal({
        position: 'top-right',
        type: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1000,
        width: '300px'
    }).catch(swal.noop);
}

ajaxGET('http://' + serverName + '/index.php?method=getAllRooms', "GET", displayRooms);
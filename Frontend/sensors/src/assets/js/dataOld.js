$(document).ready(function(){
    //real time
    var global_id;
    var serverName = localStorage.getItem("serverName");
//real time
function change(id){

		console.log(id);

		var xhttp=new XMLHttpRequest();
		xhttp.onreadystatechange=function(){
			if(xhttp.readyState==4 && xhttp.status==200){
				jsonObj=JSON.parse(this.responseText);
				console.log(jsonObj)
				for(var i in jsonObj.data){
					//console.log(jsonObj.data)
					//console.log(jsonObj.data[i].reading_value)
					//console.log(jsonObj.data[i])
					if(i!="motion_sensor"){
					document.getElementsByClassName(i)[1].innerText=jsonObj.data[i].reading_value+" "+jsonObj.data[i].measure_unit
						document.getElementsByClassName(i)[0].innerText=i+ "\n" +jsonObj.data[i].reading_time
					}
					else{
						document.getElementsByClassName(i)[0].innerText=i+ "\n"+jsonObj.data[i].reading_time
						document.getElementsByClassName(i)[1].innerText= "\n"+"Zadnje prisustvo : \n" +jsonObj.data[i].reading_time
					}
				}
			}}
		xhttp.open("GET",'http://'+ serverName + '/index.php?method=getLastBoardData&id_waspmote='+id,true);
		xhttp.send();
    } 
    
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
    displayData(data.data);
    }
    
    function displayData(data){
    var togg = $('<button id="togg" class="hideGraph">Zatvori graf</button>').click(function(){$("#myChart").hide();togg.hide();$("#wrapDate").hide();});
    var toggData = $('<button id="toggData" class="hideGraph">Zatvori detaljan prikaz</button>').click(function(){$("#tbl").hide();toggData.hide();});    
    $(togg).insertAfter("#myChart").hide();
    $(toggData).insertAfter("#tbl").hide();
    function createGraph(x,y){
        togg.show();
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
        
            data: {
                labels: x.slice(x.length - 15, x.length - 1),
                datasets: [{
                    fill: false,
                    borderColor: '#1D62F0',
                    data: y.slice(y.length - 15, y.length - 1),
                }]
            },
            options: {
                legend: {
                    display: false
                },
            }
        });
    }

    function createGraphNoSlice(x,y){
        togg.show();
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
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
    var keys;
    function displayValues(sensor){
        //console.log(sensor.data);
        
        var xAxis=[],
            yAxis=[],
            motionData = [];
        keys = Object.keys(sensor.data);
        var cont = $('<div id="allCont"></div>'); 
        var graphDiv = $('<div class="col-md-12"></div>');            
        keys.forEach(function(key) {
            //console.log(key);
            var read = sensor.data[key];
            console.log(read);            
            console.log(read.readings[read.readings.length-1].reading_value);
            var wrap = $('<div class="col-md-3"></div>');
            var card = $('<div class="card cards"></div>');
            var header = $('<div class="header"></div>');
          //  var title = $('<h4 id="title" class="title"></h4>');
		  //real time
		  var title = $('<h4 id="title" class='+key+'></h4>');
            var date = $('<p id="date" class="category"></p>');
            var content = $('<div class="content"></div>');
            //var value = $('<h3 id="val" class="valDisplay"></h3>');
			var value = $('<h3 id="valTitle" class='+key+'></h3>');
            var moar = $('<button id_sensor="' + read.id_sensor + '" class="moarButton" id="' + key + '">Detalji</h3>');

            var chartTemp = $('<canvas id="myChart"></canvas>');

            xAxis[key]=[];
            yAxis[key]=[];
            for (var j = 0; j < read.readings.length; j++) {
                if(key!="motion_sensor" && xAxis[key]!=undefined && yAxis[key]!=undefined){
                    xAxis[key].push(read.readings[j].reading_time);
                    yAxis[key].push(read.readings[j].reading_value);
                }	
                else{
                    motionData.push(read.readings[j].reading_time);
                }						
            }
    
            $(title).text(key);

            var unit = read.measure_unit;
            if(key != "motion_sensor"){
			 //real time
			 //$(content).append(moar)
                $(value).text(read.readings[read.readings.length-1].reading_value + " " + unit)//.append(moar);
                //$(header).append(title).append("Zadnje mjeranje: " + read.readings[read.readings.length-1].reading_time) ;
				//real time
				  $(header).append(title)
            }else{
				//real time
				//$(content).prepend(moar)
                $(value).text(read.readings[read.readings.length-1].reading_time)//.append(moar);
              //  $(header).append(title).append(read.readings[read.readings.length-1].reading_time);
			  //real time
			  $(header).append(title)
            }

            $(content).prepend(value);
            $(content).prepend('<img width="80%" src="/PiiS/web/web2/assets/img/' + key + '.svg">').append(moar);
            
            $(card).append(header).append(content);
            $(wrap).append(card);
            $(cont).append(wrap);	
            
        });

        var wrapDate = $('<div id="wrapDate" class="col-md-12"></div>');
        var formDate = $('<form></form>');
        var dateInputStart = $('<h2>Prikaz grafa uz zadani interval<br><hr></h2><h3>Početak: </h3><input id="dateStart" type="date">');
        var dateInputEnd = $('<h3>Kraj: </h3><input id="dateEnd" type="date">');
        var sendDateButton = $('<button id="sendDate">Pošalji</button>');        
        
        $(wrapDate).append(formDate);
        $(formDate).append(dateInputStart).append(dateInputEnd).append(sendDateButton);
        $(wrapDate).insertAfter(togg).hide();
        
        $(cont).insertAfter("#selector");

        $.each(keys,function(key, value){
            if(value!="motion_sensor"){
                $("#"+value).click(function(e) {
                    var id = $(this).attr("id_sensor");
                    $("#sendDate").attr("sensor_id", id);
                    $('html, body').animate({
                        scrollTop: $("#chartContainer").offset().top
                    }, 500);
                    $("#myChart").show();
                    $(toggData).hide();
                    $("#tbl").hide();
                    $("#motion_sensor").prop('disabled', false);    
                    $("#allDataMotion").remove();
                    $("#allDataMotionTitle").remove();
                    $(wrapDate).show();             
                    createGraph(xAxis[value],yAxis[value]);
                    $("#myChart").attr("sensor_id", value);
                });
            }
        });

        $("#sendDate").click(function(e){
            e.preventDefault();
            var start = $("#dateStart").val();
            var end = $("#dateEnd").val();
            var id = $('#selectBoard :selected').attr("value");
            var idS = $(this).attr("sensor_id");
            //console.log(id +  " - " + idS + " - " + start + " - " + end);
            //console.log('http://'+ serverName + '/index.php?method=getSensorDataByDate&id_waspmote=' + id + '&id_sensor=' + idS + '&start_date=' + start + '&end_date=' + end);
            $.ajax({url: 'http://'+ serverName + '/index.php?method=getSensorDataByDate&id_waspmote=' + id + '&id_sensor=' + idS + '&start_date=' + start + '&end_date=' + end,
                type: "GET",
                dataType: "json",
                //async: false, 
                success: function(result){
                    console.log(result);
                    var xAxisG=[],
                        yAxisG=[];
                    for (var j = 0; j < result.data.length; j++) {
                        xAxisG[j] = result.data[j].reading_time;
                        yAxisG[j] = result.data[j].reading_value;				
                    }
                    createGraphNoSlice(xAxisG,yAxisG);
                    $('html, body').animate({
                        scrollTop: $("#chartContainer").offset().top
                    }, 500);
                },
                error: function(err){
                    console.log(err);
                }
            }); 
        });

        $("#motion_sensor").click(function(e) {
            $("#myChart").hide();
            $("#wrapDate").hide();            
            $(toggData).show();
            $(togg).hide();
            $("#tbl").show();
            $(this).prop('disabled', true);
            var all = $('<div id="allDataMotion"></div>');
            var title = $('<h2 id="allDataMotionTitle">Posljednjih 10 aktivnosti: </h2>');
            var motData = [];
            motData = motionData.slice(motionData.length - 10, motionData.length - 1)
            for (var i = 0; i < motData.length; i++) {

                var card = $('<div class="card cards"></div>');
                var header = $('<div class="headerMotion"></div>');
                
                $(header).text(motData[i]);
                $(card).append(header);
                $(all).append(card);
            }

            $("#tbl").append(title).append(all);
            $('html, body').animate({
                scrollTop: $("#allDataMotionTitle").offset().top
            }, 500);
        });
    }

    for(var i = 0; i < data.length; i++){
        console.log(data[i].serial_id);
        var boardItem = document.createElement("option");
        boardItem.setAttribute("value", data[i].id);
        boardItem.innerHTML = data[i].serial_id;
        $("#selectBoard").append(boardItem);
    }

    $("#selectBoard").change(function() {
        $(togg).hide();
        $(toggData).hide();
        $("#wrapDate").hide();
        $("#allCont").remove();
        $("#myChart").hide();
        $("#allDataMotion").remove();
        $("#allDataMotionTitle").remove();
        var id = $('#selectBoard :selected').attr("value");
		global_id=id;
        $.ajax({url: 'http://'+ serverName + '/index.php?method=getAllBoardData&id_waspmote=' + id,
            type: "GET",
            dataType: "json",
            //async: false, 
            success: function(result){
                displayValues(result);
				//real time
				change(global_id);
			   setInterval(function(){ change(global_id); }, 3000);
            },
            error: function(err){
                console.log(err);
            }
        }); 
    });
    }
    
    load('http://'+ serverName + '/index.php?method=getAllBoards', "GET", "json", parse);
    //load('http://93.180.118.197:2565/piis/index.php?method=getAllBoards', "GET", "json", parse);
	//real time 
	console.log("hahah");

});
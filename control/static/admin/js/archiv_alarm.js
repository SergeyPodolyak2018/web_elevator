var global_alarm_quantity_function=0;
//var global_alarm_quantity_function={};
var quantityOfAlarm=0;

//архив аварий-------------------------------------------------------------------------------------
function archiv_alarm(){
    var number=0;
	var url_string = '/alarm_arxiv/?index='+0+'&type_m='+0+'&date_s='+0+'&date_p='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

                hidemenu();
                
            	var  message=JSON.parse(result);
            	
            	var temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].device+'</td><td>'+message[i].text+'</td><td>'+message[i].ack+'</td></tr>'
            	    temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td style="width: 30%;">'+message[i].device+'</td><td style="width: 40%;">'+message[i].text+'</td><td>'+message[i].ack+'</td></tr>'

            	}
            	var div_menu = document.getElementById('table_rchiv_message');
        		div_menu.innerHTML = temp_string;

        		var filter_selector = document.getElementById('message_filter');
        		filter_selector.innerHTML = '<select id="message_filter_select" required size = "1" width="30%" onchange="archiv_alarm_sort('+0+','+'this'+',1)">'+
                                           '<option value="0" >Все</option>'+
                                           '<option value="1" >Аварийные</option>'+
                                           '<option value="2" >Предупрежнения</option>'+
                                           '<option value="3" >Статусы</option>'+
                                           '<option value="4" >Подсказки</option>'+
                                           '<option value="5" >Лог</option>'+
                                       '</select>';
        		var filter_selector = document.getElementById('archiv_message_filter_button');
        		filter_selector.onclick = function(){archiv_alarm_sort(number,0,2)};
                // '<button class="modal_box_btn" style="float:right"' +
                //     ' onclick="archiv_alarm_sort('+number+','+0+','+2+')">Сортировать</button>';
                
        		$('#archiv_message').show();
                
                 universalTableBuilder('#table_head_rchiv_message','#table_rchiv_message>tbody');
               


            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

//аварии конкретного устройства
function archiv_alarm_device(){

     var devise_name_complit=$("#Name_devise").text();
     var number = parseInt(devise_name_complit.match(/-*[0-9]+/));
	var url_string = '/alarm_arxiv/?index='+number+'&type_m='+0+'&date_s='+0+'&date_p='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                
                //$( "#menu").dialog( "close" );
                objectMenuManager.hide();

            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].device+'</td><td>'+message[i].text+'</td><td>'+message[i].ack+'</td></tr>';
            	    temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td style="width: 30%;">'+message[i].device+'</td><td style="width: 40%;">'+message[i].text+'</td><td>'+message[i].ack+'</td></tr>';

            	}
            	var div_menu = document.getElementById('table_rchiv_message');
        		div_menu.innerHTML = temp_string;

        		var filter_selector = document.getElementById('message_filter');
        		filter_selector.innerHTML = '<select id="message_filter_select" required size = "1" width="30%" onchange="archiv_alarm_sort('+number+','+'this'+',1)">'+
                                           '<option value="0" >Все</option>'+
                                           '<option value="1" >Аварийные</option>'+
                                           '<option value="2" >Предупрежнения</option>'+
                                           '<option value="3" >Статусы</option>'+
                                           '<option value="4" >Подсказки</option>'+
                                           '<option value="5" >Лог</option>'+
                                       '</select>';
        		var filter_selector = document.getElementById('archiv_message_filter_button');
        		filter_selector.onclick = function(){archiv_alarm_sort(number,0,2)};
                // filter_selector.innerHTML = '<button class="modal_box_btn" onclick="archiv_alarm_sort('+number+','+0+','+2+')">Сортировать</button>';

        		$('#archiv_message').show();
                 universalTableBuilder('#table_head_rchiv_message','#table_rchiv_message>tbody');

                


            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

//сортировка аварий
function archiv_alarm_sort(number,type_m,selector_or_button){
    var date_s=0;
    var date_p=0;
    var type=$(type_m).val();
    if(selector_or_button==2){
    type=$('#message_filter_select').val();
    date_s=$('#datepicker_message1').val(); //значение календаря 1
    date_p=$('#datepicker_message2').val(); //значение календаря 2
    }

	var url_string = '/alarm_arxiv/?index='+number+'&type_m='+type+'&date_s='+date_s+'&date_p='+date_p;
	

	console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

                
            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].device+'</td><td>'+message[i].text+'</td><td>'+message[i].ack+'</td></tr>'
            	    temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td style="width: 30%;">'+message[i].device+'</td><td style="width: 40%;">'+message[i].text+'</td><td>'+message[i].ack+'</td></tr>'

            	}
            	var div_menu = document.getElementById('table_rchiv_message');
        		div_menu.innerHTML = temp_string;
                 universalTableBuilder('#table_head_rchiv_message','#table_rchiv_message>tbody');

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

function archiv_alarm_close(){
                
                document.getElementById('datepicker_message1').value =''; //arase of datepicker input element1
                document.getElementById('datepicker_message2').value =''; //arase of datepicker input element2            
        		$('#archiv_message').hide(); //close window
}



//архив маршрутов//////////////////////////////////////////////////////////
function archiv_rout(){

	var url_string = '/route_arxiv/?date_s='+0+'&date_p='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

                hidemenu();
                
            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].source+'</td><td>'+message[i].receive+'</td><td>'+message[i].kylt+'</td><td>'+message[i].status+'</td></tr>'
            	    temp_string=temp_string+'<tr><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td' +
                        ' style="min-width: 160px;">'+message[i].source+'</td><td style="min-width: 160px;">'+message[i].receive+'</td><td>'+message[i].kylt+'</td><td style="min-width: 110px;">'+message[i].nor+'</td><td>'+message[i].status+'</td></tr>';

            	}
            	var div_menu = document.getElementById('table_rchiv_rout');
        		div_menu.innerHTML = temp_string;
        		$('#archiv_rout').show();
                universalTableBuilder('#table_head_rchiv_rout','#table_rchiv_rout>tbody');


            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}


function archiv_rout_sort(){

	var url_string = '/route_arxiv/?date_s='+$('#datepicker_rout1').val()+'&date_p='+$('#datepicker_rout2').val();
	    console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {


            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].source+'</td><td>'+message[i].receive+'</td><td>'+message[i].kylt+'</td><td>'+message[i].status+'</td></tr>'
            	    temp_string=temp_string+'<tr><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td' +
                        ' style="min-width: 160px;">'+message[i].source+'</td><td style="min-width: 160px;">'+message[i].receive+'</td><td style="min-width: 70px;">'+message[i].kylt+'</td><td style="min-width: 110px;>'+message[i].nor+'</td><td>'+message[i].status+'</td></tr>'

            	}
            	var div_menu = document.getElementById('table_rchiv_rout');
        		div_menu.innerHTML = temp_string;
                universalTableBuilder('#table_head_rchiv_rout','#table_rchiv_rout>tbody');



            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

function archiv_rout_close(){               
                document.getElementById('datepicker_rout1').value =''; //arase of datepicker input element1
                document.getElementById('datepicker_rout2').value =''; //arase of datepicker input element2         
        		$('#archiv_rout').hide();
}


//архив по всем устройствам
function archiv_devices(){

	var url_string = '/device_arxiv/?index='+0+'&date_s='+0+'&date_p='+0;
	console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

                hidemenu();
                
            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].name+'</td><td>'+message[i].status+'</td></tr>';
            	    temp_string=temp_string+'<tr><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td style="width: 60%;">'+message[i].name+'</td><td style="width: 30%;">'+message[i].status+'</td></tr>';

            	}
            	var div_menu = document.getElementById('table_rchiv_device');
        		div_menu.innerHTML = temp_string;
        		var filter_button = document.getElementById('archiv_device_filter_button');
        		filter_button.onclick = function(){archiv_device_sort(0)};
                // filter_button.innerHTML = '<button class="modal_box_btn" onclick="archiv_device_sort(0)">Сортировать</button>';

        		$('#archiv_device').show();
                universalTableBuilder('#table_head_rchiv_device','#table_rchiv_device>tbody');


            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

//архив событий конкретного устройства
function archiv_device(){
     //$( "#menu").dialog( "close" );
     objectMenuManager.hide();
     var devise_name_complit=$("#Name_devise").text();
     var number = parseInt(devise_name_complit.match(/-*[0-9]+/));
	 var url_string = '/device_arxiv/?index='+number+'&date_s='+0+'&date_p='+0;

	console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {


            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].name+'</td><td>'+message[i].status+'</td></tr>';
            	    temp_string=temp_string+'<tr><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td style="width: 60%;">'+message[i].name+'</td><td style="width: 30%;">'+message[i].status+'</td></tr>';

            	}
            	var div_menu = document.getElementById('table_rchiv_device');
        		div_menu.innerHTML = temp_string;
        		var filter_button = document.getElementById('archiv_device_filter_button');
        		filter_button.onclick = function(){archiv_device_sort(number)};
                // filter_button.innerHTML = '<button class="modal_box_btn" onclick="archiv_device_sort('+number+')">Сортировать</button>';

        		$('#archiv_device').show();
                universalTableBuilder('#table_head_rchiv_device','#table_rchiv_device>tbody');


            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

function archiv_device_sort(number){


	var url_string = '/device_arxiv/?index='+number+'&date_s='+$('#datepicker_device1').val()+'&date_p='+$('#datepicker_device2').val();
	console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {


            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {
            		//temp_string=temp_string+'<tr><td>'+message[i].id+'</td><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].name+'</td><td>'+message[i].status+'</td></tr>';
            	    temp_string=temp_string+'<tr><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td style="width: 60%;">'+message[i].name+'</td><td style="width: 30%;">'+message[i].status+'</td></tr>';

            	}
            	var div_menu = document.getElementById('table_rchiv_device');
        		div_menu.innerHTML = temp_string;
                universalTableBuilder('#table_head_rchiv_device','#table_rchiv_device>tbody');



            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

function archiv_device_close(){
                document.getElementById('datepicker_device1').value =''; //arase of datepicker input element1
                document.getElementById('datepicker_device2').value =''; //arase of datepicker input element2 
        		$('#archiv_device').hide();
}



//текущие аварии

//Функция которая создаст конструктор со счетчиком
/*
function makeFunctionCreator(){
    var key=0;
    var functionCreator=function(){
        var counter=key+1;
        var functionVithId=function(externalF,param){
            externalF(param,counter);
        }
        functionVithId.getId=function(){return counter;}

        return functionVithId;
    }


    return functionCreator;
}
//Создать конструктор
var functionConstrutorWithInternalId=makeFunctionCreator();

*/


function alarm(){
    if($('#alarm_message').css('display')=='none'){

        var url_string = '/alarm/';
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	for (var i  in message) {            		
            	    if (i!='quantity'){
            	        temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].device+'</td><td>'+message[i].text+'</td><td style="text-align:center;">'+message[i].ack+'</td><td>'+'<button class="modal_box_btn" onclick="alarm_confirmation(this,'+message[i].id+','+message[i].alarm+','+message[i].eqindex+')">Квитировать</button>'+'</td></tr>'
                    }
            	}
            	var div_menu = document.getElementById('table_alarm_message');
        		div_menu.innerHTML = temp_string;
        		$('#alarm_message').show();
                universalTableBuilder('#table_head_alarm_message','#table_alarm_message>tbody');



        		//повесить циклический запрос на сравнение колличества аварий                
               global_alarm_quantity_function=setInterval(function() { alarm_quantity() }, 1000);              

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

    }


}

//Функция квитирования аварии
function alarm_confirmation(button,id,number,device){
    
    button.disabled=true;
var url_string = '/alarm_ack/?id='+id+'&alarm='+number+'&eqindex='+device;
$.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

            	//clearInterval(global_alarm_quantity_function);

            	table_alarm_message_rebild();

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

}
//Функция квитирования всех аварий
function alarm_confirmation_all(){   
    
var url_string = '/alarm_ack_all/';
$.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

                //clearInterval(global_alarm_quantity_function);

                table_alarm_message_rebild();

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

}

//Циклическая функция опросса колличества аварий
function alarm_quantity(quantity){
    //console.log("This of set interval="+a);
    var url_string = '/alarm_quantity/';
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {                    
                var  rez=JSON.parse(result);
                if (rez.quantity>0){
                	if (rez.quantity!=quantityOfAlarm){
                        
                        quantityOfAlarm=rez.quantity

                	    table_alarm_message_rebild();

                	}
                }else{
                    //alarm_message_close();
                }
               

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

//Функция перестроения содержания таблици

function table_alarm_message_rebild(){
     var url_string = '/alarm/';
        $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                console.log("Результат запроса ребилд");
                console.log(result);
            	var  message=JSON.parse(result);
            	
            	temp_string='';
            	if (message.quantity>0){
                    for (var i  in message) {

                        if (i!='quantity'){
                         temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].device+'</td><td>'+message[i].text+'</td><td style="text-align:center;">'+message[i].ack+'</td><td>'+'<button style="padding-left: 5px;padding-right: 5px;padding-top: 1px;padding-bottom: 1px;margin-bottom: 5px;" class="modal_box_btn" onclick="alarm_confirmation(this,'+message[i].id+','+message[i].alarm+','+message[i].eqindex+')">Квитировать</button>'+'</td></tr>'
                         //temp_string=temp_string+'<tr style="background-color:'+message[i].color+'"><td>'+message[i].date+'</td><td>'+message[i].time+'</td><td>'+message[i].device+'</td><td>'+message[i].text+'</td><td>'+message[i].ack+'</td><td>'+'<a href="#" class="printButton" onclick="alarm_confirmation(this,'+message[i].id+','+message[i].alarm+','+message[i].eqindex+')"><img src="/static/admin/img/confirm.png"></a>'+'</td></tr>'
                       
                        }
                    }
                    var div_menu = document.getElementById('table_alarm_message');
                    div_menu.innerHTML = temp_string;
                    $('#alarm_message').show();

                    //повесить циклический запрос на сравнение колличества аварий
                    //global_alarm_quantity_function=setInterval(function() { alarm_quantity(message.quantity,this) }, 1000);
                    //console.log("table_alarm_message_rebild")
               //console.log(global_alarm_quantity_function);


                } else{
                    var div_menu = document.getElementById('table_alarm_message');
                    div_menu.innerHTML = "";
                    //alarm_message_close();

                }

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

function alarm_message_close(){
                  //закончить циклический запрос
                clearInterval(global_alarm_quantity_function);
        		$('#alarm_message').hide();

}


function universalTableBuilder(selector,selector1){    
    var head;
    var body;
    head= document.querySelectorAll(selector)[0];    
    if(document.querySelectorAll(selector1)[0]!=undefined){
        body = document.querySelectorAll(selector1)[0].children[0];
        for (var i = 0; i < body.childElementCount; i++) {            
            head.children[i].style.width=""+(body.children[i].clientWidth)+"px";
        }
    }                
}

function printContentOfDifferentVindows(targetDivName){

    var temp=document.getElementById(targetDivName);    
    
    var temp2=temp.children[0];//header element
    var temp3=temp.children[1].children[0].children[0].innerHTML;
    //Create first row    
    var tempStringTr="<tr>"
    for (var i = 0; i < temp2.childElementCount; i++) {                
            tempStringTr=tempStringTr+"<td>"+temp2.children[i].innerText+"</td>";
        }
        tempStringTr=tempStringTr+"</tr>";
    var param='width=800, height=900, top=100, left=100, resizable=no';    
    win = window.open("", "_blank", param);
    win.document.open();
    
    var tempScript="<script>window.print();window.close()</script>"
    var prtCSS = '<link rel="stylesheet" href="/static/admin/css/printer.css" type="text/css" />'+'<table id="table_rchiv_message">'+tempStringTr+temp3+'</table>'+tempScript;
    win.document.write(prtCSS);
    
    win.document.close();
    win.focus();
    

}
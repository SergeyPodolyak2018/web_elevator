
var source_index=0; //индекс источника
var receiver_index=0; //индекс приемника

//функция клик на источнике

function clic_on_source(){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
    header_menu.hide_button(start_rout_button);//спарятать кнопку
    header_menu.show_button(cancel_start_rout_button);//показать кнопку
    console.log('kjfv');
    $('.stop_rout_linck').addClass("set_disabled");//заблокировать кнопку

	$(svgdom.getElementsByClassName("source")).on('click', function(e){
	    //var source_name =($(this).attr('id'));
	    var source_name =($(this).attr('class').split(' ')[1]);

	    var source_index_internal=parseInt(source_name.match(/-*[0-9]+/));
	    console.log(source_index_internal);

	    var url_string = '/route_source/?source='+source_index_internal;



         $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
            hide_source_receiver();
            }},
            success: function( result ) {
            	 var  status_source=JSON.parse(result);
            	 if (status_source.alarm ==0) {
            	 	show_source(source_index_internal);//показать источник
            	 }else{
            	 	restart_rout_variant_confirm(source_index_internal);
            	 }
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            hide_source_receiver();
            }
        });


     })
}


//клик на источник при остановке маршрута
function clic_on_stop_source(){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
        header_menu.hide_button(stop_rout_button);
        header_menu.show_button(cancel_stop_rout_button);
         $('.start_rout_linck').addClass("set_disabled");
	 $(svgdom.getElementsByClassName("source")).on('click', function(e){
        var source_name =($(this).attr('class').split(' ')[1]);    
        var mask_start=1048576;
        var source_index_internal=parseInt(source_name.match(/-*[0-9]+/));

        //проверка в глобальном объекте что объект действительно источник
        var mask_start=1048576;
        var status=global_object_status[source_index_internal][3];
        if ((status & mask_start)>0){
            stop_rout_variant_confirm(source_index_internal);
        }        
     })
}
//клик на источник при экстренной остановке маршрута
function clic_on_extra_stop_source(){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
	    //$(svgdom.getElementsByClassName("iconsource")).show();
        header_menu.hide_button(extra_stop_rout_button);
        header_menu.show_button(cancel_extra_stop_rout_button);
         $('.start_rout_linck').addClass("set_disabled");
         $('.stop_rout_linck').addClass("set_disabled");

		$(svgdom.getElementsByClassName("source")).on('click', function(e){
	    var source_name =($(this).attr('class').split(' ')[1]);
	    var source_index_internal=parseInt(source_name.match(/-*[0-9]+/));
	    var url_string = '/route/?source='+source_index_internal+'&receive='+0+'&command='+10+'&index='+0+'&kylt='+0;
		hide_source_receiver();
		send_comand(url_string);

     })
}

//клик на приемнике
function clic_on_receiver(){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;

	 $(svgdom.getElementsByClassName("receiver")).on('click', function(e){
     //var receiver_name =($(this).attr('id'));
     let temp=($(this).attr('class').split(' ')).indexOf('receiver');
     let receiver_name =($(this).attr('class').split(' ')[temp+1]);
     let receiver_index=parseInt(receiver_name.match(/-*[0-9]+/));
     show_receiver(receiver_index);
     })
}

//спрятать источники и приемники
function hide_source_receiver(){
var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
	 $(svgdom.getElementsByClassName("iconsource")).hide();
	 $(svgdom.getElementsByClassName("iconreceiver")).hide();
     $('.button_with_SVG').removeClass( "set_disabled" );
	 header_menu.hide_button(cancel_start_rout_button);
     header_menu.show_button(start_rout_button);
     header_menu.hide_button(cancel_stop_rout_button);
     header_menu.show_button(stop_rout_button);
     header_menu.hide_button(cancel_extra_stop_rout_button);
     header_menu.show_button(extra_stop_rout_button);
     $(svgdom.getElementsByClassName("source")).off();
     $(svgdom.getElementsByClassName("receiver")).off();

}

//показать источник
function show_source(index){
var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
	 $(svgdom.getElementsByClassName("iconsource"+index)).show();
	 $(svgdom.getElementsByClassName("source")).off();
	 source_index=index;
	 clic_on_receiver();
}
//показать приемник
function show_receiver(index){
var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
	 $(svgdom.getElementsByClassName("iconreceiver"+index)).show();
	 $(svgdom.getElementsByClassName("receiver")).off();
	 receiver_index=index;
	 send_rout_data();
	 }
//отправка данных для просчета вариантов
function send_rout_data(){
	if (source_index>0 && receiver_index>0) {
		var url_string = '/route_variant/?source='+source_index+'&receive='+receiver_index+'&command='+1;
        $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
            hide_source_receiver();
            }},
            success: function( result ) {

            	var  route_variant_temp=JSON.parse(result);
            	console.log(route_variant_temp);
            	if (route_variant_temp.status ==2) {
            		show_rout_variant_window(result);
            		$('.start_rout_linck').addClass("set_disabled");

            	} else {
            		$('#alarm_rout_content').text(route_variant_temp.message);
	            	var alarm_rout_footer_button_temp = '<tr><td width="99%" align="center"><button' +
                        ' class="modal_box_btn" onclick="close_alarm_rout(event)">ОK</button></td></tr>';
	            	$('#alarm_rout_footer_button').html(alarm_rout_footer_button_temp);
	            	$('#alarm_rout').show();
            	}


            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            hide_source_receiver();
            }
        });
	}else{
		hide_source_receiver();
	}
}

//показать варианты маршрутов
function show_rout_variant_window(json_from_server){
	var  rout_wariant=JSON.parse(json_from_server);
    console.log(rout_wariant);
    var table_body='<tr>';
    var selekt_kult='';
    var i=0;
    var j=0;
    for(var k in rout_wariant){
    	console.log(k);

    	if ((k.replace(/\d/g, ''))=='variant') {
    		i=i+1;
            let textColor='';
            if(rout_wariant[k].color=='#00ff00'){
                textColor='black';
            }
    		//table_body=table_body+'<td><button style="width:40px;height:40px;background:'+rout_wariant[k].color+'" onclick="show_rout_variant('+i+')">'+i+'</button></td>';
    		table_body=table_body+'<td><a href="#" class="button_rout" style="background:'+rout_wariant[k].color+'; color:'+textColor+'" onclick="show_rout_variant('+i+',this)">'+i+'</a></td>'

    	}
        /*
    	if (k=='kylt') {
    		for (var i = 0; i < rout_wariant[k].length; i++) {
    			selekt_kult=selekt_kult+'<option value="'+(i+1)+'" >'+rout_wariant[k][i]+'</option>';
    		}

    	}
        */
    }

    table_body=table_body+'</tr>';
    var div_table_rout_variant = document.getElementById('table_rout_variant');
    var div_kult = document.getElementById('kult');
    div_table_rout_variant.innerHTML = table_body;
    //div_kult.innerHTML = selekt_kult;
    div_kult.innerHTML =global_object_oll_kylt_from_server;
    $('#rout').show();
    var a = $('#rout_variant').width();
    if(a>145){
    $('#rout').width(a+5);
    }else{
    $('#rout').width(145);
    }

    //установить выбранную культуру
    $("#kult option[value='"+rout_wariant.kylt_select+"']").attr("selected", "selected");


}

//показать конкретный вариант маршрута
function show_rout_variant(i,element){
    $('.button_rout').css('background','');
    //$('.button_rout').css('color','#efcd1f');
    $('.button_rout').css('color','');
    $(element).css('background','#00ff00');
    $(element).css('color','black');
	var url_string = '/route/?source='+0+'&receive='+0+'&command='+2+'&index='+i+'&kylt='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
            hide_source_receiver();
            }},
            success: function( result ) {


            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            hide_source_receiver();
            }
        });


}

//начать проверку вариантов
function start_chek_variant(){
	var kultura_selector = document.getElementById("kult");
    var kultura_value=kultura_selector.value;

	var url_string = '/route_check/?source='+0+'&receive='+0+'&command='+3+'&index='+0+'&kylt='+kultura_value;
        $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
            hide_source_receiver();
            }},
            success: function( result ) {

            	var  rout_source_receiver=JSON.parse(result);
            	console.log(rout_source_receiver);
            	$('#rout').hide();
            	if (rout_source_receiver.status ==8) {
                    let selector_for_test='#rout_confirmation_footer td button'
                    let buttonTarget=document.querySelectorAll(selector_for_test)[0];
                    buttonTarget.removeEventListener('click', confirm_mixing_kylt);
                    buttonTarget.addEventListener('click', start_rout_variant, false);
            		$('#rout_confirmation_source').html(rout_source_receiver.source);
	            	$('#rout_confirmation_receiver').html(rout_source_receiver.receive);
	            	$('#rout_confirmation').show();
            	}
                if (rout_source_receiver.status ==9) {
                    let selector_for_test='#rout_confirmation_footer td button'
                    let buttonTarget=document.querySelectorAll(selector_for_test)[0];
                    buttonTarget.removeEventListener('click', start_rout_variant);
                    buttonTarget.addEventListener('click', confirm_mixing_kylt, false);
                    $('#rout_confirmation_source').html(rout_source_receiver.source);
                    $('#rout_confirmation_receiver').html(rout_source_receiver.receive);                    
                    $('#rout_confirmation').show();
                }
            	if (rout_source_receiver.status ==4) {	
                    $('#alarm_rout_content').html(rout_source_receiver.message);
	            	var alarm_rout_footer_button_temp = '<tr><td width="99%" align="center"><button' +
                        ' class="modal_box_btn" onclick="close_alarm_rout(event)">ОK</button></td></tr>';
	            	$('#alarm_rout_footer_button').html(alarm_rout_footer_button_temp);
	            	$('#alarm_rout').show();
            	}



            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            hide_source_receiver();
            }
        });


}

//Окно подьверждение смешивания культур
function confirm_mixing_kylt(){
    $('#rout_confirmation').hide();
    $('#confirm_mixin_kylt_rout').show();
}


//выйти из проверки вариантов
function exit_rout_variant(){
    //console.log(e);
    //e.preventDefault();
    //e.stopPropagation();
	var url_string = '/route/?source='+0+'&receive='+0+'&command='+4+'&index='+0+'&kylt='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
            hide_source_receiver();
            }},
            success: function( result ) {
            	$('#rout').hide();
            	hide_source_receiver();
            	$('#rout_confirmation').hide();
                $('#confirm_mixin_kylt_rout').hide();

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            hide_source_receiver();
            }
        });
        //hide_source_receiver();

        
}

//запуск конкретного варианта
function start_rout_variant(){
    //console.log(e);
    //e.preventDefault();
    //e.stopPropagation();
	var url_string = '/route/?source='+0+'&receive='+0+'&command='+5+'&index='+0+'&kylt='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
                hide_source_receiver();
            }},
            success: function( result ) {
            	$('#rout').hide();
            	hide_source_receiver();
            	$('#rout_confirmation').hide();
                $('#confirm_mixin_kylt_rout').hide();
            },
            error: function (jqXHR, exception) {
                console.log(exception);
                alert('Сервер не отвечает');
                hide_source_receiver();
            }
        });
        //hide_source_receiver();


}

//подтверждние остановки маршрута
function stop_rout_variant_confirm(source_index){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
	 $(svgdom.getElementsByClassName("iconsource"+source_index)).show();
	 $(svgdom.getElementsByClassName("source")).off();

	$('#stop_rout_confirmation_footer_button').html('<tr><td width="33%"><button class="modal_box_btn"' +
        ' style="width: 120px;" onclick="rebild_rout_variant('+source_index+')">Перестроить</button></td><td' +
        ' width="33%"><button' +
        ' class="modal_box_btn" style="width: 120px;" onclick="stop_rout_variant('+source_index+')">Остановить</button></td><td' +
        ' width="30%"><button class="modal_box_btn" style="width: 120px;"' +
        ' onclick="exit_stop_rout_variant()">Отмена</button></td></tr>')
	$('#stop_rout_confirmation').show();

}

//подтверждние перезапуска маршрута
function restart_rout_variant_confirm(source_index){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;

	 $(svgdom.getElementsByClassName("source")).off();

	$('#restart_rout_confirmation_footer_button').html('<tr><td width="33%"><button style="width: 125px;"' +
        ' class="modal_box_btn"' +
        ' onclick="manual_restart('+source_index+')">Ручной запуск</button></td><td width="33%"><button' +
        ' style="width: 125px;" class="modal_box_btn"' +
        ' onclick="auto_restart('+source_index+')">Авт. запуск</button></td><td width="30%"><button' +
        ' style="width: 125px;" class="modal_box_btn" onclick="exit_restart()">Отмена</button></td></tr>');
    $('#restart_rout_confirmation').show();

}


//остановка маршрута
function stop_rout_variant(source_index){
	var url_string = '/route/?source='+source_index+'&receive='+0+'&command='+8+'&index='+0+'&kylt='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
                hide_source_receiver();
            }},
            success: function( result ) {
            	$('#stop_rout_confirmation').hide();
            	hide_source_receiver();
            },
            error: function (jqXHR, exception) {
                console.log(exception);
                alert('Сервер не отвечает');
                hide_source_receiver();
            }
        });
        //hide_source_receiver();
}

//престройка маршрута
function rebild_rout_variant(source_index){
	var url_string = '/route/?source='+source_index+'&receive='+0+'&command='+14+'&index='+0+'&kylt='+0;
        $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
            hide_source_receiver();
            }},
            success: function( result ) {
            	$('#stop_rout_confirmation').hide();
            	hide_source_receiver();
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            hide_source_receiver();
            }
        });
        //hide_source_receiver();
}

//выход из меню стоп маршрут
function exit_stop_rout_variant(){
	hide_source_receiver();
	$('#stop_rout_confirmation').hide();
}

function manual_restart(source_index){

	var url_string = '/route/?source='+source_index+'&receive='+0+'&command='+13+'&index='+0+'&kylt='+0;
	hide_source_receiver();
	send_comand(url_string);
	$('#restart_rout_confirmation').hide();
}

function auto_restart(source_index){
	var url_string = '/route/?source='+source_index+'&receive='+0+'&command='+12+'&index='+0+'&kylt='+0;
	hide_source_receiver();
	send_comand(url_string);
	$('#restart_rout_confirmation').hide();
}

function exit_restart(source_index){

	hide_source_receiver();

	$('#restart_rout_confirmation').hide();
}

function close_alarm_rout(e){
	exit_rout_variant(e);

	$('#alarm_rout').hide();
}

function send_comand(url_string){
    console.log(url_string);
	$.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');
            hide_source_receiver();
            }},
            success: function( result ) {},
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            hide_source_receiver();
            }
        });
}

function refit_route_command(index){
    var url_string = '/route/?source='+0+'&receive='+0+'&command='+29+'&index='+index+'&kylt='+0;
    $.ajax({
            url: url_string,
            data: {},
            timeout:5000,
            statusCode:{404:function(){alert('Функция не реализована');            
            }},
            success: function( result ) {refit_route_close()},
            error: function (jqXHR, exception) {
                console.log(exception);
                alert('Сервер не отвечает');
                hide_source_receiver();
            }
        }
    );
}
function refit_route_close(){
    document.getElementById('refit_route_window').style.display = 'none';
}
function refit_route_open(index){
    let refit_route_window=document.getElementById('refit_route_window');
    refit_route_window.style.display = 'block';
    console.log(refit_route_window);
    let refit_route_command_button=refit_route_window.getElementsByClassName('refit_route_command_button')[0];
    console.log(refit_route_command_button);    
    refit_route_command_button.onclick=function(){refit_route_command(index);};
}
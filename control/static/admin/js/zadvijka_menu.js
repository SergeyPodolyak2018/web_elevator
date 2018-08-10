var start_ask_zadvijka=0;
var temp_full_close=document.getElementById('zadvijka_kontrol_menu_button_full_close');
temp_full_close.addEventListener('click', send_command_close_fully, false);
var zadvijkaButtonOpen=document.getElementById('zadvijka_kontrol_menu_button_open');
var zadvijkaButtonClose=document.getElementById('zadvijka_kontrol_menu_button_close');
zadvijkaButtonOpen.addEventListener('click', send_command_open_second, false);
zadvijkaButtonClose.addEventListener('click', send_command_close_second, false);

//Первый запрос с командой для задвижки (выгрузка данных в бункер)
function zadvijka_command(command,p1,p2,index,type){
            //var devise_name_complit=$("#Name_devise").text();
            //var number = parseInt(devise_name_complit.match(/-*[0-9]+/));
            var number=index;
            var val3 = 0;
            var val4 = 0;
            var url_string ='/io_command/?'+escape('UD_DB.EquipCommand')+'='+command+'&'+escape('UD_DB.EquipIndex')+'='+number+'&'+escape('UD_DB.Command_P1')+'='+val3+'&'+escape('UD_DB.Command_P2')+'='+val4;

            $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    
                    }},
                        success: function( result ) {
                            zadvijka_chek_command_rezult(number);
                    },
                        error: function (jqXHR, exception) {
                        console.log(exception);
                        alert('Сервер не отвечает');                    
                    }
            });
        }


//Запрос принял ли контроллер данные задвижки

function zadvijka_chek_command_rezult(index){
            var val3 = 0;
            var val4 = 0;
            var url_string ='/control_zadv_wait/?index='+index;

            $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    
                    }},
                    success: function( result ) {
                        var  zadvijka_status=JSON.parse(result);
                        $('#zadvijka_time_duration').val(zadvijka_status.zadv_time_duration);

                        zadvijka_menu_open();
                        let div_settings_header_name=document.getElementById('zadvijka_kontrol_menu_header');
                        console.log(div_settings_header_name);
                        let selector='td.settings_header_name';
                        let settings_header_name = div_settings_header_name.querySelectorAll(selector);
                        console.log(settings_header_name);
                        settings_header_name[0].innerText=menu_header_text[index].longName;
                        /*$( "#menu").dialog( "close" );*/
                        objectMenuManager.hide();
                        start_ask_zadvijka= setInterval(function() { get_zadvijka_state(index) }, 1000);

                    },
                    error: function (jqXHR, exception) {
                    console.log(exception);
                    alert('Сервер не отвечает');
                    
                    }
            });
        }








//открыть окно задвижки

function zadvijka_menu_open(){
    $('#zadvijka_kontrol_menu').show();

}


//Закрыть окно задвижки
function zadvijka_menu_close(){
    $('#zadvijka_kontrol_menu_content_control_radiobutton').prop("checked",true);
    change_button_name('#zadvijka_kontrol_menu_content_control_radiobutton');
    $('#zadvijka_kontrol_menu').hide();
    clearInterval(start_ask_zadvijka);
}

//Инкремент декремент полей

function increment_decrement(name_of_field, i_or_d, milisecond_or_persents,increment_fast_slow){
    var increment_value=0;
    var increment_value_scale=0;
    var temp_value=0;
    var temp_value2=0;
    if(increment_fast_slow==0){
        increment_value_scale=1;
    }else{
        if(milisecond_or_persents>0){
            increment_value_scale=5;
           }else{increment_value_scale=10;}
        }

    if(milisecond_or_persents>0){
        increment_value=1*increment_value_scale;
        temp_value2=5;
        temp_value3=100;
    }else{
        increment_value=100*increment_value_scale;
        temp_value2=100;
        temp_value3=20000;
    }
    temp_value=$('#'+name_of_field).val();
    temp_value=parseInt(temp_value);


    if(i_or_d>0 && temp_value<=(temp_value3-increment_value)){
        $('#'+name_of_field).val(temp_value+increment_value);

    }else{
        if(i_or_d==0 && temp_value>increment_value){
            $('#'+name_of_field).val(temp_value-increment_value);
        }
    }
}


//Блокировать кнопку
function block_button(){
    $('.zadvijka_kontrol_menu_button_blockable').attr('disabled','disabled');
}
//Разблокировать кнопку
function un_block_button(){
    $('.zadvijka_kontrol_menu_button_blockable').removeattr('disabled');
}


//Смена названий кнопок
function change_button_name(radio_button){
    

//temp_string1='<tr><td style="width:50%"><button style="width:83%"  id="zadvijka_kontrol_menu_button_open">Открыть по времени</button></td><td style="text-align: right;"><button style="width:83%" id="zadvijka_kontrol_menu_button_close">Закрыть по времени</button></td></tr><tr><td style="width:50%"></td><td style="text-align: right;"><button style="width:83%" id="zadvijka_kontrol_menu_button_full_close">Полное закрытие</button></td></tr>'
//temp_string2='<tr><td style="width:50%"><button style="width:83%"  id="zadvijka_kontrol_menu_button_open">Открыть в %</button></td><td style="text-align: right;"><button style="width:83%" id="zadvijka_kontrol_menu_button_close">Закрыть в %</button></td></tr><tr><td style="width:50%"></td><td style="text-align: right;"><button style="width:83%" id="zadvijka_kontrol_menu_button_full_close">Полное закрытие</button></td></tr>'

if($(radio_button).val()==1){

        //$('#zadvijka_kontrol_menu_content_control_button').html(temp_string1);
        
        zadvijkaButtonOpen.textContent='Открыть по времени';
        zadvijkaButtonClose.textContent='Закрыть по времени';
        zadvijkaButtonOpen.removeEventListener('click', send_command_open_persent);
        zadvijkaButtonClose.removeEventListener('click', send_command_close_persent);
        zadvijkaButtonOpen.addEventListener('click', send_command_open_second, false);
        zadvijkaButtonClose.addEventListener('click', send_command_close_second, false);

    }else{
        zadvijkaButtonOpen.textContent='Открыть в %';
        zadvijkaButtonClose.textContent='Закрыть в %';
        zadvijkaButtonOpen.removeEventListener('click', send_command_open_second);
        zadvijkaButtonClose.removeEventListener('click', send_command_close_second);
        zadvijkaButtonOpen.addEventListener('click', send_command_open_persent, false);
        zadvijkaButtonClose.addEventListener('click', send_command_close_persent, false);


        //$('#zadvijka_kontrol_menu_content_control_button').html(temp_string2);
    }


}


//Отрисовка состояния задвижки

function show_zadvijka_state(persent,status){
    var persent=$('#zadvijka_current_persent').val();
    var svgobject = document.getElementById('zadvijka_svg');
    var svgdom = svgobject.contentDocument;
    var element = svgdom.getElementsByClassName('menu_zadvijka');
    var max_x = -480;
    var max_y = 270;
    var position_x;
    var position_y;


                      if (status==1){
                        $(element).css('fill', '#FF0000');//авария
                      }

                      if (status==2){
                        $(element).css('fill', '#008BE9');//ремонт
                      }

                      if (status==3){
                        $(element).css('fill', '#00FFFF');//маршруто
                      }
                      if (status==5){
                        $(element).css('fill', '#E5E5E6'); //закрыто
                      }

                      if (status==6){
                        $(element).css('fill', '#00FF00');//открыто
                      }

                      if (status==7){
                        $(element).css('fill', '#FAC814');//среднее положение
                      }

    position_x=max_x*persent/100;
    position_y=max_y*persent/100;

    var position=''+position_x+'px,'+position_y+'px';

    var element = svgdom.getElementsByClassName('shiber');
    $(element).css('transform','translate('+position+')');

}


//Опрос состояния задвижки
function get_zadvijka_state(index){

    var url_string ='/control_zadv/?index='+index;

            $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    
                    }},
                    success: function( result ) {
                        console.log('Данные с сервера');
                        console.log(result);
                         var  zadvijka_status=JSON.parse(result);

                        $('#zadvijka_current_time').val(zadvijka_status.zadv_current_time);
                        $('#zadvijka_current_persent').val(zadvijka_status.zadv_current_percent);
                        $('#zadvijka_calibration').val(zadvijka_status.zadv_calibration);


                         show_zadvijka_state(zadvijka_status.zadv_current_percent,zadvijka_status.status);

                         if( zadvijka_status.enable_calibrate==0){
                            $('#zadvijka_kontrol_menu_button_calibrate').css( 'pointer-events', 'none' );
                            $('#zadvijka_kontrol_menu_button_calibrate').css('backgroundColor','rgb(14,14,14)');
                            $('#zadvijka_kontrol_menu_button_calibrate').css( 'color', 'rgb(231,231,231)' );
                         }else{
                                if(zadvijka_status.enable_calibrate==1){
                                $('#zadvijka_kontrol_menu_button_calibrate').css( 'pointer-events', 'stroke' );
                                $('#zadvijka_kontrol_menu_button_calibrate').css('backgroundColor','rgb(14,14,14)');
                            $('#zadvijka_kontrol_menu_button_calibrate').css( 'color', 'rgb(231,231,231)' );
                                }else{
                                        if(zadvijka_status.enable_calibrate==2){
                                        $('#zadvijka_kontrol_menu_button_calibrate').css( 'pointer-events', 'none' );
                                        $('#zadvijka_kontrol_menu_button_calibrate').css('backgroundColor','#00FF00');
                                        $('#zadvijka_kontrol_menu_button_calibrate').css( 'color', 'black' );
                                        }else{
                                                if(zadvijka_status.enable_calibrate==3){
                                                $('#zadvijka_kontrol_menu_button_calibrate').css('backgroundColor','#00FF00');
                                                $('#zadvijka_kontrol_menu_button_calibrate').css( 'pointer-events', 'stroke' );
                                                $('#zadvijka_kontrol_menu_button_calibrate').css( 'color', 'black' );
                                                }

                                        }
                                    }
                            }



                        if(zadvijka_status.enable_open==0){
                                $('#zadvijka_kontrol_menu_button_open').prop( "disabled", true );
                        }else{
                                $('#zadvijka_kontrol_menu_button_open').prop( "disabled", false );
                            }

                        if(zadvijka_status.enable_close==0){
                            $('#zadvijka_kontrol_menu_button_close').prop( "disabled", true );
                            $('#zadvijka_kontrol_menu_button_full_close').prop( "disabled", true );
                        }else{
                              $('#zadvijka_kontrol_menu_button_close').prop( "disabled", false );
                              $('#zadvijka_kontrol_menu_button_full_close').prop( "disabled", false );
                            }

                        if(zadvijka_status.c0.status==0){
                            $('#zadvijka_kontrol_menu_content_state_control1').css('backgroundColor','#C5C6C6');
                            $('#zadvijka_kontrol_menu_content_state_control1').text(zadvijka_status.c0.name);
                            $('#zadvijka_kontrol_menu_content_state_control1').css('color', 'black');
                        }else{
                            $('#zadvijka_kontrol_menu_content_state_control1').css('backgroundColor','#00FF00');
                            $('#zadvijka_kontrol_menu_content_state_control1').text(zadvijka_status.c0.name);
                            $('#zadvijka_kontrol_menu_content_state_control1').css('color', 'black');
                        }
                        if(zadvijka_status.c2.status==0){
                            $('#zadvijka_kontrol_menu_content_state_control2').css('backgroundColor','#C5C6C6');
                            $('#zadvijka_kontrol_menu_content_state_control2').text(zadvijka_status.c2.name);
                            $('#zadvijka_kontrol_menu_content_state_control2').css('color', 'black');
                        }else{
                            $('#zadvijka_kontrol_menu_content_state_control2').css('backgroundColor','#00FF00');
                            $('#zadvijka_kontrol_menu_content_state_control2').text(zadvijka_status.c2.name);
                            $('#zadvijka_kontrol_menu_content_state_control2').css('color', 'black');
                        }



                    },
                    error: function (jqXHR, exception) {
                    console.log(exception);
                    alert('Сервер не отвечает');
                    
                    }
            });
}

function disabled_button(){
    //console.log(value);
    var a=$('#zadvijka_time_duration').val();
    console.log(a);
    if(a<150){

        $('#zadvijka_kontrol_menu_button_save').attr("disabled","disabled");
    }else{
        $('#zadvijka_kontrol_menu_button_save').removeAttr("disabled");
    }
}

function huy(){

alert('adsfgvsdfv');
}

function send_command_open_second(){
    //otkrit po vremeni command=3 (p1=time in ms) p2=0 index=
    var command=3;
    var p1=document.getElementById("zadvijka_time_duration_temp").value;
    var p2=0;
    zadvijka_send_comand_from_button(command,p1,p2);
}

function send_command_close_second(){
    //otkrit po vremeni command=3 (p1=time in ms) p2=0 index=
    var command=1;
    var p1=document.getElementById("zadvijka_time_duration_temp").value;
    var p2=0;
    zadvijka_send_comand_from_button(command,p1,p2);
}

function send_command_open_persent(){
    //otkrit po vremeni command=3 (p1=time in ms) p2=0 index=
    var command=3;
    var p2=document.getElementById("zadvijka_persetnt_duration_temp").value;
    var p1=0;
    zadvijka_send_comand_from_button(command,p1,p2);
}

function send_command_close_persent(){
    var command=1;
    var p2=document.getElementById("zadvijka_persetnt_duration_temp").value;
    var p1=0;
    zadvijka_send_comand_from_button(command,p1,p2);
}

function send_command_close_fully(){
    var command=1;
    var p2=0;
    var p1=0;
    zadvijka_send_comand_from_button(command,p1,p2);
}


function zadvijka_send_comand_from_button(command,p1,p2,index,type){
            var devise_name_complit=$("#Name_devise").text();
            var number = parseInt(devise_name_complit.match(/-*[0-9]+/));
            //var number=index;
            var val3 = p1;
            var val4 = p2;
            var url_string ='/io_command/?'+escape('UD_DB.EquipCommand')+'='+command+'&'+escape('UD_DB.EquipIndex')+'='+number+'&'+escape('UD_DB.Command_P1')+'='+val3+'&'+escape('UD_DB.Command_P2')+'='+val4;
            console.log(url_string);
            $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    
                    }},
                    success: function( result ) {



                    },
                    error: function (jqXHR, exception) {
                    console.log(exception);
                    alert('Сервер не отвечает');
                    
                    }
            });
        }


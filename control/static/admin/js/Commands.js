//команды для механизмов
    function start_stop_mex(command,p1,p2,EquipIndex) {
        var url_string ='/io_command/?'+escape('UD_DB.EquipCommand')+'='+command+'&'+escape('UD_DB.EquipIndex')+'='+EquipIndex+'&'+escape('UD_DB.Command_P1')+'='+p1+'&'+escape('UD_DB.Command_P2')+'='+p2;
        //$( "#menu").dialog( "close" );
        objectMenuManager.hide();
        $.ajax({
            url: url_string,
            timeout:3000,
            data: {},
            success: function( result ) {},
            error: function (jqXHR, exception) {
              console.log(exception);
              alert('Сервер не отвечает');                    
            }            
        });
    }

//Фукция закытия меню датчиков
  function close_datchiki() {
    $('#datchiki_kontrol').removeClass('visible_datchiki').addClass('hiden_datchiki');   
    //закончить циклический запрос
    clearInterval(global_start_function);

    }

 //создатель менюшек для различных механизмов
function menu_kreator(device_index,device_string_type,posX,posY){

  var url_string1='/menu/?index='+device_index;
  var device_type;
  var temp_string='';
  if(device_string_type!='current' & device_string_type!='kylt'& device_string_type!='analog_dat'){
        if(device_index in menu_header_text){
          //$(".ui-dialog-title").text(menu_header_text[device_index].shortName);
          //new
          objectMenuManager.setHeader(menu_header_text[device_index].shortName);

            $.ajax({
            url: url_string1,
            data: {},
            success: function(result){
                  var menu_struktura=JSON.parse(result);
                  //Check object empty or not
                  if(Object.keys(menu_struktura).length!=0){
                    for (let i in menu_struktura){
                          if (menu_struktura[i].enable==0) {
                            temp_string=temp_string+'<p class="button_menu"><button ' +
                                ' class="modal_box_btn"' +
                                ' onclick="'+menu_struktura[i].function_name+'('+menu_struktura[i].command+',0,0,'+device_index+','+element_type_number[device_string_type]+')" style="color:'+menu_struktura[i].color+'!important;" disabled>'+menu_struktura[i].name+'</button></p>'
                          } else {
                            temp_string=temp_string+'<p class="button_menu"><button class="modal_box_btn" onclick="'+menu_struktura[i].function_name+'('+menu_struktura[i].command+',0,0,'+device_index+','+element_type_number[device_string_type]+')" style="color:'+menu_struktura[i].color+'!important">'+menu_struktura[i].name+'</button></p>'
                          }
                    }                  
                    let div_menu = document.getElementById('menu');                    
                    objectMenuManager.insertButtons(temp_string);
                    objectMenuManager.show(posX,posY);
                  }
              }
            });
        }else{
                add_equipment_open(device_index,element_type_number[device_string_type]);
        }
  }else{
        if(device_string_type=='current'){
            objectMenuManager.setHeader('Ток №'+device_index);
          }else{
            if(device_string_type=='kylt'){
              objectMenuManager.setHeader('Культура №'+device_index);
            }else{
              if(device_string_type=='analog_dat'){
                objectMenuManager.setHeader('Аналог. датчик №'+device_index);
              }
            }
          }
          temp_string=temp_string+'<p class="button_menu"><button style="margin:0;width:150px;" class="modal_box_btn" ' +
          'onclick="settings_equipment_open(0,0,0,'+device_index+','+element_type_number[device_string_type]+')"> Настройки</button></p>';
          objectMenuManager.insertButtons(temp_string);
          objectMenuManager.show(posX,posY);
        }
       
        
  }


//меню контроля датчики и контроль открытие
function datchiki(p1,p2,p3,number) {
        //$( "#menu").dialog( "close" ); 
        objectMenuManager.hide();

        var url_string2 = '/dat/?index='+number;

        $('#fool_name_of_device').text(menu_header_text[number].shortName);
        $.ajax({
            url: url_string2,
            data: {},
            success: function( result ) {              
              var string_temp_d='';
              var string_temp_d_1='';
              var string_temp_d_2='';
              var string_temp_d_3='';              
              var string_temp_c='';
              var string_temp_c_1='';
              var  dat_cont=JSON.parse(result);
              console.log(dat_cont);
              for(var k in dat_cont){
              console.log(k);
                if (k.charAt(0) =='d') {
                  string_temp_d_1='<tr><td><div style="width:15px;height:15px; -webkit-border-radius: 50px;border-radius: 50px;' +
                      ' border: none;border:solid 1px #494949;" id="dat'+k.substr(1)+'_status"></div></td>';
                  string_temp_d_2='<td id="dat'+k.substr(1)+'_name">'+dat_cont[k].name+'</td>';
                  if (dat_cont[k].enable_remont ==0) {
                    string_temp_d_3= '';
                  }
                  else{
                    string_temp_d_3= '<td><a href="#" class="remont_button" id="remont'+k.substr(1)+'" onclick="datchik_remont(16,'+number+','+k.substr(1)+')">Ремонт</a></td></tr>';
                  }
                  string_temp_d=string_temp_d+string_temp_d_1+string_temp_d_2+string_temp_d_3;
                }
                if (k.charAt(0) =='c') {
                  string_temp_c_1='<tr><td id="control'+k.substr(1)+'" style="background: #E5E5E6">'+dat_cont[k].name+'</td></tr>';
                  string_temp_c=string_temp_c+string_temp_c_1;
                }
              }
              var div_datchiki = document.getElementById('table_datchiki');
              var div_control = document.getElementById('table_control');
              
              div_datchiki.innerHTML = string_temp_d;
             
              div_control.innerHTML = string_temp_c;

              //Диалог открытия датчиков
             
              $('#datchiki_kontrol').removeClass('hiden_datchiki').addClass('visible_datchiki');
              
              var a = $('#control').width();
              var b = $('#datchiki').width();
              var c = a+b+4;
              $('#datchiki_kontrol').width(c);
              //Очистить предыдущий циклический запрос
              clearInterval(global_start_function);
              //установить циклический запрос
              //переменная global_start_function должна быть глобальной
               global_start_function = setInterval(function() { dat_status(number) }, 1000);

            }
            });

      }


function dat_status(number) {

        var url_string = '/dat_status/?index='+number;
        console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
              var  dat_cont=JSON.parse(result);
              for(var k in dat_cont){
                if (k.charAt(0) =='d') {
                  if (dat_cont[k].alarm == 0){
                    if (dat_cont[k].status == 1) {
                      var indikator_datchiki = document.getElementById('dat'+k.substr(1)+'_status');
                      $(indikator_datchiki).css('background','#00FF00');//зеленый
                      $(indikator_datchiki).css('box-shadow','0 0 25px #00FF00');//зеленый
                      $(indikator_datchiki).css('-webkit-box-shadow','0 0 25px #00FF00');
                    }else{
                      var indikator_datchiki = document.getElementById('dat'+k.substr(1)+'_status');
                      $(indikator_datchiki).css('background','#E5E5E6');//серый
                    }

                    if (dat_cont[k].remont == 1) {
                      var button_datchiki = document.getElementById('remont'+k.substr(1));
                      $(button_datchiki).css('background','#008BE9');//голубой
                    }else{
                      var button_datchiki = document.getElementById('remont'+k.substr(1));
                      $(button_datchiki).css('background','black');
                    }

                  }else{
                    var indikator_datchiki = document.getElementById('dat'+k.substr(1)+'_status');
                    $(indikator_datchiki).css('background','red');
                    $(indikator_datchiki).css('box-shadow','0 0 25px red');
                    $(indikator_datchiki).css('-webkit-box-shadow','0 0 25px red');
                  }
                }
                if (k.charAt(0) =='c') {
                    if (dat_cont[k].status == 1) {
                      var indikator_control = document.getElementById('control'+k.charAt(1));
                      $(indikator_control).css('background','#00FF00');//зеленый
                    }else{
                      var indikator_control = document.getElementById('control'+k.charAt(1));
                      $(indikator_control).css('background','#E5E5E6');//серый
                    }
                  }
                }
              }
            });
      }
//Установка датчика в ремонт
function datchik_remont(EquipCommand, EquipIndex, Command_P1) {
        var Command_P2=0;
        var url_string = '/io_command/?UD_DB.EquipCommand='+EquipCommand+'&UD_DB.EquipIndex='+EquipIndex+'&UD_DB.Command_P1='+Command_P1+'&UD_DB.Command_P2='+Command_P2;
        console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {}
            });
}

//спрятать иконки
function hide_icons(){
    $("body").on("contextmenu", false);
    var svgobject = document.getElementById('nor');

    if ('contentDocument' in svgobject){
        var svgdom = svgobject.contentDocument;
        $(svgdom.getElementsByClassName("icon")).hide()
    }
}
//установка культуры
function set_kylt(command,p1,p2,device_index){
    //$( "#menu").dialog( "close" );
    objectMenuManager.hide();
    $('#kylt_set_confirmation_window').show();
    document.getElementById('Kylt_device_Index').value =device_index;
    document.getElementById('kylt_set_confirmation_list').innerHTML = global_object_oll_kylt_from_server;
}
//сохранить культуру
function kylt_set_save(EquipIndex,kylt){
    start_stop_mex(12,kylt,0,EquipIndex);
    $('#kylt_set_confirmation_window').hide();
}
//закрыть окно культур
function kylt_set_close(){
    $('#kylt_set_confirmation_window').hide();
}
//позиция поворотной трубы
function set_position_pt(command,p1,p2,device_index){
    var temp_string='';
   // $( "#menu").dialog("close");
    objectMenuManager.hide();
    $('#position_pt_confirmation_window').show();
    for(let i=1;i<=10;i++){
        temp_string=temp_string+'<div style="float: left; padding:5px;"><button onclick="start_stop_mex('+(20+i)+',0,0,'+device_index+')">'+i+'</button></div>'
    }
    document.getElementById('PT_pos_buttons').innerHTML = temp_string;

}
//закрыть окно поворотной трубы
function close_position_pt(){
    $('#position_pt_confirmation_window').hide();
}
//команда звонку
function bell_command(command){
    console.log('Команда звонку='+command);
    var url_string ='/bell_command/?command='+command;

        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
                if(result!='ok'){
                    console.log('проблема со свонком')
                }
                console.log(result);
            }
        });
}

//подтверждение действия для механизма
function oll_mex_confirm(command,p2,p3,device_index,type){
    var temp_string='';
    var temp_string2='';
    //$( "#menu").dialog("close");
    objectMenuManager.hide();

    var confirm_header_name_tr=document.getElementById('confirmation_header_name');
    console.log(confirm_header_name_tr);
    confirm_header_name_tr.innerText=menu_header_text[device_index].longName;
    switch(type){
            case 1:
                temp_string='<td style="text-align: center; "><button style="margin-bottom: 0px; margin:2px;' +
                    ' float:right;"' +
                    ' class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Запуск</button></td><td' +
                    ' style="text-align: center; "><button  style="margin-bottom: 0px;' +
                    ' margin:2px float:left;"class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Вы уверены?";
                break;
            case 2:
                temp_string='<td style="text-align: center;"><button style="margin-bottom: 0px; margin:2px;' +
                    ' float:right;"' +
                    ' class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Запуск</button></td><td' +
                    ' style="text-align: center; "><button style="margin-bottom: 0px; margin:2px; float:left;"' +
                    ' class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Вы уверены?";
                break;
            case 4:
                temp_string='<td style="text-align: center;"><button s' +
                    'tyle="margin-bottom: 0px; margin:2px; float:right;" class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Открыть</button></td><td' +
                    ' style="text-align: center;"><button style="margin-bottom: 0px; margin:2px; float:left;"' +
                    ' class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Полностью открыть задвижку?";
                break;
            case 23:
                temp_string='<td style="text-align: center;"><button style="margin-bottom:0px; margin:2px;' +
                    ' float:right;"' +
                    ' class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Открыть</button></td><td' +
                    ' style="text-align: center;"><button style="margin-bottom:0px; margin: 2px;' +
                    ' float:left;"' +
                    ' class="modal_box_btn"' +
                    ' onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Полностью открыть задвижку?";
                break;

            default:
                alert( 'Мы надеемся, что и в вашем браузере все ок!' );
                break;
        }

    $('#oll_mex_confirmation_window').show();
    document.getElementById('oll_mex_buttons').innerHTML = temp_string;
}
//подтвердить команду механизму
function oll_mex_confirm_confirm(comand,p2,p3,index){
    $('#oll_mex_confirmation_window').hide();
    start_stop_mex(comand,p2,p3,index);
}

//закрыть окно подтверждения
function oll_mex_confirm_close(){
    $('#oll_mex_confirmation_window').hide();
}



  
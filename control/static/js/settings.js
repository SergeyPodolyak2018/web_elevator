function add_equipment_open(EquipIndex,EqType){
$('#add_equipment').show();
var form = document.forms['form_add_equipment'];
form.elements["EquipIndex"].value =EquipIndex;
form.elements["EqType"].value =EqType;
}

function add_equipment_close(){
$('#add_equipment').hide();
}
function add_equipment_add(){
var msg = $('#form_add_equipment').serialize();
 	  var url_string='/device_add_bd/';
 	  console.log(msg);

            $.ajax({
            url: url_string,
            data: msg,
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

                get_name_for_oll_devaces();
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
       $('#form_add_equipment')[0].reset();
       add_equipment_close();
}

function setings_universal_close(type){

switch(type){
            case 1:
                var device_type='noriya';
                break;
            case 2:
               var device_type='konveyer';
                break;
            case 3:
                var device_type='klapan';
                break;
            case 4:
                 var device_type='zadvijka';
                break;
            case 5:
                 var device_type='Pzadvijka';
                break;
            case 6:
                var device_type='ventilyator';
                break;
            case 7:
                var device_type='tube';
                break;
            case 14:
                var device_type='silos';
                break;
            case 16:
                var device_type='dryer';
                break;
            case 17:
                var device_type='separator';
                break;
            case 18:
                var device_type='gate';
                break;
            case 19:
                var device_type='enable';
                break;
            case 23:
                var device_type='zadvijkaGroup';
                break;                
            case 100:
                device_type='current';
                break;
            case 101:
                device_type='kylt';
                break;
            case 102:
                device_type='analog_dat';
                break;
            default:
                alert( 'Мы надеемся, что и в вашем браузере все ок!' );
                break;
        }
        $('#form_'+device_type+'_settings')[0].reset();
        $('#settings_'+device_type).hide();
}


function setings_universal_save(type) {
      var msg;
 	  var url_string;

      switch(type){
            case 1:
                var device_type='noriya';
                break;
            case 2:
               var device_type='konveyer';
                break;
            case 3:
                var device_type='klapan';
                break;
            case 4:
                 var device_type='zadvijka';
                break;
            case 5:
                 var device_type='Pzadvijka';
                break;
            case 6:
                var device_type='ventilyator';
                break;
            case 7:
                var device_type='tube';
                break;
            case 14:
                var device_type='silos';
                break;
            case 16:
                var device_type='dryer';
                break;
            case 17:
                var device_type='separator';
                break;
            case 18:
                var device_type='gate';
                break;
            case 19:
                var device_type='enable';
                break;
            case 23:
                var device_type='zadvijkaGroup';
                break;
            case 100:
                device_type='current';
                break;
            case 101:
                device_type='kylt';
                break;
            case 102:
                device_type='analog_dat';
                break;
            default:
                alert( 'Мы надеемся, что и в вашем браузере все ок!' );
                break;
        }
        msg1   = JSON.stringify($('#form_'+device_type+'_settings').serialize());
        console.log(msg1);
 	  msg   = $('#form_'+device_type+'_settings').serialize();

 	  if(device_type=='current' | device_type=='kylt'| device_type=='analog_dat'){
 	    url_string='/'+device_type+'_save_settings/';
 	  }else{
 	  url_string='/device_save_settings/';
 	  }

 	  console.log(msg);

            $.ajax({
            url: url_string,
            data: msg,
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                //alert('stop')
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
       $('#form_'+device_type+'_settings')[0].reset();
       setings_universal_close(type);


    }
function settings_equipment_open(p1,p2,p3,index,type){
        var url_string;
        var device_type;
        var form;
        console.log(p1);
        console.log(p2);
        console.log(index);
        console.log(type);
        //$("#menu").dialog("close");
        objectMenuManager.hide();
        switch(type){
            case 1:
                device_type='noriya';
                break;
            case 2:
               var device_type='konveyer';
                break;
            case 3:
                device_type='klapan';
                break;
            case 4:
                 device_type='zadvijka';
                break;
            case 5:
                 device_type='Pzadvijka';
                break;
            case 6:
                device_type='ventilyator';
                break;
            case 7:
                device_type='tube';
                break;
            case 14:
                device_type='silos';
                break;
            case 16:
                var device_type='dryer';
                break;
            case 17:
                device_type='separator';
                break;
            case 18:
                device_type='gate';
                break;
            case 19:
                var device_type='enable';
                break;
            case 23:
                var device_type='zadvijkaGroup';
                break;
            case 100:
                device_type='current';
                break;
            case 101:
                device_type='kylt';
                break;
            case 102:
                device_type='analog_dat';
                break;

            default:
                alert( 'Мы надеемся, что и в вашем браузере все ок!' );
                break;
        }
        $('#form_'+device_type+'_settings')[0].reset();
        $('#settings_'+device_type).show();

        //Заполнение шапки настройки
        
        
        var settings_header_name=document.getElementById('settings-'+device_type+'__name');
        // var selector='td.settings_header_name'
        // var settings_header_name = div_settings_header_name.querySelectorAll(selector);
        // console.log(settings_header_name);
        

        form = document.forms['form_'+device_type+'_settings'];
        
        if(device_type!='current' & device_type!='kylt'& device_type!='analog_dat'){
            settings_header_name.innerText=menu_header_text[index].longName;
            console.log(menu_header_text[index].longName);
            form.elements["EquipIndex"].value =index;
            url_string='/device_get_settings/?index='+index;
        }else{

            if(device_type=='current'){
                 form.elements["analogIndex"].value =index;
                url_string='/current_get_settings/?index='+index;
            }
            if(device_type=='analog_dat'){
                 form.elements["analogIndex"].value =index;
                url_string='/analog_dat_get_settings/?index='+index;
            }
            if(device_type=='kylt'){
                form.elements["Kylt_View_Index"].value =index;
                url_string='/kylt_get_settings/?index='+index;
            }
        }

            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                var  message=JSON.parse(result);
            	console.log(message);

            	for (var i  in message) {
                                try {

                                    form.elements[i].value =message[i];

                                } catch (err) {

                                  console.log('такое поле отсутствует');

                                }

            	}

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });



            //form.elements["FlagsMachine_bit7"].value =1;


}


function prepareFormInputs(){
    $('.checkable_data_form').bind("change keyup input click blur ", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }   
        
    });
    $('.checkable_data_form').bind("blur", function() {    
        if (this.value == '') {
            this.value = '0';
        }    
    });

    $('.adres_getable').hover(function() {

        var abstrackt_value=$(this).val();
        if(abstrackt_value>=8){
        var a=Math.floor(abstrackt_value/8);

        var b=abstrackt_value%8;

        $(this).attr('title',"I"+a+'.'+b);
        }else{
            $(this).attr('title',"Канал датчика");
        }
        

        
    });
    $('.adres_getable_Q').hover(function() {
        var abstrackt_value=$(this).val();
        if(abstrackt_value>=8){
        var a=Math.floor(abstrackt_value/8);

        var b=abstrackt_value%8;

        $(this).attr('title',"Q"+a+'.'+b);
        }else{
            $(this).attr('title',"Канал выхода");
        }
    });

}



/////////////////////////////////////////////////////////////////////////////////////
//Линки
/////////////////////////////////////////////////////////////////////////////////////
function linck_open(){
    var temp_string='';
    var url_string='/link_open_bd/';
    hidemenu();
            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                var  link=JSON.parse(result);
            	     console.log(link);
            	for (var i  in link){
                     temp_string+='<tr onclick="change_row_link(this)">'+
                        '<td>'+link[i].index+'</td>'+
                        '<td>'+link[i].source+'</td>'+
                        '<td>'+link[i].command+'</td>'+
                        '<td>'+link[i].receive+'</td>'+
                        '<td>'+link[i].end+'</td></tr>'
            	}
                document.getElementById('linck_settings_content_information').innerHTML =temp_string;
                $("#linck_settings").show();
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

}

function linck_add_row(){
 var temp_string='';
    var url_string='/link_add_bd/';

            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                var  link=JSON.parse(result);
            	     console.log(link);
            	for (var i  in link){
                     temp_string+='<tr onclick="change_row_link(this)">'+
                        '<td>'+link[i].index+'</td>'+
                        '<td>'+link[i].source+'</td>'+
                        '<td>'+link[i].command+'</td>'+
                        '<td>'+link[i].receive+'</td>'+
                        '<td>'+link[i].end+'</td></tr>'
            	}
                document.getElementById('linck_settings_content_information').innerHTML =temp_string;

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });


}


function linck_close(){
    $("#linck_settings").hide();
}




function change_row_link(row){
   $('#change_row_link').show();
   $('#table_change_row_link_Index').val(parseInt(row.cells[0].innerHTML));
   $('#table_change_row_link_Source').val(row.cells[1].innerHTML);
   $('#table_change_row_link_Command').val(row.cells[2].innerHTML);
   $('#table_change_row_link_Receive').val(row.cells[3].innerHTML);
   $('#table_change_row_link_End').val(row.cells[4].innerHTML);
}


function change_row_link_save(){

 	  var url_string='/link_save_bd/?index='+$('#table_change_row_link_Index').val()+'&source='+$('#table_change_row_link_Source').val()+'&command='+$('#table_change_row_link_Command').val()+'&receive='+$('#table_change_row_link_Receive').val()+'&end='+$('#table_change_row_link_End').val();


            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                if (result=='OK'){
                    linck_open();
                    change_row_link_close();
                }else{
                    alert('Изменения не сохранены')
                }

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

}

function change_row_link_close(){
    $("#change_row_link").hide();
}

/////////////////////////////////////////////////////////////////////////////////////
//Культура
/////////////////////////////////////////////////////////////////////////////////////
function culture_open(){
    var temp_string='';
    var url_string='/kylt_open_bd/';
    hidemenu();
            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {

            if(result=='ERROR'){



                        document.getElementById('culture_settings_content_information').innerHTML ='Ошибка записи в базу';

                }else{
                var  cylt=JSON.parse(result);
            	     console.log(cylt);
            	for (var i  in cylt){
                     temp_string+='<tr onclick="change_row_culture(this)">'+
                        '<td>'+cylt[i].id+'</td>'+
                        '<td>'+cylt[i].index+'</td>'+
                        '<td>'+cylt[i].name_full+'</td>'+
                        '<td>'+cylt[i].name+'</td>'+
                        '<td>'+cylt[i].aspiration+'</td></tr>'
            	}
                document.getElementById('culture_settings_content_information').innerHTML =temp_string;
                }
                $("#culture_settings").show();
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

}

function culture_add_row(){
 var temp_string='';
    var url_string='/kylt_add_bd/';

            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
            //console.log(result);
             if(result=='ERROR'){
                        alert('Ошибка записи в базу культур');
                }else{
                    var  cylt=JSON.parse(result);
            	    //console.log(cylt);
                    for (var i  in cylt){
                                temp_string+='<tr onclick="change_row_culture(this)">'+
                                '<td>'+cylt[i].id+'</td>'+
                                '<td>'+cylt[i].index+'</td>'+
                                '<td>'+cylt[i].name_full+'</td>'+
                                '<td>'+cylt[i].name+'</td>'+
                                '<td>'+cylt[i].aspiration+'</td></tr>'
                        }

                        document.getElementById('culture_settings_content_information').innerHTML =temp_string;
                    }

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });


}


function culture_close(){
    $("#culture_settings").hide();
}




function change_row_culture(row){
   $('#change_row_culture').show();
   $('#table_change_row_culture_ID').val(parseInt(row.cells[0].innerHTML));
   $('#table_change_row_culture_index').val(parseInt(row.cells[1].innerHTML));
   $('#table_change_row_culture_full_name').val(row.cells[2].innerHTML);
   $('#table_change_row_culture_name').val(row.cells[3].innerHTML);
   $('#table_change_row_culture_aspiration').val(row.cells[4].innerHTML);

}


function change_row_culture_save(){

 	  var url_string='/kylt_save_bd/?id='+$('#table_change_row_culture_ID').val()+'&index='+$('#table_change_row_culture_index').val()+'&name_full='+encodeURIComponent($('#table_change_row_culture_full_name').val())+'&name='+$('#table_change_row_culture_name').val()+'&aspiration='+$('#table_change_row_culture_aspiration').val();
            console.log(url_string);

            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                if (result=='OK'){
                    culture_open();
                    change_row_culture_close();
                }else{
                    alert('Изменения не сохранены')
                }

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

}

function change_row_culture_close(){
    $("#change_row_culture").hide();
}

/////////////////////////////////////////////////////////////////////////////////////
//База устройств
/////////////////////////////////////////////////////////////////////////////////////
function device_settings_open(){
    var temp_string='';
    var url_string='/device_open_bd/';
    hidemenu();
            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                var  device_bd=JSON.parse(result);
                console.log(device_bd);
            	for (var i  in device_bd){
                     temp_string+='<tr onclick="change_row_device_settings(this)">'+
                        '<td>'+device_bd[i].EquipIndex+'</td>'+
                        '<td>'+device_bd[i].NameLong+'</td>'+
                        '<td>'+device_bd[i].NameShort+'</td>'+
                        '<td>'+device_bd[i].EqType+'</td></tr>'
            	}
                document.getElementById('device_settings_content_information').innerHTML =temp_string;
                $("#device_settings").show();
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });

}

function device_settings_close(){
    $("#device_settings").hide();
}

function change_row_device_settings(row){
   $('#change_row_device_settings').show();
   $('#table_change_row_device_settings_Index').val(parseInt(row.cells[0].innerHTML));
   $('#table_change_row_device_settings_NameLong').val(row.cells[1].innerHTML);
   $('#table_change_row_device_settings_NameShort').val(row.cells[2].innerHTML);
   $('#table_change_row_device_settings_EqType').val(row.cells[3].innerHTML);

}


function change_row_device_settings_save(){

 	  var url_string='/device_save_bd/?EquipIndex='+$('#table_change_row_device_settings_Index').val()+'&NameLong='+$('#table_change_row_device_settings_NameLong').val()+'&NameShort='+$('#table_change_row_device_settings_NameShort').val()+'&EqType='+$('#table_change_row_device_settings_EqType').val();


            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');
            }},
            success: function( result ) {
                if (result=='OK'){
                    device_settings_open();
                    change_row_device_settings_close();
                }else{
                    alert('Изменения не сохранены')
                }
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');
            }
        });

}

function change_row_device_settings_close(){
    $("#change_row_device_settings").hide();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////
//Настройки звонка
///////////////////////////////////////////////////////////////////////////////////////////////////////

function setings_bell_close(){
        $('#form_bell_settings')[0].reset();
        $('#settings_bell').hide();
}


function setings_bell_open(){
        hidemenu();
        $('#form_bell_settings')[0].reset();
        $('#settings_bell').show();

        var form = document.forms['form_bell_settings'];
        var url_string='/bell_get_settings/';

            $.ajax({
            url: url_string,
            data: {},
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');
            }},
            success: function( result ) {
                var  message=JSON.parse(result);
            	console.log(message);

            	for (var i  in message) {
                                try {

                                    form.elements[i].value =message[i];

                                } catch (err) {

                                  console.log('а нам похуй');

                                }
            	   // form.elements[i].value =message[i];
            	}

            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
}

function setings_bell_save() {
 	  var msg   = $('#form_bell_settings').serialize();
 	  var url_string='/bell_save_settings/';
 	  console.log(msg);
            $.ajax({
            url: url_string,
            data: msg,
            timeout:3000,
            statusCode:{404:function(){alert('Функция не реализована');

            }},
            success: function( result ) {
                //alert('stop')
            },
            error: function (jqXHR, exception) {
            console.log(exception);
            alert('Сервер не отвечает');

            }
        });
       $('#form_bell_settings')[0].reset();
       setings_bell_close();
}


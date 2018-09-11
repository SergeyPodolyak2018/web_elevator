"use strict";
	//global variables
var global_start_function=0;
var сurrent_grafic=0;   
var header_menu={};                              //global variable to manipulate header menu
var title_dsfvasdc;                           // tool tip on the object
var link_global_object;                       //object with oll lines 
var global_object_status={};                  //object of staus of all elements
var global_object_status_analog={};           //status fo anlog sensors
var global_object_status_kylt={};             //status of kylt on the objects
var menu_header_text={};                      //name of all devaces
var global_object_oll_kylt_from_server='';    //oll kylt from servere in one object
var global_kylt_from_server_formated={};      //formated list of kylt to use in future in different menu
var element_type_number={'konv':2,'klapan':3,'nor':1,'zadvijka':4,'Pzadvijka':5,'silos':14,'dryer':16,'separator':17,'gate':18,'vent':6,'tube':7,'car':15,'enable':19,'zadvijkaGroup':23,'current':100,'kylt':101, 'analog_dat':102};//существующие типы элементов
var globalObjectSatusOfUser;
var pressTimerForeHoldOnIpadOreIphone;

//Function thet hide status of user
function statusOfuser(user){
	var userSatus=user;

	this.getUserStatus=function(){
		return userSatus;
	}
	this.initialize=function(){
		switch(userSatus){
            case 1:
            	document.getElementById('menu_button_setings_bell_open').addEventListener('click', setings_bell_open, false);
            	document.getElementById('menu_button_device_settings').addEventListener('click', device_settings_open, false);
            	document.getElementById('menu_button_linck_open').addEventListener('click', linck_open, false);
            	document.getElementById('menu_button_culture_open').addEventListener('click', culture_open, false);
            case 2:

            case 3:
            	setEventOnElement(userSatus);//set events
            	header_menu = new Header_menu(userSatus);//create header 
                break;
		}
	}
}
function asckerStatusOfUser(){
	var url_string ='/status_user/';
	$.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
            var userType=JSON.parse(result);              
                if(result!=404){
                	globalObjectSatusOfUser=new statusOfuser(userType.control);
                	globalObjectSatusOfUser.initialize();//init oll elements akording to operator
                	
                	//Hide icons
          			hide_source_receiver();
                }                                  
            }              
            
    });
}

$(window).load(function () {

    // Создать новый объект worker1
        var worker = new Worker('/static/admin/js/worker.js');
        // Получить сообщение от работника
        worker.onmessage = function (event) {
            var temp=event.data;
            for (let i in temp){
            global_object_status[i]=temp[i];
        }        
        change(event.data);
        };

        // Создать новый объект worker2
        var worker2 = new Worker('/static/admin/js/worker2.js');
        // Получить сообщение от работника
        worker2.onmessage = function (event){
            linck(event.data);
        };

   // Создать новый объект worker3
        var worker3 = new Worker('/static/admin/js/worker3.js');
        // Получить сообщение от работника
        worker3.onmessage = function (event) {
        var temp=event.data;
            for (let i in temp){
            global_object_status_analog[i]=temp[i];
        }
        	analog_status(event.data);
        };

    // Создать новый объект worker4
        var worker4 = new Worker('/static/admin/js/worker4.js');
        // Получить сообщение от работника
        worker4.onmessage = function (event) {
        var temp=event.data;
            for (let i in temp){
            global_object_status_kylt[i]=temp[i];
        }
        	kylt_status(event.data);
        };

		////////////////////////////////////////////////////////////////////
        //Запуск календарика и часиков
        //
        $( "#datepicker_message1" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_message2" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_rout1" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_rout2" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_device1" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_device2" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_current").datepicker({dateFormat: "yy.mm.dd"});
        $( "#timepicker_current").timepicker({timeFormat: 'H:i:s'});
        /////////////////////////////////////////////////////////////////////


            /////////////////////////////////////////////////////////////////////////////////
            //проверка размеров окна при загрузке
            if($( window ).width()<1400){
            $( "#header" ).removeClass( "gorizontal" ).addClass( "vertical" );
            $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_gorizont" ).addClass( "menu_button_typ1_vertical" );
            $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_gorizont" ).addClass( "menu_button_typ2_vertical" );
            }
            if($( window ).width()>1400){
                $( "#header" ).removeClass( "vertical" ).addClass( "gorizontal" );
                $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_vertical" ).addClass( "menu_button_typ1_gorizont" );
                $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_vertical" ).addClass( "menu_button_typ2_gorizontal" );


            }
            //Изменение меню при изменении размеров окна
            $( window ).resize(function() {

                if($( window ).width()<1400){
                $( "#header" ).removeClass( "gorizontal" ).addClass( "vertical" );
                 $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_gorizont" ).addClass( "menu_button_typ1_vertical" );
                $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_gorizont" ).addClass( "menu_button_typ2_vertical" );
                }

                if($( window ).width()>1400){
                $( "#header" ).removeClass( "vertical" ).addClass( "gorizontal" );
                $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_vertical" ).addClass( "menu_button_typ1_gorizont" );
                $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_vertical" ).addClass( "menu_button_typ2_gorizontal" );
                }}
            )
            ////////////////////////////////////////////////////////////////////////////////////
          
          setInterval(function() {worker.postMessage(global_object_status)}, 1000);//циклический вызов воркера для запроса состояния всех механизмов          
          setInterval(function() {worker3.postMessage(global_object_status_analog)}, 1000);//циклический вызов воркера для запроса состояния аналоговых датчиков
          setInterval(function() {worker4.postMessage(global_object_status_kylt)}, 1000);//циклический вызов воркера для запроса состояния меток культуры
          setInterval(function() {worker2.postMessage(1)}, 1000); //циклический вызов воркера для запроса состояния линков
          
        //Filling variables------------------------------------------------------------------------------------------
        $("body").on("contextmenu", false);
        var svgobject = document.getElementById('nor');
          if ('contentDocument' in svgobject){
               //Создание объекта с информацией
                var svgdom = svgobject.contentDocument;
                
                //Event to close windows---------------------------------------------------------------------------------------
		          $(svgdom.getElementsByTagName("svg")).on('click', function(e){                    
		              hidemenu();//locate in servis_and_archiv_menu
		          });
		         //------------------------------------------------------------------------------------------------------------

                
                //заполнение переменных
                title_dsfvasdc=svgdom.getElementsByClassName("title_very_dificult");
                link_global_object=$(svgdom.getElementsByClassName("line"));
            }

        //----------------------------------------------------------------------------------------------------------------

        //Get list of long and short names of oll dewases to use them in future
          get_name_for_oll_devaces();

        //Get kylt list from server to use them in future
          get_kylt_list();

        //Inicialization prevent defoult on some elements
         inicializePreventDefoult();

        //Asck user status and inicialithe elements
		asckerStatusOfUser();
		
		//Функция перетаскивания------------------------------
         // $( ".draggable" ).draggable({distance: 15});//

        //------------------------------------------------------

        //Функция зумирования
         initialize();     

		hidePreloader ();

});


//имена механизмов для тултипа
function get_name_for_oll_devaces(){
        var url_string ='/name_list/';
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
                if(result!=404){
                    menu_header_text=JSON.parse(result);
                    console.log(menu_header_text);
                }
            }
            });
    }
//перечень культур
function get_kylt_list(){
        var url_string ='/kylt_list/';
        var temp_kylt_list;
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
              console.log(result);
                if(result!=404){
                    temp_kylt_list=JSON.parse(result);
                    for (let i in temp_kylt_list) {
                      //Создать перечень культур для дальнейшего использования
                      console.log(temp_kylt_list[i].index);
                      console.log(temp_kylt_list[i].name_full);

                      global_kylt_from_server_formated[temp_kylt_list[i].index]=temp_kylt_list[i].name_full;
                      //Создать отформатированную строку для использования при выборе культуры
                      global_object_oll_kylt_from_server=global_object_oll_kylt_from_server+'<option value="'+(temp_kylt_list[i].index)+'" >'+temp_kylt_list[i].name_full+'</option>';
                    }                    
                }
                console.log(global_kylt_from_server_formated);
                console.log(global_object_oll_kylt_from_server);
            }
        });
    }

//расстановка событий на элементах
function setEventOnElement(userType){
	// Получаем доступ к SVG DOM         
          var svgobject = document.getElementById('nor');
          if ('contentDocument' in svgobject){
               //Создание объекта с информацией
                var svgdom = svgobject.contentDocument;                

                ////////////////////////////////////////////////////////////////////////
                //Расстановка событий на элементах
                //////////////////////////////////////////////////////////////////////

                //линии для установки в ремонт
                $(svgdom.getElementsByClassName("line")).on('contextmenu', function(e){
                    e.stopPropagation();
                    let line_name =($(this).attr('class').split(' ')[1]);                    
                    let lineIndex=parseInt(line_name.match(/-*[0-9]+/));                    
                    refit_route_open(lineIndex);
                    return false;                           
                });

                $(svgdom.getElementsByClassName("line")).hover(
                        function () { 
                            $(this).css({
                                    'stroke-width': '250px',
                                    'stroke-dasharray':'600px'
                                });
                        },
                        function () {
                             $(this).css({
                                    'stroke-width': '75px',
                                    'stroke-dasharray':'0px'
                                });
                         }
                    );

                //механизмы
                ////////////////////////////////////////////////////////////////////////
                for (let i in element_type_number){

                    if (i!='current'& i!='kylt'& i!='analog_dat'){
                        //Подсветка линий
                        $(svgdom.getElementsByClassName(""+i)).hover(
                            function () {
                            setTimeout($.proxy(function(){
                                 var element_name = ($(this).attr('class').split(' ')[1]);
                                 if (parseInt(element_name.match(/-*[0-9]+/)) in menu_header_text){
                                 let temp_text=menu_header_text[parseInt(element_name.match(/-*[0-9]+/))].longName;
                                    $(title_dsfvasdc).text(temp_text);
                                    }

                                $('.'+element_name+'select',svgdom).css({
                                    'stroke-width': '100px',
                                    'stroke':'#f5ed00'
                                });
                            }, this), 0)},
                            function () {
                                setTimeout($.proxy(function( ){
                                    var element_name =($(this).attr('class').split(' ')[1]);
                                    //$('.'+element_name+'select',svgdom).css('stroke-width', '5px');
                                    $('.'+element_name+'select',svgdom).removeAttr("style");
                                    $(title_dsfvasdc).text('');
                                 }, this), 0)}
                        );

                        //Клик на устройствах
                       $(svgdom.getElementsByClassName(""+i)).on('click', function(e){
                            var element_name =($(this).attr('class').split(' ')[1]);
                            var elementIndex=parseInt(element_name.match(/-*[0-9]+/));
                            $("#Name_devise").text(elementIndex);
                            $("#footer_help").text(menu_header_text[elementIndex].longName);
                       });
                       

                        //Диалог запуска устройства
                        if (userType==1 || userType==2 || userType==3){
                            //this pease of shet is only fore safary and ipad
                            console.log(navigator.userAgent);
                            if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
                                $(svgdom.getElementsByClassName(""+i)).on('touchend', function (e){                                
                                    clearTimeout(pressTimerForeHoldOnIpadOreIphone);
                                }).on('touchstart', function (e) {                               
                                   let pisya=e;                               
                                   // Set timeout
                                   pressTimerForeHoldOnIpadOreIphone = window.setTimeout(function() {Pisda(pisya);}, 1000)
                               });
                                    function Pisda(pisya){
                                        console.log(pisya);                                    
                                            console.log(pisya.currentTarget.className.animVal)
                                            var element_name =(pisya.currentTarget.className.animVal.split(' ')[1]);
                                            var temp_string_name=element_name.match(/-*[a-z]+/i);
                                            var elementIndex=parseInt(element_name.match(/-*[0-9]+/));
                                            $("#Name_devise").text(elementIndex);
                                            $("#footer_help").text(menu_header_text[elementIndex].longName);
                                            menu_kreator(parseInt(element_name.match(/-*[0-9]+/)),temp_string_name,pisya.originalEvent.changedTouches[0].clientX,pisya.originalEvent.changedTouches[0].clientY);
                                    }
                            }else{
                                //This fore normal devices not fore ipad
                                $(svgdom.getElementsByClassName(""+i)).on('contextmenu', function(e){
                                    e.stopPropagation();
                                    console.log(($(this).attr('class').split(' ')))
                                    var element_name =($(this).attr('class').split(' ')[1]);
                                    var temp_string_name=element_name.match(/-*[a-z]+/i);
                                    var elementIndex=parseInt(element_name.match(/-*[0-9]+/));
                                    $("#Name_devise").text(elementIndex);
                                    $("#footer_help").text(menu_header_text[elementIndex].longName);
                                    menu_kreator(parseInt(element_name.match(/-*[0-9]+/)),temp_string_name,e.clientX,e.clientY);
                                    return false;
                                });

                            }
                    	}
                    }else{
                    	if (userType==1){
	                         $(svgdom.getElementsByClassName(""+i)).on('contextmenu', function(e){
	                            var element_name =($(this).attr('class').split(' '));
	                            
	                            var temp_string_name=element_name[0].match(/[a-z]{1,}[_]{0,}[a-z]{0,}/);
	                            console.log(temp_string_name);
	                            menu_kreator(parseInt(element_name[1].match(/-*[0-9]+/)),temp_string_name,e.clientX,e.clientY);
	                            return false;
	                        });
                        }
                    }
                }
          }
    }
	




	function inicializePreventDefoult(){
	  var svgobject = document.getElementById('nor');          
	  var svgdom = svgobject.contentDocument;
	  $(svgdom.getElementsByTagName("svg")).on('contextmenu', cansaleContextMenu);

	 svgobject = document.getElementsByClassName('menu_button_typ2');
	 console.log(svgobject);
	 
	 for (var i = 0; i < svgobject.length; i++) {
	   var svgdom = svgobject[i].contentDocument;
	    $(svgdom.getElementsByTagName("svg")).on('contextmenu', cansaleContextMenu);
	 } 
	}

	//function prevent context menu
	function cansaleContextMenu(e){
	  console.log('target: '+e.target.nodeName);
	  console.log('current target: '+e.currentTarget.nodeName);
	  e.stopPropagation();
	  e.preventDefault();
	}


//function open equipment dialog
/*
		$( function() {
		                 $( "#menu" ).dialog({
		                      autoOpen: false,
		                      resizable: false,
		                      height: "auto",
		                      width: "auto",
		                      show: {
		                        effect: "blind",
		                        duration: 0
		                      },
		                      hide: {
		                        effect: "blind",
		                        duration: 0
		                      },
		                      close: function() {


		                      },
		                      open: function() {

		                      }
		                    });

		     });

*/

//отображение даты
     function date() {
         var d = new Date();
         var yyyy = d.getFullYear().toString();
         var mm = (d.getMonth()+1);
         if(mm<10){
         mm= '0'+mm.toString();
         }else{
         mm= mm.toString();
         }
         var dd  = d.getDate();
         if(dd<10){
         dd= '0'+dd.toString();
         }else{
         dd= dd.toString();
         }

         var full_date = yyyy +"."+mm+"."+dd;
         return full_date
     }

//отображение текущего времени
     function time() {
         var d = new Date();
         var hh = d.getHours();
         if(hh<10){
          hh= '0'+hh.toString();
         }else{
          hh= hh.toString();
         }
         var mm = d.getMinutes(); // getMonth() is zero-based
         if(mm<10){
          mm= '0'+mm.toString();
         }else{
          mm= mm.toString();
         }
         var ss  = d.getSeconds().toString();
         if(ss<10){
          ss= '0'+ss.toString();
         }else{
          ss= ss.toString();
         }
         var full_time = hh+":"+mm+":"+ss;
         return full_time
     }


















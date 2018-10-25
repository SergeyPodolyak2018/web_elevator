var TEMP_CURRENT=10;
var start_ask_сurrent_grafic=0;



function Сurrent_grafic(){

	this.grafic_name;
	this.line_name;
	this.max_times;
	this.counter_times;
	this.last_point_X;
	this.first_point_X;
	this.first_point_Y;
	this.poliline;
	this.current_points_X;
	this.current_points_Y;
	this.current_times;
	this.axel_Y_value;
	this.scale;
	this.last_scale;
  this.counterForeSelectTime;;


	function initialization(){

    counterForeSelectTime=1;
		max_times=25;
	    counter_times=0;
	    last_point_X=1000;
	    first_point_X=1000;
	    first_point_Y=13000;
	    scale = 1;
	    last_scale=1;
	    axel_Y_value=[10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        current_points_X = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,17, 17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5];
       // current_points_Y = [19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000, 19000];
        current_points_Y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        current_times = ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'];

	}

//Добавление точки в график
	this.add_point = function(current,time){
    var internalTime=time;
    if(counterForeSelectTime!=1){
      internalTime='-';
    }

	  var points='';
    var SVG = document.getElementById('current_svg');
	  var svgdom = SVG.contentDocument;
    var temp = current_points_Y.push(calculate_y(current));
      temp = current_points_Y.shift();
      temp = current_times.push(internalTime);
      temp = current_times.shift();
      for (var i = 0; i < 60; i++ ){
      points=points+''+(current_points_X[i]*1000)+','+(first_point_Y-current_points_Y[i])+' '
      var text_time1 = svgdom.getElementsByClassName('current_time'+i);
      $(text_time1).text(current_times[i]);
      }

        poliline = svgdom.getElementsByClassName('current_line');

       // $(poliline).attr('points','2000,13000, '+points+', 31500,13000');
            $(poliline).attr('points',''+points);

            counterForeSelectTime++;
            if(counterForeSelectTime>5){
              counterForeSelectTime=1;
            }



	}


//Обнулить график
    this.reset_grafic = function(){

        var SVG = document.getElementById('current_svg');
	    var svgdom = SVG.contentDocument;

		poliline = svgdom.getElementsByClassName('current_line');


        $(poliline).attr('points','');

        last_point_X=first_point_X;
        counter_times=0;
        TEMP_CURRENT=10;
	}
	//Обнулить график
    this.reinicialization = function(){
        initialization();

	}


this.prepear_grafic = function(max_grafic_current,max_current,nom_current){
    set_scale(max_grafic_current,max_current,nom_current);
}




//установка маштаба
    function set_scale(scale_value,max_current,nom_current){
        //var max_current_value=scale_value;
        //console.log(scale_value);
        var max_current_value=max_current;
        var step_current_value=max_current_value/10;
        var temp_step_by_step=0;


        //initialization();
        scale=10000/max_current_value;
        
        var SVG = document.getElementById('current_svg');
        var svgdom = SVG.contentDocument;
        for (var i = 0; i < 10; i++ ){            
            temp_step_by_step=temp_step_by_step+step_current_value;
            let normalValue=temp_step_by_step.toFixed(1);            
            let text_Y_axel = svgdom.getElementsByClassName('current_value'+i);

          //$(text_Y_axel).text(''+temp_step_by_step);
          $(text_Y_axel).text(''+normalValue);

        }
        //линия максимум
        var red_line = svgdom.getElementsByClassName('max_current');


        $(red_line).attr('y1',(first_point_Y-calculate_y(max_current)));
        $(red_line).attr('y2',(first_point_Y-calculate_y(max_current)));

          //линия номинал
        var green_line = svgdom.getElementsByClassName('nom_current');
        $(green_line).attr('y1',(first_point_Y-calculate_y(nom_current)));
        $(green_line).attr('y2',(first_point_Y-calculate_y(nom_current)));






        
    }

   //Расчет координаты X
    function calculate_x(){
        last_point_X=last_point_X + first_point_X;
        return last_point_X;
    };

    //Расчет координаты Y
    function calculate_y(current){
        //var y=first_point_Y-(current*100*scale);
        var y=(current*scale);
        return y;
    };

//Инкрементатор добавлений - не используется
    function incrementator(){
        counter_times=counter_times+1;

    };


initialization();


}

//Открыть график
function archive_current_open(instant_or_db){

                hidemenu();

                var url_string = '/devices/';

                $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    hide_source_receiver();
                    }},
                    success: function( result ) {
                        let tempBufer=JSON.parse(result);
                        let  devices_names_from_server=tempBufer.data;
                        // console.log(message);
                        var temp_string='<option selected value="0" >-</option>';
                         // var devices_names_from_server=JSON.parse(result);

                         for(var i in  devices_names_from_server){
                         temp_string=temp_string+'<option value="'+devices_names_from_server[i].id+'" >'+devices_names_from_server[i].name+'</option>';
                         }
                         var current_filter_tools_equipment = document.getElementById('current_filter_tools_equipment');
                         current_filter_tools_equipment.innerHTML = temp_string;
                         var archive_current_filter_tools_equipment = document.getElementById('archive_current_filter_tools_equipment');
                         archive_current_filter_tools_equipment.innerHTML = temp_string;

                         $('#archive_current').show();

                         if(instant_or_db==1){
                         $('.current_from_arxiv_tools').hide();
                         $('.current_from_device_tools').show();
                         }else{
                         $('.current_from_arxiv_tools').show();
                         $('.current_from_device_tools').hide();
                         $('#archive_current_filter_tools_scale').val(1);
                         $('#datepicker_current').val(date())
                         $('#timepicker_current').val(time())
                         }
                        if(сurrent_grafic==0){
                         сurrent_grafic = new Сurrent_grafic();
                        }

                    },
                    error: function (jqXHR, exception) {
                    console.log(exception);
                    alert('Сервер не отвечает');
                    hide_source_receiver();
                    }
                });

                // Создаётся объект promise
              //  let promise = new Promise((resolve, reject) => {

                //  $('#archive_current').show(function(){resolve();});
                  //$('#archive_current_content').onload ( function(){resolve();})
             //   });

                // promise.then навешивает обработчики на успешный результат или ошибку
          //      promise
           //       .then(
          //          result => {
                      // первая функция-обработчик - запустится при вызове resolve

           //           get_grafick_property();
            //        },
            //        error => {
              //        // вторая функция - запустится при вызове reject
               //       alert("Rejected: " + error); // error - аргумент reject
                //    }
                 // );

        		//$('#current_scale_slider').val(1)
        		//Объект график токов
        		//if(сurrent_grafic==0){
                //сurrent_grafic = new Сurrent_grafic();
               /// }

               // $('.current_from_arxiv_tools').hide();
               // $('.current_from_device_tools').show();
}

function archive_current_open_from_DB(){
                hidemenu();
        		$('#archive_current').show();
        		$('.current_from_arxiv_tools').show();
        		$('.current_from_device_tools').hide();
        		//Объект график токов
        		if(сurrent_grafic==0){
                сurrent_grafic = new Сurrent_grafic();
                }


}

//Закрыть график
function archive_current_close(){
        		$('#archive_current').hide();
                    //закончить циклический запрос
                    clearInterval(start_ask_сurrent_grafic);
                    //рениициализировать объект
                    сurrent_grafic.reinicialization();

}

//Добавить точку-  не используется
function add_point_to_grafic(){

               TEMP_CURRENT=TEMP_CURRENT+5;
               сurrent_grafic.add_point(TEMP_CURRENT,'xer')
}


//Циклическое добавление точек
function add_point_ciclic(index){

                var url_string = '/current/?index='+index;

                $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    hide_source_receiver();
                    }},
                    success: function( result ) {
                        let tempBufer=JSON.parse(result);
                        let  current_from_server=tempBufer.data;
                         // var  current_from_server=JSON.parse(result);
                         var current_value=current_from_server.point0.value;
                         var current_time=current_from_server.point0.time;
                         сurrent_grafic.add_point(current_value,current_time);

                    },
                    error: function (jqXHR, exception) {
                    console.log(exception);
                    alert('Сервер не отвечает');
                    hide_source_receiver();
                    }
                });


}
//Добавление точек из архива
function add_points_from_archiv(index,scale,date,time){

                var url_string = '/current_arxiv/?index='+index+'&scale='+scale+'&date='+date+'&time='+time;

                $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    hide_source_receiver();
                    }},
                    success: function( result ) {
                        let tempBufer=JSON.parse(result);
                        let  current_from_server=tempBufer.data;
                         // var  current_from_server=JSON.parse(result);

                         for (i in current_from_server){

                             var current_value=current_from_server[i].value;

                             var current_time=current_from_server[i].time;

                            сurrent_grafic.add_point(current_value,current_time);


                         }

                    },
                    error: function (jqXHR, exception) {
                    console.log(exception);
                    alert('Сервер не отвечает');
                    hide_source_receiver();
                    }
                });


}

function get_grafick_property(instant_or_db){
                var index=0;
                var scale=0;
                var date='';
                var time='';


                clearInterval(start_ask_сurrent_grafic);
                сurrent_grafic.reinicialization();
                if(instant_or_db==1){
                    index=$('#current_filter_tools_equipment').val();
                }else{
                    index=$('#archive_current_filter_tools_equipment').val();
                    scale=$('#archive_current_filter_tools_scale').val();
                    date=$('#datepicker_current').val();
                    time=$('#timepicker_current').val();
                }

                var url_string = '/current_grafic_property/?index='+index;

                $.ajax({
                    url: url_string,
                    data: {},
                    timeout:3000,
                    statusCode:{404:function(){alert('Функция не реализована');
                    hide_source_receiver();
                    }},
                    success: function( result ) {
                        let temp = JSON.parse(result);
                        var  current_from_server=temp.data;
                        var max_grafic_current=current_from_server.max_grafic_current;
                        var max_current=current_from_server.max_current;
                        var nom_current=current_from_server.nom_current;

                        сurrent_grafic.prepear_grafic(max_grafic_current,max_current,nom_current);


                        if(instant_or_db==1){
                           start_ask_сurrent_grafic= setInterval(function() { add_point_ciclic(index) }, 1000);
                           console.log('точка1');
                        }else{
                            add_points_from_archiv(index,scale,date,time);
                            console.log('точка2');

                        }



                    },
                    error: function (jqXHR, exception) {
                    console.log(exception);
                    alert('Сервер не отвечает');
                    hide_source_receiver();
                    }
                });
}








//Изминить маштаб
function change_scale(value){
        		сurrent_grafic.set_scale(value);

}
function change_scale2(value){
        	сurrent_grafic.set_scale($(value).val());

}

//Начать считывание
function start_ciclic(){
        	start_ask_сurrent_grafic= setInterval(function() { add_point_ciclic() }, 500);
}
//Остановить считывание
function stop_ciclic(){
        	clearInterval(start_ask_сurrent_grafic);
}
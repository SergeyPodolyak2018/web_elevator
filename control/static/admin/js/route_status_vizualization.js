"use strict"

//Объявить глобальный объект состояния маршрутов
var global_objekt_of_rout={

	changeStatus:function(routeStatuses){
		
		for (var i in routeStatuses) {						
			if(routeStatuses[i].status>0){				
				document.getElementById('oll_route_statuses').style.display='block';
				break;
			}
			document.getElementById('oll_route_statuses').style.display='none';
		}

		for (var i in routeStatuses) {
			this[i].myStatus(routeStatuses[i]);
		}
	}
};

//Конструктор объектов отдельных маршрутов
function getNewObjectOfOneRoute(){
	getNewObjectOfOneRoute.count++;

	this.source=0;
	this.receive=0;
	this.kylt=0;
	this.status=0;

	var rowOfRoute=document.createElement('tr');
	var sourceTable=document.createElement('td');
	var receiveTable=document.createElement('td');
	var kyltTable=document.createElement('td');
	// sourceTable.style.cssText='padding-left: 5px;';
	// receiveTable.style.cssText='padding-left: 5px;';
	// kyltTable.style.cssText='padding-left: 5px;';	

	rowOfRoute.appendChild(sourceTable);
	rowOfRoute.appendChild(receiveTable);
	rowOfRoute.appendChild(kyltTable);	
	rowOfRoute.style.display='none';

	
	//Дополнить див с маршрутами 
	document.getElementById('tbody_oll_route_statuses').appendChild(rowOfRoute);

	//Добавить событие на строку для показа маршрута	
	var a=getNewObjectOfOneRoute.count;
	rowOfRoute.addEventListener('contextmenu', function(){showRoutFromList(a);}, false);
	


	this.setSource=function(){
		if(this.source!=0){
			sourceTable.innerText=menu_header_text[this.source].longName;
		}else{
			sourceTable.innerText=' ';
		}
	}
	this.setReceive=function(){
		if(this.receive!=0){
			receiveTable.innerText=menu_header_text[this.receive].longName;
		}else{
			receiveTable.innerText=' ';
		}
	}
	this.setKylt=function(){
		kyltTable.innerText=global_kylt_from_server_formated[this.kylt];
	}
	this.setStatus=function(){
		if (this.status>0) {
			if (rowOfRoute.style.display=='none') {
				rowOfRoute.style.display='';
			}			
			switch(this.status){
	                    
	                    /*case 1 :rowOfRoute.style.backgroundColor='#00ffff';
	                        break;*/
	                    case 2 :rowOfRoute.style.backgroundColor='#ffcc00';//запуск
	                        break;
	                    case 3 :rowOfRoute.style.backgroundColor='#00dc00';//работа
	                        break;
	                    case 4 :rowOfRoute.style.backgroundColor='#ff00ff';//останов
	                        break;
	                    case 5 :rowOfRoute.style.backgroundColor='#ff0000';//авария
	                        break;	                    
	                    /*case 7 :rowOfRoute.style.backgroundColor='#0000ff';//
	                        break;*/
	                    default:                        
	                        break;
	                }
	    }else{
	    	if (rowOfRoute.style.display=='') {
				rowOfRoute.style.display='none';
			}
	    }
		
	}
}

//Объявление метода через прототип для всех объектов метод сравнивает состояние объекта и меняет его
getNewObjectOfOneRoute.prototype.myStatus = function(state){
	if(this.source!=state.source){
		this.source=state.source;
		this.setSource();
	}

	if(this.receive!=state.receive){
		this.receive=state.receive;
		this.setReceive();
	}

	if(this.kylt!=state.kylt){
		this.kylt=state.kylt;
		this.setKylt();
	}

	if(this.status!=state.status){
		this.status=state.status;
		this.setStatus();
	}

};

//Счетчик выпущенных объектов
getNewObjectOfOneRoute.count=0;


//Функция заполнения глобального объекта, отдельными объектами маршрутов
function fillRouteObject(){
	for (var i = 1; i<=17; i++) {
		global_objekt_of_rout['routelist'+i]=new getNewObjectOfOneRoute();

	}
}


//функция запрашивающая у сервера состояние маршрутов
function get_route_statuses(){
        var url_string ='/route_list/';
        var tempRouteList;
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
              //console.log(result);
                if(result!=404){
                    tempRouteList=JSON.parse(result);
                    
                    }
                   global_objekt_of_rout.changeStatus(tempRouteList);                    
                }
                
            
        });
    }

 //Создать див в котором будут отображаться маршруты   
function createDivWithTable(){
	var divForeProject=document.createElement('div');
	// divForeProject.style.cssText='font-family: sans-serif;\
                            
 //                            width: auto;\
 //                            height: auto;\
 //                            position: absolute;\
 //                            top:20%;\
 //                            left:20%;\
 //                            background-color: #e9e9e9;\
 //                            border:1px solid #808080;\
 //                            border-radius: 2px;';

    divForeProject.setAttribute('id','oll_route_statuses');
    divForeProject.setAttribute('class','draggable modal_box rout-list');

	var tableForeProject=document.createElement('table');
	tableForeProject.setAttribute('class','settings-universal__table');
	// tableForeProject.style.cssText='border: 1px solid #000000;'
	var tableheadForeProject='<thead class="settings-universal__table-header">\
                                <tr>\
                                    <td>Источник</td>\
                                    <td>Приемник</td>\
                                    <td>Культура</td>\
                                </tr>\
                            </thead>\
                            <tbody id="tbody_oll_route_statuses" class="rout-list__tbody">\
                            </tbody>';

    tableForeProject.innerHTML=tableheadForeProject;
    divForeProject.appendChild(tableForeProject);
    document.getElementById("container").appendChild(divForeProject);                   
}

//Функция показа маршрута 
function showRoutFromList(number){
	var url_string;	
    var source_index=global_objekt_of_rout['routelist'+number].source;    
    url_string = '/route/?source='+source_index+'&receive='+0+'&command='+15+'&index='+0+'&kylt='+0;
    send_comand(url_string);
    return false;//вернуть отрицание для блокировки всплытия контекстного меню
}

//-----------------Подготовительные мероприятия---------------------
//Запихнуть в проект новый див
createDivWithTable();

//Заполнить глобальный объект
fillRouteObject();
//--------------------------------------------------------------------

//Задать интервал вызова функции опроса сервера на предмет определения состояния маршрутов
setInterval(function() {get_route_statuses();}, 1000);




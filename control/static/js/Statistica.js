function staistic_ask(p1,p2,p3,index,type){
	 
	let url_string ='/statistics/?command=1&index='+index;

	$.ajax({
        url: url_string,
        data: {},
        timeout:3000,
        statusCode:{404:function(){alert('Функция не реализована');
        }},
        success: function( result ){
        	let answer=JSON.parse(result);            	
            if (answer.message=='OK'){
                open_statistic_window(index,answer);
                objectMenuManager.hide();
            }else{
                alert('Сервер не отвечает или данные не валидны')
            }
        },
        error: function (jqXHR, exception){
            console.log(exception);
            alert('Сервер не отвечает');
        }
    });
}

function open_statistic_window(index,answer){
	let fields=["work","switch","period","residue"]
	let statisticWindow=document.getElementById('statistic_window');
	$('statistic_window').show();
    // statisticWindow.style.cssText='display:block;'
	for (let i in fields) {
		statisticWindow.getElementsByClassName('statistic_'+fields[i])[0].innerHTML=answer[fields[i]];
	}
    console.log(statisticWindow.getElementsByClassName('statistic_window_header_name'));
	statisticWindow.getElementsByClassName('statistic_window_header_name')[0].innerHTML=menu_header_text[index].longName;
}

function statistic_close(){
    $('statistic_window').hide();
	// document.getElementById('statistic_window').style.cssText='display:none;';
}

function reset_statistic_window(index){
	let url_string ='/statistics/?command=2&index='+index;

	$.ajax({
        url: url_string,
        data: {},
        timeout:3000,
        statusCode:{404:function(){alert('Функция не реализована');
        }},
        success: function( result ){
        	let answer=JSON.parse(result);            	
            if (answer.message=='OK'){
                statistic_close();
            }else{
                alert('Сервер не отвечает или данные не валидны')
            }
        },
        error: function (jqXHR, exception){
            console.log(exception);
            alert('Сервер не отвечает');
        }
    });
}
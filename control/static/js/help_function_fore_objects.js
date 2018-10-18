function prepareForm(form){
	$(form.getElementsByClassName('checkable_data_form')).bind("change keyup input click blur ", function() {

	    if (this.value.match(/[^0-9]/g)) {
	        this.value = this.value.replace(/[^0-9]/g, '');
	    } 
		if (this.value == '') {
	        this.value = '0';
	    }    
    
	});

// 	$(form.getElementsByClassName('checkable_data_float')).bind("change keyup", function() {		
// 	   if (this.value.match(/^[-]{0,1}[0-9]{1,3}([\.]{1}[0-9]{1,2}){0,1}$/)) {        	
//         	this.style.backgroundColor = 'green';        
//        }else{
// 			this.value = this.value.replace(/[^0-9|\.|-]/gi, '');
// 			this.style.backgroundColor = 'red';
// 		}
// 	});
	

	$(form.getElementsByClassName('adres_getable')).hover(function() {
		
	    var abstrackt_value=$(this).val();
	    if(abstrackt_value>=8){
	    var a=Math.floor(abstrackt_value/8);

	    var b=abstrackt_value%8;

	    $(this).attr('title',"I"+a+'.'+b);
	    }else{
	        $(this).attr('title',"Канал датчика");
	    }
	});
	$(form.getElementsByClassName('adres_getable_Q')).hover(function() {
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


function settings_open(response){
	let prepareDataFromServer=JsonToformSettings(response.data);	
	document.getElementById('container').appendChild(this.window_settings);	
	$( this.window_settings).draggable({
  		appendTo: "body"
	});

	if(this.window_settings.style.display == 'none'){
		hidemenu();
		this.window_settings.style.display = 'block';
		this.window_settings.getElementsByClassName('fool_name_of_device')[0].innerHTML=this.name;
		let objectContext=this;
		//prepareForm(this.window_settings);

		let myForm=this.window_settings.getElementsByTagName('form')[0];
		console.log(prepareDataFromServer);

		for (let i  in prepareDataFromServer) {
            try {
                myForm.elements[i].value =prepareDataFromServer[i];
            } catch (err) {
               	console.log(err);                
           }
      	}

  //     	[...this.window_settings.getElementsByClassName('analog_settings_button')].forEach(function(item, i, arr) {			
		// 	item.onclick=function(e){analog_dat_settings_get.call(objectContext,e);};
		// });
		[...this.window_settings.getElementsByClassName('btn-close')].forEach(function(item, i, arr) {
			item.onclick= function(){objectContext.close_settings();};
		});
		[...this.window_settings.getElementsByClassName('btn-save')].forEach(function(item, i, arr) {
			item.onclick= function(){objectContext.save_settings();};
		});		
		
	}
}

function settings_close(){	
	if(this.window_settings.style.display == 'block'){
		this.window_settings.style.display = 'none';		
		this.window_settings.parentNode.removeChild(this.window_settings);
	}
}



function settings_save(){
	    let form        = this.window_settings.getElementsByTagName('form')[0];	    
	    let body        = JSON.stringify(formSettingsToJSON(form.elements));
	    let url_string  = '/device_save_settings/?name='+this.name;
	    let context =this;
	    let callback = function(response){context.close_settings(response)};	    
 		post_data_to_server(url_string,body,callback,null);	    
}

function settings_get(){
	    let url_string  = '/device_get_settings/?index='+this._id;
	    let context =this;
	    let callback = function(response){context.open_settings(response)};	    
 		get_data_to_server(url_string,callback,null);
}


//Посылка данных серверу
function get_data_to_server(qwery,callback,bufer) {    
    var x = new XMLHttpRequest();
    x.open("GET", qwery, true);
    //Обработка статусов
    x.onload = function (){
        let responseText = x.responseText;        
        let responseObject = JSON.parse(responseText);
        console.log(responseObject);
        if(responseObject.type==0){
            if(callback){
                callback({"data":responseObject.data,"bufer":bufer});
            }
        }else{            
                showMessageFromServer({'type':responseObject.type,'message':responseObject.message,"bufer":bufer});
            
        }      
    }
    x.timeout = 3000;
    x.send(null);
}

//Посылка данных серверу
  function post_data_to_server(qwery,body,callback,bufer){    
    console.log(body);
    var x = new XMLHttpRequest();
    x.open("POST", qwery, true);
    x.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    //Обработка статусов
    x.onload = function (){
        let responseText = x.responseText;        
        let responseObject = JSON.parse(responseText);
        console.log(responseObject);
        if(responseObject.type==0){
            if(callback){
                callback({"data":responseObject.data,"bufer":bufer});
            }
        }else{            
                showMessageFromServer({'type':responseObject.type,'message':responseObject.message,"bufer":bufer});
            
        }      
    }
        x.timeout = 3000;
        x.send(body);
    }
var socket;

const socketMessageListener = (event) => {
  // console.log(event.data);
  var newData=JSON.parse(event.data);
  
  if(newData.identificator==="status"){	
  		worker.postMessage([global_object_status,newData.data]);
	}

  if(newData.identificator==="link"){ 
      linck(newData.data);
  }

  if(newData.identificator==="status_analog"){ 
      worker3.postMessage([global_object_status_analog,newData.data]);
  }

  if(newData.identificator==="status_kylt"){ 
      worker4.postMessage([global_object_status_kylt,newData.data]);
  }
  if(newData.identificator==="route_list"){ 
      global_objekt_of_rout.changeStatus(newData.data);   
  }


  
	if(newData.identificator==="menu"){	  		
        menu_kreator(newData);
	}
  if(newData.identificator==="update"){    
    location.reload(true);
  }
  if(newData.identificator==="alarm"){     
    alarm_build(newData);    
  }
  if(newData.identificator==="status_bar"){
    worker2.postMessage([global_object_status_footer,newData.data]);   
  }

};

const socketOpenListener = (event) => {
  console.log('Connected');
  //socket.send('hello');
};

const socketErrorListener = (event) => {
  console.log('Error: ' + error.message);
};

const socketCloseListener = (event) => {
  if (socket) {
    console.error('Disconnected.');
  }

  if (window.location.protocol == 'https:')
    socket = new WebSocket('wss://'+window.location.hostname+':25011');
  else
    socket = new WebSocket('ws://'+window.location.hostname+':25011');

  socket.addEventListener('open', socketOpenListener);
  socket.addEventListener('message', socketMessageListener);
  socket.addEventListener('error', socketErrorListener);
  socket.addEventListener('close', socketCloseListener);
};

//socketCloseListener();

/*// for testing
setTimeout(()=>{
  socket.close();
},5000);*/
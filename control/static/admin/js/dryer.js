function dryer_window_open(command,p2,p3,device_index,type){	
	let tempCommand=command;
	let tempP2=p2;
	let tempdevice_index=device_index;
	document.getElementById('dryer_window').style.cssText='display:block';
	objectMenuManager.hide();
	document.getElementById('dryer_window_command_button').onclick=function(){dryer_window_send_command(tempCommand,p2,0,tempdevice_index)};

}
function dryer_window_close(){
	document.getElementById('dryer_window').style.cssText='display:none';
	document.getElementById('dryer_time').value=20;
	document.getElementById('dryer_time_out').value=20;
}

function dryer_window_send_command(comand,p2,p3,index){
	let tempP2=document.getElementById('dryer_time').value;
    dryer_window_close();    
    start_stop_mex(comand,tempP2,p3,index);
}
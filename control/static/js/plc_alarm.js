function open_plc_alarm(){
	console.log('open_plc_alarm()');
	document.getElementById('alarm_plc_connection').style.display = 'block';
	startPlaySound();
}

function close_plc_alarm(){
	
	document.getElementById('alarm_plc_connection').style.display = 'none';
	stopPlaySound();
}
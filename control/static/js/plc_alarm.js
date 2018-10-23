function open_plc_alarm(text){
	stopPlaySound_plc();
	let divElement=document.getElementById('alarm_plc_connection');
	divElement.style.display = 'block';
	divElement.getElementsByClassName('alarm_plc_content-text')[0].innerText=text;
	startPlaySound_plc();
}

function close_plc_alarm(){
	document.getElementById('alarm_plc_connection').style.display = 'none';
	stopPlaySound_plc();
}
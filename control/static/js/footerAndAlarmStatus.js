

function footerAndAlarmStatus(status){
	$("#Timer").text(status.timer);
    $("#Date").text(status.date);
    $("#Time").text(status.time);
    $("#footer_help").text(status.help); 
    $("#footer_message").text(status.message);
    $("#footer_name").text(status.name);
    $("#footer_control").text(status.control);
    
    
    switch(status.plc){
        case 0://$("#footer_plc_status").css('background-color','grey');
              document.getElementById('footer_plc_status').removeAttribute("style");
            break;
        case 1 ://$("#footer_plc_status").css('background-color','#00ff00');
                document.getElementById('footer_plc_status').style.cssText='background-color:#00ff00; color:black';
            break;
        case 2 ://$("#footer_plc_status").css('background-color','yellow');
                document.getElementById('footer_plc_status').style.cssText='background-color:yellow; color:black';
            break;
        case 3 ://$("#footer_plc_status").css('background-color','red');
                document.getElementById('footer_plc_status').style.cssText='background-color:red; color:black';
            break;
        default:
            //$("#footer_plc_status").css('background-color','grey');
            break;
    }
    switch(status.drv){
        case 0://$("#footer_plc_status").css('background-color','grey');
              document.getElementById('footer_drv').removeAttribute("style");
            break;
        case 1 ://$("#footer_plc_status").css('background-color','#00ff00');
                document.getElementById('footer_drv').style.cssText='background-color:yellow; color:black';
            break;
        case 2 ://$("#footer_plc_status").css('background-color','yellow');
                document.getElementById('footer_drv').style.cssText='background-color:#00ff00; color:black';
            break;
        case 3 ://$("#footer_plc_status").css('background-color','red');
                document.getElementById('footer_drv').style.cssText='background-color:red; color:black';
            break;
        case 4 ://$("#footer_plc_status").css('background-color','red');
                document.getElementById('footer_drv').style.cssText='background-color:red; color:black';
            break;
        case 5 ://$("#footer_plc_status").css('background-color','red');
                document.getElementById('footer_drv').removeAttribute("style");
            break;
        case 6 ://$("#footer_plc_status").css('background-color','red');
                document.getElementById('footer_drv').style.cssText='background-color:#31d4e0; color:black';
            break;
        default:
            //$("#footer_plc_status").css('background-color','grey');
            break;
    }
    //Окно текущих аварий
    if (status.alarm > 0){
    	let logotip_object = document.getElementById('logotip');
    	let logotip_object_content = logotip_object.contentDocument;
    	let logotip_object_content_line=logotip_object_content.getElementsByClassName('logotip');
    	$(logotip_object_content_line).css('fill', 'red');
    	
    }else{
    	if (status.alarm == 0){
    		let logotip_object = document.getElementById('logotip');
    		let logotip_object_content = logotip_object.contentDocument;
    		let logotip_object_content_line=logotip_object_content.getElementsByClassName('logotip');
    		$(logotip_object_content_line).css('fill', '#FFED00');
    	}
    }

    if(status.bell >0){

                    if(status.bell ==1){
                        header_menu.hide_button(ring_grey);
                        header_menu.hide_button(ring_blue);
                        header_menu.hide_button(ring_flash);
                        header_menu.show_button(ring_green);
                        stopPlaySound();

                    }
                    if(status.bell ==2){
                        header_menu.hide_button(ring_grey);
                        header_menu.hide_button(ring_blue);
                        header_menu.hide_button(ring_green);
                        header_menu.show_button(ring_flash);
                        startPlaySound();

                    }

                    if(status.bell ==4){
                        header_menu.hide_button(ring_grey);
                        header_menu.hide_button(ring_flash);
                        header_menu.hide_button(ring_green);
                        header_menu.show_button(ring_blue);
                        stopPlaySound();
                    }


                }else{
                    if(status.bell==0){                            
                          header_menu.hide_button(ring_blue);
                          header_menu.hide_button(ring_flash);
                          header_menu.hide_button(ring_green);
                          header_menu.show_button(ring_grey);
                          stopPlaySound();
                      }
                }
}
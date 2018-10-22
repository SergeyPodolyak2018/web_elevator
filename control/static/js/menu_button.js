function Header_menu(userSatus){

	this.cancel_start_rout_button;
	this.start_rout_button;
	this.stop_rout_button;
	this.cancel_stop_rout_button;
	this.extra_stop_rout_button;
	this.cancel_extra_stop_rout_button;
	this.ring_grey;
	this.ring_green;
	this.ring_blue;
	this.ring_flash;
	this.archiv_close;
	this.archiv_open;
	this.servise_close;
	this.servise_open;
	this.exit_not_press;
	this.exit_press;
	this.logotip;
	this.huy=5;



	function initialization(){
		var SVG = document.getElementById("start_rout_button").getSVGDocument();
		start_rout_button = SVG.getElementsByClassName('start_rout_button');
		cancel_start_rout_button = SVG.getElementsByClassName('cancel_start_rout_button');

		SVG = document.getElementById("stop_rout_button").getSVGDocument();
		stop_rout_button = SVG.getElementsByClassName('stop_rout_button');
		cancel_stop_rout_button = SVG.getElementsByClassName('cancel_stop_rout_button');

		SVG = document.getElementById("extra_stop_button").getSVGDocument();
		extra_stop_rout_button = SVG.getElementsByClassName('extra_stop_rout_button');
		cancel_extra_stop_rout_button = SVG.getElementsByClassName('cancel_extra_stop_rout_button');

		SVG = document.getElementById("ring_button").getSVGDocument();
		ring_grey=SVG.getElementsByClassName('ring_grey');
		ring_green=SVG.getElementsByClassName('ring_green');
		ring_blue=SVG.getElementsByClassName('ring_blue');
		ring_flash=SVG.getElementsByClassName('ring_flash');

		SVG = document.getElementById("archiv_button").getSVGDocument();
		archiv_open = SVG.getElementsByClassName('archiv_open');
		archiv_close = SVG.getElementsByClassName('archiv_close');

		SVG = document.getElementById("service_button").getSVGDocument();
		servise_open = SVG.getElementsByClassName('servise_open');
		servise_close = SVG.getElementsByClassName('servise_close');

		SVG = document.getElementById("logotip").getSVGDocument();
		logotip = SVG.getElementsByClassName('logotip');


		SVG = document.getElementById("exit_button").getSVGDocument();
		exit_not_press = SVG.getElementsByClassName('exit_not_press');
		exit_press = SVG.getElementsByClassName('exit_press');

		if (userSatus==1 || userSatus==2){
			set_function_click_on_button(start_rout_button,clic_on_source,1);
			set_function_click_on_button(cancel_start_rout_button,hide_source_receiver,1);
			set_function_click_on_button(stop_rout_button,clic_on_stop_source,1);
			set_function_click_on_button(cancel_stop_rout_button,hide_source_receiver,1);

	        set_function_click_on_button(extra_stop_rout_button, clic_on_extra_stop_source,1);
	        set_function_click_on_button(cancel_extra_stop_rout_button, hide_source_receiver,1);

			set_function_click_on_button(ring_grey,bell_command,1,1);
			set_function_click_on_button(ring_grey,bell_command,2,4);
			set_function_click_on_button(ring_green,bell_command,1,1);
			set_function_click_on_button(ring_green,bell_command,2,4);
			set_function_click_on_button(ring_blue,bell_command,1,1);
			set_function_click_on_button(ring_blue,bell_command,2,4)
			set_function_click_on_button(ring_flash,bell_command,1,1);
			set_function_click_on_button(ring_flash,bell_command,2,4);
			
			set_function_click_on_button(logotip,alarm,1);
		}



		//set_function_click_on_button(archiv_close,showmenu(document.getElementById("archiv_button").getSVGDocument()));// не работает
		set_function_click_on_button(archiv_close,showmenu,1);
		set_function_click_on_button(archiv_open,hidemenu,1);

		set_function_click_on_button(servise_close,showmenu1,1);
		set_function_click_on_button(servise_open,hidemenu,1);

		set_function_click_on_button(exit_not_press,logOut,1);

		
		//set_function_click_on_button(cancel_start_rout_button,hide_source_receiver());

		//set_function_click_on_button(stop_rout_button,clic_on_stop_source());

		hide(cancel_start_rout_button);
		hide(cancel_extra_stop_rout_button);



	}


	function set_function_click_on_button(button, click_function,variant,parametr){
		if(variant==1){
            $(button).on('click', function(){
                click_function(parametr);
            });
		}else{
		    $(button).on('contextmenu', function(){
                click_function(parametr);
                return false;
            });
		}
	}

	//this.hide_button=function(button){
	//	button.hide();
	//}

	function show(button){
		$(button).show();
	}
    function hide(button){
		// console.log(button);
		$(button).hide();
	}

    this.hide_button = function(button){
        hide(button);
    };
    this.show_button = function(button){
        show(button);
    };
    this.get_start_rout_button = function() {
    return start_rout_button;
    };

initialization();



}















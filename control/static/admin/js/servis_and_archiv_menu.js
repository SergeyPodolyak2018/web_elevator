function showmenu() {
    hidemenu();
    header_menu.hide_button(archiv_close);
    header_menu.show_button(archiv_open);
     var pos = $('#archiv_SVG').offset();
     var pos2=$('#archiv_SVG').width()
     //var pos = element.getBBox();
     console.log(pos);
     console.log(pos2);
     console.log(pos.left);
     if(pos.left >20){
         $('.visible').removeClass('visible').addClass('hiden');
         $(".hiden").css("left",""+pos.left+"px");
         $(".hiden").css("top",""+(pos.top+15)+"px");     
         $(".hiden").css("width","170px");
         $(".visible").css("left",""+pos.left+"px");
         $(".visible").css("top",""+(pos.top+15)+"px");     
         $(".hiden").css("width","170px");
    }

    if(pos.left <20){
         $('.visible').removeClass('visible').addClass('hiden');
         $(".hiden").css("left",""+(pos2)+"px");
         $(".hiden").css("top",""+(pos.top-10)+"px");
         $(".hiden").css("width","170px");
         $(".visible").css("left",""+(pos2)+"px");
         $(".visible").css("top",""+(pos.top-10)+"px");
         $(".hiden").css("width","170px");
    }

    $('#archiv').removeClass('hiden').addClass('visible');


    }
//Показать второе меню для верхней консоли
    function showmenu1() {
    hidemenu();
     header_menu.hide_button(servise_close);
     header_menu.show_button(servise_open);
     var pos =$('#servise_SVG').offset();
     var pos2=$('#servise_SVG').width()
     console.log(pos);
     console.log(pos.left);
     if(pos.left >20){
         $('.visible').removeClass('visible').addClass('hiden');
         $(".hiden").css("left",""+pos.left+"px");
         $(".hiden").css("top",""+(pos.top+15)+"px");
         $(".hiden").css("width","170px");
         $(".visible").css("left",""+pos.left+"px");
         $(".visible").css("top",""+(pos.top+15)+"px");
         $(".hiden").css("width","170px");
    }

    if(pos.left <20){
         $('.visible').removeClass('visible').addClass('hiden');
         $(".hiden").css("left",""+(pos2)+"px");
         $(".hiden").css("top",""+(pos.top - 10)+"px");
         $(".hiden").css("width","170px");
         $(".visible").css("left",""+(pos2)+"px");
         $(".visible").css("top",""+(pos.top - 10)+"px");
         $(".hiden").css("width","170px");
    }

    $('#servis').removeClass('hiden').addClass('visible');


    }
    function showmenu2(element, variant) {
    
    var pos = element.getBoundingClientRect();    
     if (variant==1){
        $('#kulture').removeClass('visible').addClass('hiden');
        $('#visiblSettings').removeClass('visible').addClass('hiden');
        $("#configuration").css("left",""+(pos.left+173)+"px");
        $("#configuration").css("top",""+(pos.top+0)+"px");
        $('#configuration').removeClass('hiden').addClass('visible');
     }
    if (variant==2){
        $('#configuration').removeClass('visible').addClass('hiden');
        $('#visiblSettings').removeClass('visible').addClass('hiden');
        $("#kulture").css("left",""+(pos.left+173)+"px");
        $("#kulture").css("top",""+(pos.top+0)+"px");
        $('#kulture').removeClass('hiden').addClass('visible');
     }

     if (variant==3){
        $('#configuration').removeClass('visible').addClass('hiden');
        $('#kulture').removeClass('visible').addClass('hiden');
        $("#visiblSettings").css("left",""+(pos.left+173)+"px");
        $("#visiblSettings").css("top",""+(pos.top+0)+"px");
        $('#visiblSettings').removeClass('hiden').addClass('visible');
     }



    }

//скрыть менюшки
    function hidemenu() {
      header_menu.hide_button(archiv_open);
      header_menu.hide_button(servise_open);
      header_menu.show_button(archiv_close);
      header_menu.show_button(servise_close);


    if( $('.visible').length > 0){

        $('.visible').removeClass('visible').addClass('hiden');
    }
    else{
    } 
    //$( "#menu").dialog( "close" );
    objectMenuManager.hide();
    $('.modal_box').css('border','1px solid #494949');

    $('.modal_box').css('box-shadow',' none');
}

//Выход из страници
    function logOut() {
        header_menu.hide_button(exit_not_press);
        header_menu.show_button(exit_press);

      var url_string ='/exit/';
        $.ajax({
                url: url_string,
                data: {},
                success: function( result ) {
                    //document.open();
                    //document.write(result);
                    //document.close();
                    window.location.reload()       
                }              
                
        });
}
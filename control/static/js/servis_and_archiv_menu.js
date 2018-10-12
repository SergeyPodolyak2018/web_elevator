//Показать первое меню для верхней консоли
function showmenu() {
    hidemenu();
    header_menu.hide_button(archiv_close);
    header_menu.show_button(archiv_open);
    document.getElementById('archiv').style.cssText='display:block';
}
//Показать второе меню для верхней консоли
function showmenu1() {
    hidemenu();
    header_menu.hide_button(servise_close);
    header_menu.show_button(servise_open);    
    document.getElementById('servis').style.cssText='display:block';
}


//скрыть менюшки
function hidemenu() {
    header_menu.hide_button(archiv_open);
    header_menu.hide_button(servise_open);
    header_menu.show_button(archiv_close);
    header_menu.show_button(servise_close);
    document.getElementById('archiv').style.cssText='display:none';
    document.getElementById('servis').style.cssText='display:none';

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
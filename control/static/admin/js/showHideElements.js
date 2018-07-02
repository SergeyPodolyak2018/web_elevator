//////////////////////////////////////////////////////////////////////////////////////////////////////
//Скрытие и показ значков
//////////////////////////////////////////////////////////////////////////////////////////////////////

function showNamesOfKlapan(){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
	var names=svgdom.getElementById('names_of_devices');
	
	if (names.getAttribute('display')=='none'){
		
		names.setAttribute('display', 'block');
	}else{
		
		names.setAttribute('display', 'none');
	}
	
}
function showHideKylt(){
       var SVG = document.getElementById("nor").getSVGDocument();
       if($(SVG.getElementsByClassName('kylt')).css('display')=='none'){
       		$(SVG.getElementsByClassName('kylt')).css('display','inline')
       }else{
       		$(SVG.getElementsByClassName('kylt')).css('display','none')
       }
       
}

/*
function show_kylt(){
       var SVG = document.getElementById("nor").getSVGDocument();
       $(SVG.getElementsByClassName('kylt')).show();
}
function hide_kylt(){
       var SVG = document.getElementById("nor").getSVGDocument();
       $(SVG.getElementsByClassName('kylt')).hide();
}
*/
function showHideCurrent(){
       var SVG = document.getElementById("nor").getSVGDocument();
       if($(SVG.getElementsByClassName('current')).css('display')=='none'){
       		$(SVG.getElementsByClassName('current')).css('display','inline')
       }else{
       		$(SVG.getElementsByClassName('current')).css('display','none')
       }
       
}
/*function hide_current(){
       var SVG = document.getElementById("nor").getSVGDocument();
       $(SVG.getElementsByClassName('current')).hide();
       
       console.log($(SVG.getElementsByClassName('current')).css('display'));
}
*/
function adres_datchik(object){
        console.log('huy');
      return "huy";
}


$('#settings_noriya_spicial_settings').click(function () {
    $('#table_settings_noriya_global').hide();
    $('#settings_noriya_aditional').show();
    $('#settings_noriya_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_noriya_spicial_settings').addClass('activ_modal_sub_menu');
});
$('#settings_noriya_total_settings').click(function () {
    $('#table_settings_noriya_global').show();
    $('#settings_noriya_aditional').hide();
    $('#settings_noriya_total_settings').addClass('activ_modal_sub_menu');
    $('#settings_noriya_spicial_settings').removeClass('activ_modal_sub_menu');
});

$('.group_a').click(function () {
    $('#settings_bell_aditional').hide();
    $('#settings_bell_global').show();
    $('.group_b').removeClass('activ_modal_sub_menu');
    $('.group_a').addClass('activ_modal_sub_menu');
});
$('.group_b').click(function () {
    $('#settings_bell_aditional').show();
    $('#settings_bell_global').hide();
    $('.group_a').removeClass('activ_modal_sub_menu');
    $('.group_b').addClass('activ_modal_sub_menu');
});

$('#settings_tube_total_settings').click(function () {
    $('#settings_tube_global').show();
    $('#settings_tube_aditional').hide();
    $('#settings_tube_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_tube_total_settings').addClass('activ_modal_sub_menu');
});
$('#settings_tube_spicial_settings').click(function () {
    $('#settings_tube_aditional').show();
    $('#settings_tube_global').hide();
    $('#settings_tube_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_tube_spicial_settings').addClass('activ_modal_sub_menu');
});

$('#settings_gate_total_settings').click(function () {
    $('#settings_gate_global').show();
    $('#settings_gate_aditional').hide();
    $('#settings_gate_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_gate_total_settings').addClass('activ_modal_sub_menu');
});

$('#settings_gate_spicial_settings').click(function () {
    $('#settings_gate_aditional').show();
    $('#settings_gate_global').hide();
    $('#settings_gate_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_gate_spicial_settings').addClass('activ_modal_sub_menu');
});

$('#settings_ventilyator_total_settings').click(function () {
    $('#settings_ventilyator_global').show();
    $('#settings_ventilyator_aditional').hide();
    $('#settings_ventilyator_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_ventilyator_total_settings').addClass('activ_modal_sub_menu');
});

$('#settings_ventilyator_spicial_settings').click(function () {
    $('#settings_ventilyator_aditional').show();
    $('#settings_ventilyator_global').hide();
    $('#settings_ventilyator_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_ventilyator_spicial_settings').addClass('activ_modal_sub_menu');
});

$('#settings_klapan_total_settings').click(function () {
    $('#settings_klapan_global').show();
    $('#settings_klapan_aditional').hide();
    $('#settings_klapan_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_klapan_total_settings').addClass('activ_modal_sub_menu');
});
$('#settings_klapan_spicial_settings').click(function () {
    $('#settings_klapan_aditional').show();
    $('#settings_klapan_global').hide();
    $('#settings_klapan_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_klapan_spicial_settings').addClass('activ_modal_sub_menu');
});

$('#settings_enable_total_settings').click(function () {
    $('#settings_enable_global').show();
    $('#settings_enable_aditional').hide();
    $('#settings_enable_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_enable_total_settings').addClass('activ_modal_sub_menu');
});
$('#settings_enable_spicial_settings').click(function () {
    $('#settings_enable_aditional').show();
    $('#settings_enable_global').hide();
    $('#settings_enable_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_enable_spicial_settings').addClass('activ_modal_sub_menu');
});

$('#settings_zadvijkaGroup_total_settings').click(function () {
    $('#settings_zadvijkaGroup_global').show();
    $('#settings_zadvijkaGroup_aditional').hide();
    $('#settings_zadvijkaGroup_aditional_indexesOfGroup').hide();
    $('#settings_zadvijkaGroup_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_zadvijkaGroup_index_settings').removeClass('activ_modal_sub_menu');
    $('#settings_zadvijkaGroup_total_settings').addClass('activ_modal_sub_menu');
});
$('#settings_zadvijkaGroup_spicial_settings').click(function () {
    $('#settings_zadvijkaGroup_aditional').show();
    $('#settings_zadvijkaGroup_global').hide();
    $('#settings_zadvijkaGroup_aditional_indexesOfGroup').hide();
    $('#settings_zadvijkaGroup_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_zadvijkaGroup_index_settings').removeClass('activ_modal_sub_menu');
    $('#settings_zadvijkaGroup_spicial_settings').addClass('activ_modal_sub_menu');
});

$('#settings_zadvijka_settings').click(function () {
    $('#settings_zadvijka_global').show();
    $('#settings_zadvijka_aditional').hide();
    $('#settings_zadvijka_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_zadvijka_settings').addClass('activ_modal_sub_menu');
});
$('#settings_zadvijka_spicial_settings').click(function () {
    $('#settings_zadvijka_aditional').show();
    $('#settings_zadvijka_global').hide();
    $('#settings_zadvijka_settings').removeClass('activ_modal_sub_menu');
    $('#settings_zadvijka_spicial_settings').addClass('activ_modal_sub_menu');
});
$('#settings_Pzadvijka_settings').click(function () {
    $('#settings_Pzadvijka_global').show();
    $('#settings_Pzadvijka_aditional').hide();
    $('#settings_Pzadvijka_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_Pzadvijka_settings').addClass('activ_modal_sub_menu');
});
$('#settings_Pzadvijka_spicial_settings').click(function () {
    $('#settings_Pzadvijka_aditional').show();
    $('#settings_Pzadvijka_global').hide();
    $('#settings_Pzadvijka_settings').removeClass('activ_modal_sub_menu');
    $('#settings_Pzadvijka_spicial_settings').addClass('activ_modal_sub_menu');
});

$('#settings_konveyer_total_settings').click(function () {
    $('#table_settings_konveyer_global').show();
    $('#settings_konveyer_aditional').hide();
    $('#settings_konveyer_spicial_settings').removeClass('activ_modal_sub_menu');
    $('#settings_konveyer_total_settings').addClass('activ_modal_sub_menu');
});
$('#settings_konveyer_spicial_settings').click(function () {
    $('#settings_konveyer_aditional').show();
    $('#table_settings_konveyer_global').hide();
    $('#settings_konveyer_total_settings').removeClass('activ_modal_sub_menu');
    $('#settings_konveyer_spicial_settings').addClass('activ_modal_sub_menu');
});


$('.modal_box').click(function () {
    $('.modal_box').css('border','1px solid #494949');
    $('.modal_box').css('z-index','910');
    $('.modal_box').css('box-shadow',' none');
    $(this).css('border','1px solid #efcd1f');
    $(this).css('z-index','999999');
    $(this).css('box-shadow',' 0 0 10px rgba(239, 205, 31, 1)');
});
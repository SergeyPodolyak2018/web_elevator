function checkActiveIco() {
    $('.inner_eq_table').each(function () {
        var obj = $(this);
        $(this).find(".ico").not('.activeIco').each(function () {
            activateIco($(this), obj);
            $(this).addClass('activeIco');
        });
    });
}

function activateIco(el, obj) {
    $(el).click(function () {
        var i = $(el).closest("tr").index();
        var cl = parseInt($(el).closest("tr").data("value"));
        if ($(this).hasClass("active")) {
            console.log('1');
            obj.find('tr').each(function (index) {
                if (index > i) {
                    var k = parseInt($(this).attr('data-value'));
                    if (k <= cl) {
                        return false;
                    } else if (k > cl) {
                        $(this).hide();
                        $(this).find(".ico").removeClass("active").removeClass('opened');
                    }
                }
            });
            $(this).removeClass("active").removeClass('opened');
        } else {
            console.log('2');
            var url = $(this).data('url');
            console.log(url);
            if (url != '' && url !== undefined) {
                // загружаем новые строки
                $(this).data('url', '');
                var row = $(this).closest('tr');
                var ico = $(this);
                $.blockUI();
                $.get(url, function (data) {
                    $(data).find(".ico").each(function () {
                        activateIco($(this), obj);
                    });
                    $(row).after(data);
                    checkActiveIco();
                    activateDdBox();
                    activateDdBoxClose();
                    obj.find('tr').each(function (index) {
                        if (index > i) {
                            var k = parseInt($(this).attr('data-value'));
                            if (k <= cl) {
                                return false;
                            } else if (k == cl + 1) {
                                $(this).show();
                            }
                        }
                    });
                    $(ico).addClass("active").addClass("opened");
                });

            } else {
                obj.find('tr').each(function (index) {
                    if (index > i) {
                        var k = parseInt($(this).attr('data-value'));
                        if (k <= cl) {
                            return false;
                        } else if (k == cl + 1) {
                            $(this).show();
                        }
                    }
                });
                $(this).addClass("active").addClass("opened");
            }
        }

        return false;
    });
}

function activateDdBox() {
    $('.inner_eq_table .item_name .item').not('.activeDdBox').each(function () {
        $(this).click(function () {
            $(this).nextAll('.dd_box').each(function () {
                    $(this).show();
                    if (window.PIE && $.browser.msie) {
                        PIE.attach(this);
                    }
                    $(this).hide();
                }
            ).show();
        });
        $(this).addClass('activeDdBox');
    })
}

function activateDdBoxClose(){
    $('.dd_box .close_btn').not('.activeDdBoxCloce').each(function () {
        $(this).click(function () {
            $(this).parent('.dd_box').hide(0).parent().removeClass('open');
        });
        $(this).addClass('activeDdBoxCloce');
    })
}

$(document).ready(function () {

    urovnenie(); // выравниваем ячейки наименования комплектующих и цены

    $(".zenInputDemo").zeninput(); // цепляем калькулятор к полю

    $('.equipment_table .item_name').click(function () {
        if (!$(this).hasClass('empty')) {
            $(this).toggleClass('open').parent().parent().parent().parent().parent().next('.inner_eq_holder').slideToggle();
        }
        return false;
    });

    activateDdBox();
    activateDdBoxClose();

    $('.inner_eq_table .item_name .diagram_lnk').click(function () {
        $('.popup_bg').show();
    });

    checkActiveIco();

    $('.inner_eq_table').each(function () {

        $(this).find(".ico1").click(function () { // развернуть/ свернуть все
            var ttt = $(this).closest("table"); // таблица в которай клацнули
            if ($(this).hasClass("active")) { // надо свернуть все
                $(ttt).find('.ico').each(function(){
                    if ($(this).hasClass("active")) {$(this).click()}
                });
                $(this).removeClass("active").removeClass('opened');
            } else { // надо развернуть все
                $(ttt).find('.ico').each(function(){
                    if (!$(this).hasClass("active")) {$(this).click()}
                });
                $(this).addClass("active").addClass("opened");
            }

            return false;
        })
    });

    $('.library_table').find('tr').each(function () {
        var $altd = $(this).find('td');
        var $tdToWrap = $($altd[$altd.length - 2]);
        if ($tdToWrap.children().length > 5) {
            console.log($tdToWrap);
            $tdToWrap.wrapInner('<div class="expander-container"></div>');
            $tdToWrap.wrapInner('<div class="expander"></div>');
            $tdToWrap.find('.expander').append('<a href="#" class="expander-control yellow_btn" data-bttext="Свернуть">Развернуть</a>');
        }

    });

    $(".newKomplectInput").autocomplete(baseUrl + '/kr/searchComponent/', {delay:700});

    $(document).click(function (event) {
        if ($(event.target).closest(".slb-upload_new").length) return;
        if ($(".kr_tz_box:visible").length) {
            if ($(event.target).closest(".kr_tz_box").length) return;
            $(".kr_tz_box:visible").hide("slow");
            //$("p").hide("slow");
            event.stopPropagation();
        }
    });

    $(document).on('click', '.expander-control', function (e) {
        e.preventDefault();
        $cnt = $(this).closest('.expander');
        if (!$cnt.hasClass('open')) {
            $cnt.addClass('open');
            var tmp = $(this).text();
            $(this).text($(this).data('bttext'));
            $(this).data('bttext', tmp);
        } else {
            $cnt.removeClass('open');
            var tmp = $(this).text();
            $(this).text($(this).data('bttext'));
            $(this).data('bttext', tmp);
        }
    });

    // всплывающие подсказки вместо диаграммы ганта
    $('.paginate_button').click(function () {
        set_tooltipster_ttl();
    });

    $('.list_holder .ico ').click(function () {
        $(this).toggleClass('open').parent().parent().toggleClass('show');
        $(this).parent().next().slideToggle();
    });

    $('#header .searchForm  input:text').click(function () {
        if (this.value == this.defaultValue) {
            this.value = '';
        }
    });

    $('#header .searchForm  input:text').blur(function () {
        if (this.value == '') {
            this.value = this.defaultValue;
        }
    });

    $('.library_table .index_number').keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8) {
        } else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    $('.list_holder:has(.tree_view_list li)').addClass('has_list');

    $('.show_list div').click(function () {
        $(this).parent().next('ul').toggleClass('open');
        $(this).parent().next().next('.ico').toggleClass('open');
    });

    $('.tree_view_list .item div').click(function () {
        $(this).parent().next('ul').toggleClass('open');
        $(this).parent().next().next().toggleClass('open');
    });

    $('.product_composition .add_btn').click(function () {
        $(this).hide().next('.add_btn_dif').show();
    });

    $('.product_composition .add_btn_dif .cancel_btn').click(function () {
        $(this).parent().parent('.add_btn_dif').hide().prev('.add_btn').show();
    });

    $('#messages_lnk a').click(function () {
        if ($(this).parent('#messages_lnk').is('.open')) {
            $(this).parent().removeClass('open');
            $(this).parent().children('#messagesBox').hide();
        } else {
            $('#messagesBox,#navigation #messages_lnk.open .top').each(function () {
                $(this).show();
                if (window.PIE && $.browser.msie) {
                    PIE.attach(this);
                }
                $(this).hide();
            });
            $(this).parent('#messages_lnk').addClass('open').children('#messagesBox').show();
        }
    });

    $('.popup_form .dropdown_select').live('click', function () {
            $('.popup_form .dropdown_select .selectbox_wrapper').jScrollPane({
                horizontalDragMinWidth: 9,
                horizontalDragMaxWidth: 9
            });
        });

    $('#messagesList li .delete').click(function () {
        $(this).parent().slideUp(100, function () {
            $(this).remove();
            var messages = $('#navigation #messages_lnk a sup');
            var messages_num = $(messages).text();
            $(messages).text(messages_num - 1);
            var messages_ch = $(messages).text();
            if (messages_ch < 1) {
                $(messages).text('');
            }
            checkMessages();
        });
    });

    var checkMessages = function () {
        if ($('#messagesList li').length) {
        } else {
            $('#messagesList').html('<li class="nomessages">Сообщений нет</li>');
        }
    };

    checkMessages();

    $('select').each(function () {
        if (!$(this).hasClass('noUniform')) {
            if (!$(this).hasClass('noSelect') & !$(this).hasClass('alrSelect')) {
                $(this).addClass('alrSelect');
                $(this).selectbox();
            }
        }
    });

    /*$('select').selectbox();*/

    $('select option').each(function (index, element) {
        var value = $(this).val();
        $(this).closest('select').siblings('.selectbox_wrapper').find('li').eq(index).data('value', value);
    });

    $('.inp_file input:file').uniform({
        fileBtnText: 'Вложить Техническое задание',
        fileDefaultText: ''
    });

    $('input:checkbox').not('.noUniform').uniform();

    $('.aj').click(function () {
        $('.dd_box').each(function () {
            if (window.PIE && $.browser.msie) {
                PIE.detach(this);
            }
            $(this).hide();
        });
        $('.scheme_name').removeClass('open');
        $(this).parent().toggleClass('open').children('.dd_box').each(function () {
            $(this).show();
            if (window.PIE && $.browser.msie) {
                PIE.attach(this);
            }
        });
        $('.zbag').removeClass('zbag');
        $(this).parent().parent().parent().parent().addClass('zbag');
    });

    $('.popup_window .close_btn').live('click', function () {
        $(this).parent().parent('.popup_bg').hide();
        $(this).parent().parent().parent('.popup_bg').hide();
    });

    $('#add_user, #add_category,#add_new_order ,#new_cat_lnk, #add_material, #add_categoryasu').click(function () {
        if ($(this).attr('id') == 'add_user') {
            $.post(baseUrl + "/user/add/", {}, function (data) {
                $("#itemBlock").html(data);
                $('select').selectbox();
                uploadAjax();
            });
        } else if ($(this).attr('id') == 'add_categoryasu') {
            $.post(baseUrl + "/category/addasu/", {}, function (data) {
                $("#itemBlock").html(data);
                $('select').selectbox();
                uploadAjax();
            });
        } else if ($(this).attr('id') == 'add_category') {
                $.post(baseUrl + "/category/add/", {}, function (data) {
                    $("#itemBlock").html(data);
                    $('select').selectbox();
                    uploadAjax();
                });
        } else if ($(this).attr('id') == 'add_material') {
            $.post(baseUrl + '/material/add/', {}, function (data) {
                $("#itemBlock").html(data);
                $('.myselect').selectbox();
                uploadAjax();
            });
        }
        $('.popup_bg').addClass('open');
    });

    $('#close_popup, #close_popup_inner').live('click', function () {

        $('.popup_bg').removeClass('open');
        return false;
    });

    $('.number_wrap .up_num').click(function () {
        var numberVal = $(this).next('input:text').val();
        numberVal = parseInt(numberVal);
        numberVal = numberVal + 1;
        $(this).next('input:text').val(numberVal);
    });

    $('.number_wrap .down_num').click(function () {
        var numberVal = $(this).prev('input:text').val();
        numberVal = parseInt(numberVal);
        numberVal = numberVal - 1;
        if (numberVal < 0) {
            numberVal = 0;
        }
        $(this).prev('input:text').val(numberVal);
    });

    $('.login_form .inp_text.dropdown  .ico').click(function () {
        $('.login_form .inp_text.dropdown .dropdown_wrapper').each(function () {
            $(this).show();
            if (window.PIE && $.browser.msie) {
                PIE.attach(this);
            }
        });
        $('.login_form .inp_text.dropdown .dropdown_wrapper').jScrollPane({
            horizontalDragMinWidth: 9,
            horizontalDragMaxWidth: 9
        });
        $('.login_form .inp_text.dropdown').toggleClass('show').children('.dropdown_wrapper').show();
    });

    $('.new_blank_form .inp_text.dropdown  .ico').click(function () {
        $('.new_blank_form .inp_text.dropdown .dropdown_wrapper').each(function () {
            $(this).show();
            if (window.PIE && $.browser.msie) {
                PIE.attach(this);
            }
        });
        $('.new_blank_form .dropdown_wrapper').jScrollPane({horizontalDragMinWidth: 9, horizontalDragMaxWidth: 9});
        $('.new_blank_form .inp_text.dropdown').toggleClass('show').children('.dropdown_wrapper').show();
    });

    $('.new_blank_form  .inp_text.dropdown ul li .del').live('click', function () {
        $.ajax({
            url: baseUrl + '/order/deleteCustomer/id/' + $(this).data('id'),
            type: 'POST'
        });
        $(this).parent().remove();
        $('.new_blank_form .dropdown_wrapper').jScrollPane({horizontalDragMinWidth: 9, horizontalDragMaxWidth: 9});
    });

    $('html').click(function () {
        $('.login_form .inp_text.dropdown,.new_blank_form .inp_text.dropdown').toggleClass('show').children('.dropdown_wrapper').show();
        $('.login_form .show,.new_blank_form .show').removeClass('show').children('.dropdown_wrapper').hide();
    });

    $('.login_form .inp_text.dropdown .dropdown_wrapper ul li').click(function () {
        $('.login_form .inp_text.dropdown input:text').val($(this).text());
        $('.login_form .inp_text.dropdown .dropdown_wrapper').hide();
    });

    $('.new_blank_form .inp_text.dropdown .dropdown_wrapper ul li .customer_name').click(function () {
        $('.new_blank_form .inp_text.dropdown input:text').val($(this).text());
        $('.new_blank_form .inp_text.dropdown .dropdown_wrapper').hide();
    });

    $('#noticesList li .delete').click( function () {
        $(this).parent().slideUp(100, function () {
            $(this).remove();
        });
    });

    $('#stickersList li .delete').click(function () {
        $(this).parent().slideUp(100, function () {
            $(this).remove();
        });
    });

    $('#add_sticker').click(function () {
        $(this).addClass('hidden');
        $('#newStickerBox').removeClass('hidden');
    });

    $('#cancelAddNewSticker').click(function () {
        $('#add_sticker').removeClass('hidden');
        $('#newStickerBox').addClass('hidden');
    });

    $('.q_title span').click(function () {
        $(this).parent().next().slideToggle();
    });

    $('.new_equipment_form_wrap input[type="text"]').live('click', function () {
        $('.new_equipment_form_wrap .selectbox_wrapper').jScrollPane();
    });

    $('.equipment_list_title_box .export_lnks_wrap ul li.first').click(function () {
        $(this).nextAll('li').toggle();
        return false;
    });

    find_max_deep();

    $(document).on("click", ".kit_name .minus", function (e) { //remove cell
        var record_count = $(this).closest('.kit_name').find('tr').length;
        var table = $(this).closest('.kit_name');
        var priceCell = $(table).parent().next().find('.item_selling_cost_uah');
        if (record_count > 1) {
            var price_cell_class = $(this).closest('tr').attr('id');
            $(this).closest('tr').remove();
            $('.' + price_cell_class).remove();
        }
        return false;
    });


    /*$(document).on("click", ".kit_name .plus", function (e) { //add cell
        var table = $(this).closest('.kit_name');
        var item_id = $(table).parent().parent().attr('id').substring(4);
        var count = randomString(); //$(table).find('tr').length + 1;
        var option_index = randomString();
        var stage = $('input[name="stage"]').val();
        var newCell = '<tr style="border-right:none; border-left:none; height:200px" class="reccell" id="cell' + count + '">';
        newCell += '<td id="num'+option_index+'" style="height:22px;vertical-align:middle;"><textarea class="newKomplectInput" style="box-sizing: border-box;padding: 4px;resize: vertical;width: 100%;" name="items[' + item_id + '][options][' + option_index + '][text]" ' + check_stage_field(stage, 'items_options_name') + ' ></textarea></td>';
        newCell += '<td width="24px" class="xl68">';
        newCell += '<div class="action">';
        newCell += '<span class="plus" ' + check_stage_field(stage, 'plus_minus_option') + '></span><span class="minus" ' + check_stage_field(stage, 'plus_minus_option') + '></span>';
        newCell += '</div>';
        newCell += '</td>';
        newCell += '</tr>';
        $(table).append(newCell); //$(newCell).insertAfter($(this).closest('tr'));

        var countCell = $(table).parent().next().find('.item_options_count');
        var newCell = '<tr style=" height:200px" class="cell' + count + '"><td id="count'+option_index+'" class="xl68" style="height:22px;vertical-align:middle;"><input type="text"  class="items_options_count" name="items[' + item_id + '][options][' + option_index + '][count]" value="" ' + check_stage_field(stage, 'items_options_name') + ' ></td></tr>';
        $(countCell).append(newCell);


        var priceCell = $(table).parent().next().next().find('.item_selling_cost_uah');
        var newCell = '<tr style=" height:200px" class="cell' + count + '"><td id="price'+option_index+'" class="xl68" style="height:22px;vertical-align:middle;"><input type="text"  class="items_options_price" name="items[' + item_id + '][options][' + option_index + '][price]" value="" ' + check_stage_field(stage, 'items_options_price') + ' ></td></tr>';
        $(priceCell).append(newCell);

        $(".newKomplectInput").autocomplete(baseUrl + '/kr/searchComponent/', {delay:autocompletedelay});
        //urovnenie();
        return false;
    });*/

    window.setTimeout(setBorder, 1000);
});

function removeRow(id) {
    var obj = $('#item' + id);
    var record_count = $(obj).closest('table').find('.recrow').length;
    if (record_count > 1) {
        $(obj).remove();
    } else {
        sendNotify('Удалить единственную строку нельзя!!!', 'warning');
    }
    $('#item-' + id).remove();
}


function removeKrItem(id) {
    var obj = $('#item' + id);
    var record_count = $(obj).closest('table').find('.recrow').length;
    if (record_count > 1) {
        if (window.confirm('Строка будет удалена сразу и безвозвратно. Вы уверены?')) {
            $.blockUI();
            $.get('/kr/deleteItem/id/' + id, function(data){
                data = $.parseJSON(data);
                if (data.success) {
                    sendNotify('Изделие успешно удалено', 'success');
                    $(obj).remove();
                } else {
                    sendNotify('Ошибка удаления:' + '<br>' + data.error, 'error');
                }
                $.unblockUI();
            })
        }
        //$(obj).remove();

    } else {
        sendNotify('Удалить единственную строку нельзя!!!', 'warning');
    }
    //$('#item-' + id).remove();
}

function krAddTz(obj) {
    obj.siblings('.inp_file:first').clone().insertAfter(obj.siblings('.inp_file:last')).show("slow").uniform({
        fileBtnText: 'Вложить Техническое задание',
        fileDefaultText: ''
    });
    return false;
}


/*function addRow(id) {
    var obj = $('#item' + id);
    var lastobj;
    var records_count = 1 * $('.recrow').length + 1;
    var new_num = 1 * records_count - 1;
    lastobj = $('#item' + new_num);
    var option_index = randomString();
    var stage = $('input[name="stage"]').val();

    var newRow = '<tr height="12" style="height:16px" class="xl68 recrow" id="item' + records_count + '">';
    newRow += '<td height="12" style="height:16px;border-top:none" class="xl94">' + records_count + '</td>';
    newRow += '<td style="" class="xl94" colspan="8">';
    newRow += '<textarea type="text"  rows="5" style="box-sizing: border-box;padding: 4px;resize: none;"' + check_stage_field(stage, 'items_name') + ' name="items[' + records_count + '][name]" class="newItemInput  ac_input" value="" autocomplete="off"></textarea>';
    newRow += '</td>';
    newRow += '<td style="border-top:none;" class="xl94">';
    newRow += '<select class="noUniform" style="width: 40px;"  name="items[' + records_count + '][class]"  ' + check_stage_field(stage, 'items_class') + '>';
    newRow += '<option value="L">L</option><option value="S" selected="">S</option><option value="P">P</option>';//<option value="ТЗ">ТЗ</option>';
    newRow += '</select>';
    newRow += '</td>';
    newRow += '<td style="border-top:none;" colspan="2" class="xl94">';
    newRow += '<table width="100%">';
    newRow += '<tr><td><div class="inc_box kr_tz_box" onblur="$(this).hide();">';
    newRow += '<div class="close_btn" style="" onclick="$(\'.inc_box\').hide();"></div>';
    newRow += '<a href="#" class="addTz" style="text-decoration: none; vertical-align: bottom" onclick="krAddTz($(this)); return false;">';
    newRow += '<span class="plus" style="width: 20px; height: 20px"></span>';
    newRow += '<span style="padding-top: 10px;vertical-align: middle">Добавить</span>';
    newRow += '</a>';
    newRow += '<div class="inp_file cl" style="display:none;">';
    newRow += '<input type="file" name="items_tz[' + records_count + '][]" size="20.5" value="Вложить Техническое задание" />';
    newRow += '<span class="ico"></span>';
    newRow += '</div>';
    newRow += '<div class="inp_file cl">';
    newRow += '<input type="file" name="items_tz[' + records_count + '][]" size="20.5" value="Вложить Техническое задание" />';
    newRow += '<span class="ico"></span>';
    newRow += '</div>';
    newRow += '</div>';
    newRow += '<label title="Добавить / заменить ТЗ" ';
    newRow += 'style="color: #000000; margin: auto; font-size: inherit" ';
    newRow += 'class="slb-upload_new ttl" onclick="$(\'.inc_box\').hide();$(this).closest(\'td\').find(\'.inc_box\').show();" >ТЗ</label>';
    newRow += '</td></tr>';
    newRow += '';
    newRow += '<tr><td></td></tr>';
    newRow += '<tr><td><label title="Добавить / заменить ОЛ" style="color: #000000; margin: auto; font-size: inherit" class="slb-upload_new ttl">ОЛ<input type="file" class="slb-upload-btn" data-buttonText="up" name="items_ol[' + records_count + ']"></label></td></tr>';
    newRow += '</table>';
    newRow += '</td>';
    newRow += '<td style="border-left:1px solid #d7d7d7;" class="xl94" colspan="4">';
    newRow += '<table width="100%" class="kit_name">';
    newRow += '<tr class="reccell" style="border-right:none; border-top: none;">';
    newRow += '<td id="num'+records_count+'" style="height:22px;vertical-align:middle; padding: 0px;">';
    newRow += '<textarea class="newKomplectInput" style="box-sizing: border-box;padding: 4px;resize: none;width: 315px;" rows="5" name="items[' + records_count + '][options][' + option_index + '][text]" ' + check_stage_field(stage, 'items_options_name') + ' ></textarea></td>';
    newRow += '<td class=xl68 width="24px">';
    newRow += '<div class="action">';
    newRow += '<span class="plus" ' + check_stage_field(stage, 'plus_minus_option') + '></span>';
    newRow += '<span class="minus" ' + check_stage_field(stage, 'plus_minus_option') + '></span>';
    newRow += '</div>';
    newRow += '</td>';
    newRow += '</tr>';
    newRow += '</table>';
    newRow += '</td>';

    newRow += '<td class="xl94" colspan="1">';
    newRow += '<table width="100%" height="100%" class="item_options_count">';
    newRow += '<tr>';
    newRow += '<td id="count'+records_count+'" class="xl68" height="50px" style="height:50px;vertical-align:middle;">';
    newRow += '<input type="text" class="items_options_count" name="items[' + records_count + '][options][' + option_index + '][count]" value="" ' + check_stage_field(stage, 'items_options_name') + ' >';
    newRow += '</td>';
    newRow += '</tr>';
    newRow += '</table>';
    newRow += '</td>';

    newRow += '<td class="xl94" colspan="2">';
    newRow += '<table width="100%" height="100%" class="item_selling_cost_uah">';
    newRow += '<tr>';
    newRow += '<td id="price'+records_count+'" class="xl68" height="50px" style="height:50px;vertical-align:middle;">';
    newRow += '<input type="text" class="items_options_price" name="items[' + records_count + '][options][' + option_index + '][price]" value="" ' + check_stage_field(stage, 'items_options_price') + ' >';
    newRow += '</td>';
    newRow += '</tr>';
    newRow += '</table>';
    newRow += '</td>';
    newRow += '<td  colspan="3" class="xl94">';
    newRow += '<input type="text" value="" class="item_cost" name="items[' + records_count + '][cost]" ' + check_stage_field(stage, 'items_cost') + ' >';
    newRow += '</td>';
    newRow += '<td  colspan="1" class="xl94">0.00</td>';
    newRow += '<td  class="xl94" colspan="2"></td>';
    newRow += '<td colspan="2" style="border-top:none;" class="xl94">';
    newRow += '<input type="number" value="" name="items[' + records_count + '][amount]" min="1" ' + check_stage_field(stage, 'items_amount') + ' >';
    newRow += '</td>';
    newRow += '<td colspan="3" class="xl230">0.00</td>';
    newRow += '<td colspan="1"  class="xl230">0.00</td>';
    newRow += '<td  class="xl94" colspan="2">0.00</td>';
    newRow += '<td style="border-top:none;" class="xl94">';
    newRow += '<input type="number" value="" name="items[' + records_count + '][margin]" min="0"' + check_stage_field(stage, 'items_margin') + ' >%';
    newRow += '</td>';
    newRow += '<td width="45" colspan="2" style="border-top:none;width:60px" class="xl88">';
    //newRow += '<input type="text" value="" class="item_expenses" name="items[' + records_count + '][expenses]"' + check_stage_field(stage, 'items_expenses') + ' >';
    newRow += '</td>';
    newRow += '<td class="xl68">';
    newRow += '</td>';
    newRow += '<td class="xl68">';
    newRow += '<div class=""><span onclick="addRow(' + records_count + ');" class="plus"></span><span onclick="removeRow(' + records_count + ');" class="minus"></span></div>';
    newRow += '</td>';
    newRow += '<td class="xl68"></td>';
    newRow += '</tr>';
    $(newRow).insertAfter($(obj));

    urovnenie();

    $('.inp_file > input:file').uniform({
        fileBtnText: 'Вложить Техническое задание',
        fileDefaultText: ''
    });

    $(".newItemInput").autocomplete('/order/searchComponent/', {delay:700, minLength:2});
    $(".newKomplectInput").autocomplete(baseUrl + '/kr/searchComponent/', {delay:autocompletedelay});

    $('select').each(function () {
        //if (!$(this).hasClass('noSelect') & !$(this).hasClass('alrSelect')) {
        //    $(this).addClass('alrSelect');
        //    $(this).selectbox();
        //}
    });

    $('.selectbox_wrapper').click(function (e) {
        var cnt = $(this).parent();
        var tgt = $(e.target);
        var sl = $(this).find('.selected');
        if (tgt.attr('id') === '_input_ТЗ') {
            cnt.find('.slb-upload').css('display', 'block');
        } else {
            cnt.find('.slb-upload').css('display', 'none');
            console.log('delete');
        }
    });
}*/

function find_max_deep() {
    var a = 0;
    var r = $('.deepValue').each(function () {
        if ($(this).val() > a) {
            a = $(this).val();
        }
    });

    $('.deepValue').each(function () {
        var deep = $(this).val();
        $(this).parent().css('marginRight', (a - deep - 1) * 40 + 70);
        $(this).parent().siblings('.componentContent').children('.miniInput').css('left', -(a - deep + 3) * 40 - 68 + "px");
    });
    if (a) {
        $('.scheme_list_title_wrap').css('marginLeft', a * 40 - 17 + "px");
    }
}

function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

function check_stage_field(stage, field) {
    var jqXHR = $.ajax({
        url: "/ajax/check_stage_field/stage/" + stage + "/field/" + field,
        type: 'GET',
        async: false
    });
    return jqXHR.responseText;
}



function dump(obj) {
    var out = "";
    if (obj && typeof (obj) == "object") {
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }
    } else {
        out = obj;
    }
}

$('.add_btn_dif, #ordersList li,.statement_table_wrap, #noticesList li, #ordersList li .warningMessage,.rc3, #navigation li.current a,#categoriesList li.current a,#stickersList li, .yellow_btn, .red_btn').each(function () {
    if (window.PIE && $.browser.ie) {
        PIE.attach(this);
    }
});

function setBorder() {
    if (/\print/.test(location.href)) {
        console.log('setborder');
        $('.xl188').attr('style', 'border: none;');
        $('.xl188').attr('style', 'border: 2px solid #000;');
        $('.xl188').attr('style', 'border: 2px solid #000; border-right: none;');
        setTimeout(function () {
            $('.xl188').attr('style', 'border: 2px solid #000; border-right: 2px solid #000;');
        }, 750);

        $('.xl188').css('transition', 'all 1s ease 0s');
        $('.xl188').css('border-bottom', '2px');
        $('.xl188').css('border-bottom', '2px solid');
        $('.xl188').css('border-bottom', '2px solid #000');
    }
}
// выравниваем ячейки наименования комплектующих и цены
function urovnenie() {
    var id = '';
    var h = 0;
    var h1 = 0;
    var h2 = 0;
    $('td[id^=num]').each(function (key, value) {
        //console.log(key + ": " + value)
        id = $(value).attr('id');
        id = id.substr(3, id.length - 3);
        h1 = parseInt($(value).css('height')) == NaN ? 0 : parseInt($(value).css('height'));
        h2 = parseInt($('#price' + id).css('height')) == NaN ? 0 : parseInt($('#price' + id).css('height'));
        h = ( h1 >= h2) ? h1 : h2;
        h = 200;
        $(value).css('padding', '0px');
        $(value).css('height', h + 'px');
        $('#price' + id).css('height', h + 'px');
        $('#price' + id).css('padding', '0px');
        $('#count' + id).css('height', h + 'px');
        $('#count' + id).css('padding', '0px');
        $('.cell' + id).css('height', h + 'px');
        $('.reccell').css('height', h + 'px');
        //console.log(h1 + " : " + h2 + " : " + h);
    });
}
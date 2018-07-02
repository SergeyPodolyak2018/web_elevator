//отображение статусов механизмов
function change(oll_mex_status) {
  console.log(globalObjectSatusOfUser.getUserStatus());
    var remont_maska= 16777216; //двадцать четвертый бит равен единице
    var norma_maska = 268435456; //двадцать восьмой бит равен единице
  // Получаем объект SVG
   var SVG = document.getElementById("nor").getSVGDocument();
    // Получаем эелемент (тег) в SVG файле


   // var url_string = "/status/";
   //     $.ajax({
   //         url: url_string,
   //         data: {},
   //         success: function( result ) {

            //var  oll_mex_status=JSON.parse(result);
                for(k in oll_mex_status){



                 var type=Number(oll_mex_status[k][0]);

                  //Статус нории
                 if (type==1){


                    var element = SVG.getElementsByClassName('nor'+k);
                    var element1 = SVG.getElementsByClassName('nor'+k+'manual');
                    var status = oll_mex_status[k][1];

                    if (element!=null){
                      if (status==0){
                        $(element).removeAttr("style");
                        $(element1).removeAttr("style");
                      }

                      if (status==1){
                        $(element).css('fill', '#FF0000');
                        $(element1).css('fill', '#FF0000');
                      }

                      if (status==2){
                        $(element).css('fill', '#008BE9');
                        $(element1).css('fill', '#008BE9');
                      }

                      if (status==3){
                        $(element).css('fill', '#00FFFF');
                        $(element1).css('fill', '#00FFFF');
                      }

                      if (status==4){
                        $(element).css('fill', '#FAC814');
                        $(element1).css('fill', '#FAC814');
                      }

                      if (status==5){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#00FF00');
                      }
                      if (status==6){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#FF0000');
                      }
                    }

                    $("body").on("contextmenu", false);
                    //var svgobject = document.getElementById('nor');
                    //if ('contentDocument' in svgobject){
                    //var svgdom = svgobject.contentDocument;
                    //var icon_norma=svgdom.getElementsByClassName('icon attention'+k);
                    //var icon_remont=svgdom.getElementsByClassName('icon remont'+k);
                    var icon_norma=SVG.getElementsByClassName('icon attention'+k);
                    var icon_remont=SVG.getElementsByClassName('icon remont'+k);

                    if ((oll_mex_status[k][2] & norma_maska)==0){
                        $(icon_norma).show();
                    }else{
                        $(icon_norma).hide(); 
                    }

                    if ((oll_mex_status[k][3] & remont_maska)>0){
                        $(icon_remont).show();
                    }else{
                        $(icon_remont).hide();
                    }

                    //}
                    //значение датчика тока
                    //$(SVG.getElementsByClassName('current'+k)).text(''+oll_mex_status[k][4]);
                   // $(SVG.getElementsByClassName('current'+k+'fon')).css('fill',''+oll_mex_status[k][5]);

                  }

                  //статус конвейера
                  if (type==2){

                      var element = SVG.getElementsByClassName('konv'+k);
                      var element1 = SVG.getElementsByClassName('konv'+k+'manual');
                      var status = oll_mex_status[k][1];
                      if (element!=null){

                      if (status==0){
                        $(element).removeAttr("style");
                        $(element1).removeAttr("style");
                      }

                      if (status==1){
                        $(element).css('fill', '#FF0000');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==2){
                        $(element).css('fill', '#008BE9');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==3){
                        $(element).css('fill', '#00FFFF');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==4){
                        $(element).css('fill', '#FAC814');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==5){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#C5C6C6');
                      }
                      if (status==6){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#FF0000');
                      }


                    }
                     //$("body").on("contextmenu", false);
                    //var svgobject = document.getElementById('nor');
                    //if ('contentDocument' in svgobject){
                    //var svgdom = svgobject.contentDocument;
                    var icon_norma=SVG.getElementsByClassName('icon attention'+k);
                    var icon_remont=SVG.getElementsByClassName('icon remont'+k);

                    if ((oll_mex_status[k][2] & norma_maska)==0){
                    $(icon_norma).show();
                    }else{
                    $(icon_norma).hide();
                    }
                    if ((oll_mex_status[k][3] & remont_maska)>0){
                    $(icon_remont).show();
                    }else{
                   $(icon_remont).hide();
                    }
                    //}
                    //значение датчика тока
                    //$(SVG.getElementsByClassName('current'+k)).text(''+oll_mex_status[k][4]);
                    //$(SVG.getElementsByClassName('current'+k+'fon')).css('fill',''+oll_mex_status[k][5]);

                  }

                  //статус сепаратора
                  if (type==17){

                      var element = SVG.getElementsByClassName('separator'+k);
                      var element1 = SVG.getElementsByClassName('separator'+k+'manual');
                      var status = oll_mex_status[k][1];
                      if (element!=null){

                      if (status==0){
                        $(element).removeAttr("style");
                        $(element1).removeAttr("style");
                        //$(element).css('fill', '#C5C6C6');
                        //$(element1).css('fill', '#C5C6C6');
                      }

                      if (status==1){
                        $(element).css('fill', '#FF0000');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==2){
                        $(element).css('fill', '#008BE9');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==3){
                        $(element).css('fill', '#00FFFF');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==4){
                        $(element).css('fill', '#FAC814');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==5){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#C5C6C6');
                      }
                      if (status==6){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#FF0000');
                      }


                    }
                     //$("body").on("contextmenu", false);
                    //var svgobject = document.getElementById('nor');
                    //if ('contentDocument' in svgobject){
                    //var svgdom = svgobject.contentDocument;
                    var icon_norma=SVG.getElementsByClassName('icon attention'+k);
                    var icon_remont=SVG.getElementsByClassName('icon remont'+k);

                    if ((oll_mex_status[k][2] & norma_maska)==0){
                    $(icon_norma).show();
                    }else{
                    $(icon_norma).hide();
                    }
                    if ((oll_mex_status[k][3] & remont_maska)>0){
                    $(icon_remont).show();
                    }else{
                   $(icon_remont).hide();
                    }
                    //}
                    //значение датчика тока
                    //$(SVG.getElementsByClassName('current'+k)).text(''+oll_mex_status[k][4]);
                    //$(SVG.getElementsByClassName('current'+k+'fon')).css('fill',''+oll_mex_status[k][5]);

                  }
                  //статус вентилятора
                  if (type==6){

                      var element = SVG.getElementsByClassName('vent'+k);
                      var element1 = SVG.getElementsByClassName('vent'+k+'manual');
                      var element2=SVG.getElementsByClassName('cyclone'+k);
                      var element3=SVG.getElementsByClassName('cyclone'+k+'manual');
                      var status = oll_mex_status[k][1];
                      if (element!=null){

                      if (status==0){
                        $(element).removeAttr("style");
                        $(element1).removeAttr("style");
                        $(element2).removeAttr("style");
                        $(element3).removeAttr("style");
                        //$(element).css('fill', '#C5C6C6');
                        //$(element1).css('fill', '#C5C6C6');
                        //$(element2).css('fill', '#C5C6C6');
                        //$(element3).css('fill', '#C5C6C6');
                      }

                      if (status==1){
                        $(element).css('fill', '#FF0000');
                        $(element1).css('fill', '#C5C6C6');
                        $(element2).css('fill', '#FF0000');
                        $(element3).css('fill', '#C5C6C6');
                      }

                      if (status==2){
                        $(element).css('fill', '#008BE9');
                        $(element1).css('fill', '#C5C6C6');
                        $(element2).css('fill', '#008BE9');
                        $(element3).css('fill', '#C5C6C6');
                      }

                      if (status==3){
                        $(element).css('fill', '#00FFFF');
                        $(element1).css('fill', '#C5C6C6');
                        $(element2).css('fill', '#00FFFF');
                        $(element3).css('fill', '#C5C6C6');
                      }

                      if (status==4){
                        $(element).css('fill', '#FAC814');
                        $(element1).css('fill', '#C5C6C6');
                         $(element2).css('fill', '#FAC814');
                        $(element3).css('fill', '#C5C6C6');
                      }

                      if ((status==5)){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#C5C6C6');
                        $(element2).css('fill', '#00FF00');
                        $(element3).css('fill', '#C5C6C6');
                      }
                      if ((status==6)){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#FF0000');
                        $(element2).css('fill', '#00FF00');
                        $(element3).css('fill', '#FF0000');
                      }



                    }
                     //$("body").on("contextmenu", false);
                    //var svgobject = document.getElementById('nor');
                   // if ('contentDocument' in svgobject){
                    //var svgdom = svgobject.contentDocument;
                    var icon_norma=SVG.getElementsByClassName('attention'+k);
                    var icon_remont=SVG.getElementsByClassName('remont'+k);

                    if ((oll_mex_status[k][2] & norma_maska)==0){
                    $(icon_norma).show();
                    }else{
                    $(icon_norma).hide();
                    }
                    if ((oll_mex_status[k][3] & remont_maska)>0){
                    $(icon_remont).show();
                    }else{
                   $(icon_remont).hide();
                    }
                    //}
                    //значение датчика тока
                   // $(SVG.getElementsByClassName('current'+k)).text(''+oll_mex_status[k][4]+' A');
                    //$(SVG.getElementsByClassName('current'+k+'fon')).css('fill',''+oll_mex_status[k][5]);

                  }
                  //статус ШЗ
                  if (type==18){

                      var element = SVG.getElementsByClassName('gate'+k);
                      var element1 = SVG.getElementsByClassName('gate'+k+'manual');
                      var status = oll_mex_status[k][1];
                      if (element!=null){

                      if (status==0){
                        $(element).removeAttr("style");
                        $(element1).removeAttr("style");
                       // $(element).css('fill', '#C5C6C6');
                        //$(element1).css('fill', '#C5C6C6');
                      }

                      if (status==1){
                        $(element).css('fill', '#FF0000');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==2){
                        $(element).css('fill', '#008BE9');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==3){
                        $(element).css('fill', '#00FFFF');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==4){
                        $(element).css('fill', '#FAC814');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if ((status==5)){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#C5C6C6');
                      }
                      if ((status==6)){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#FF0000');
                      }



                    }

                    var icon_norma=SVG.getElementsByClassName('attention'+k);
                    var icon_remont=SVG.getElementsByClassName('remont'+k);

                    if ((oll_mex_status[k][2] & norma_maska)==0){
                    $(icon_norma).show();
                    }else{
                    $(icon_norma).hide();
                    }
                    if ((oll_mex_status[k][3] & remont_maska)>0){
                    $(icon_remont).show();
                    }else{
                   $(icon_remont).hide();
                   // }
                    }
                    //значение датчика тока
                    //$(SVG.getElementsByClassName('current'+k)).text(''+oll_mex_status[k][4]+' A');
                    //$(SVG.getElementsByClassName('current'+k+'fon')).css('fill',''+oll_mex_status[k][5]);

                  }
                //Статус задвижки
                if (type==4 || type==27){

                      var element = SVG.getElementsByClassName('zadvijka'+k);
                      var status = oll_mex_status[k][1];
                      if (element!=null){
                        if (status==1){
                          $(element).css('fill', '#FF0000');//авария
                        }

                        if (status==2){
                          $(element).css('fill', '#008BE9');//ремонт
                        }

                        if (status==3){
                          $(element).css('fill', '#00FFFF');//маршруто
                        }
                        if (status==5){
                          //$(element).css('fill', '#E5E5E6'); //закрыто
                          $(element).removeAttr("style");//закрыто
                        }

                        if (status==6){
                          $(element).css('fill', '#00FF00');//открыто
                        }

                        if (status==7){
                          $(element).css('fill', '#FAC814');//среднее положение
                        }
                    }
                  }

                   //Статус задвижки group wiyh one inverter 
                    if (type==23){

                      var element = SVG.getElementsByClassName('zadvijkaGroup'+k);
                      var status = oll_mex_status[k][1];
                      if (element!=null){
                        if (status==1){
                          $(element).css('fill', '#FF0000');//авария
                        }

                        if (status==2){
                          $(element).css('fill', '#008BE9');//ремонт
                        }

                        if (status==3){
                          $(element).css('fill', '#00FFFF');//маршруто
                        }
                        if (status==5){
                          //$(element).css('fill', '#E5E5E6'); //закрыто
                          $(element).removeAttr("style");//закрыто
                        }

                        if (status==6){
                          $(element).css('fill', '#00FF00');//открыто
                        }

                        if (status==7){
                          $(element).css('fill', '#FAC814');//среднее положение
                        }
                      }
                    }
                  //Статус метки
                if (type==19){

                      var element = SVG.getElementsByClassName('enable'+k);
                      var status = oll_mex_status[k][1];
                      if (element!=null){
                        switch(status){
                          case 1:
                                $(element).css('fill', '#FF0000');//авария
                              break;                          
                          case 2 :
                                $(element).css('fill', '#008BE9');//ремонт
                              break;
                          case 3 :
                                $(element).css('fill', '#00FFFF');//маршруто
                              break;
                          case 4 :
                                $(element).css('fill', '#FFFF00');//желтый
                              break; 
                          case 5 :
                                $(element).css('fill', '#00FF00'); //зеленый
                              break; 
                          case 6 :
                                $(element).css('fill', '#ff00ff');//малиновый
                              break; 
                          
                          default:
                              //$(element).css('fill', '#C5C6C6');
                              $(element).removeAttr("style");
                              break; 
                        }
                      }
                  }
                  //Статус поворотной трубы
                  if (type==7){

                      var element = SVG.getElementsByClassName('tube'+k);
                      var element1=SVG.getElementsByClassName('tube'+k+'manual');
                      var status = oll_mex_status[k][1];
                      if (element!=null){


                      if (status==0){
                        $(element).removeAttr("style");
                        $(element1).removeAttr("style");
                        //$(element).css('fill', '#C5C6C6');
                        //$(element1).css('fill', '#C5C6C6');
                      }
                      if (status==1){
                        $(element).css('fill', '#FF0000');
                        $(element1).css('fill', '#C5C6C6');
                      }

                      if (status==2){
                        $(element).css('fill', '#008BE9');
                        $(element1).css('fill', '#C5C6C6');
                      }
                      if (status==3){
                        $(element).css('fill', '#00FFFF');
                        $(element1).css('fill', '#C5C6C6');
                      }
                      if ((status==5)){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#C5C6C6');
                      }
                      if ((status==6)){
                        $(element).css('fill', '#00FF00');
                        $(element1).css('fill', '#FF0000');
                      }
                        color_tube_position(k,oll_mex_status[k][2]);
                    }
                  }
                  //Статус силоса
                  if (type==14){
                   // console.log('xer')
                    //$(SVG.getElementsByClassName('kylt'+k)).text(''+oll_mex_status[k][4]);

                    var element = SVG.getElementsByClassName('silos'+k);
                    var element1 = SVG.getElementsByClassName('silos'+k+"mark_upper");
                    var element2 = SVG.getElementsByClassName('silos'+k+"mark_middle");
                    var element3 = SVG.getElementsByClassName('silos'+k+"mark_lower");
                    var status = oll_mex_status[k][1];
                    if (element!=null){
                       switch(status){
                          case 0:
                                $(element1).css('fill', 'none');
                                $(element2).css('fill', 'none');
                                $(element3).css('fill', 'none');
                              break;                          
                          case 2 :
                                $(element1).css('fill', '#0000FF');
                                $(element2).css('fill', 'none');
                                $(element3).css('fill', '#0000FF');
                              break;
                          case 5 :
                                $(element1).css('fill', '#FF0000');
                                $(element2).css('fill', 'none');
                                $(element3).css('fill', 'none');
                              break;
                          case 6 :
                                $(element1).css('fill', 'none');
                                $(element2).css('fill', 'none');
                                $(element3).css('fill', '#00FF00');
                              break;
                          case 7 :
                                $(element1).css('fill', '#FF0000');
                                $(element2).css('fill', 'none');
                                $(element3).css('fill', '#00FF00');
                              break;
                          case 8 :
                                $(element1).css('fill', 'none');
                                $(element2).css('fill', '#00FF00');
                                $(element3).css('fill', 'none');
                              break;
                          case 9 :
                                $(element1).css('fill', 'none');
                                $(element2).css('fill', '#00FF00');
                                $(element3).css('fill', '#00FF00');
                              break;
                          case 10 :
                                $(element1).css('fill', '#FF0000');
                                $(element2).css('fill', '#00FF00');
                                $(element3).css('fill', 'none');
                              break;
                          case 11 :
                                $(element1).css('fill', '#FF0000');
                                $(element2).css('fill', '#00FF00');
                                $(element3).css('fill', '#00FF00');
                              break;
                          case 12 :
                                $(element1).css('fill', '#0000FF');
                                $(element2).css('fill', 'none');
                                $(element3).css('fill', 'none');
                              break;
                          case 13 :
                                $(element1).css('fill', '#0000FF');
                                $(element2).css('fill', 'none');
                                $(element3).css('fill', '#00FF00');
                              break;
                          case 14 :
                                $(element1).css('fill', '#0000FF');
                                $(element2).css('fill', '#00FF00');
                                $(element3).css('fill', 'none');
                              break;
                          case 15 :
                                $(element1).css('fill', '#0000FF');
                                $(element2).css('fill', '#00FF00');
                                $(element3).css('fill', '#00FF00');
                              break;                          
                          default:                        
                              break; 
                    }

                    color_start_end_route(k,oll_mex_status[k][3]);
                  }
                }
                  

                //Картинка
                if (type==15){
                    //подсветка начала и конца
                    color_start_end_route(k,oll_mex_status[k][3]);                    
                }

                //Статус клапана
                if (type==3){

                      var element = SVG.getElementsByClassName('klapan'+k);
                      var status = oll_mex_status[k][1];
                      if (element!=null){

                      if (status==7){
                        var element1 = SVG.getElementsByClassName('klapan'+k+' left');
                        var element2 = SVG.getElementsByClassName('klapan'+k+' right');
                        $(element1).css('fill', 'yellow');
                        $(element2).css('fill', 'yellow');
                      }

                      if (status==1){
                        var element1 = SVG.getElementsByClassName('klapan'+k+' left');
                        var element2 = SVG.getElementsByClassName('klapan'+k+' right');
                        $(element1).css('fill', 'red');
                        $(element2).css('fill', 'red');
                      }

                      if (status==2){
                        var element1 = SVG.getElementsByClassName('klapan'+k+' left');
                        var element2 = SVG.getElementsByClassName('klapan'+k+' right');
                        $(element1).css('fill', '#008BE9');
                        $(element2).css('fill', '#008BE9');
                      }

                      if (status==3){
                        var element1 = SVG.getElementsByClassName('klapan'+k+' left');
                        var element2 = SVG.getElementsByClassName('klapan'+k+' right');
                        $(element1).css('fill', '#00FFFF');
                        $(element2).css('fill', '#00FFFF');

                      }

                      if (status==5){
                        var element1 = SVG.getElementsByClassName('klapan'+k+' left');
                        var element2 = SVG.getElementsByClassName('klapan'+k+' right');
                        $(element1).css('fill', '#00FF00');//зеленый
                        $(element2).css('fill', '#E5E5E6');//серый
                      }

                      if (status==6){
                        var element1 = SVG.getElementsByClassName('klapan'+k+' left');
                        var element2 = SVG.getElementsByClassName('klapan'+k+' right');
                        $(element1).css('fill', '#E5E5E6');//серый
                        $(element2).css('fill', '#00FF00');//зеленый
                      }


                    }
                  }
//Статус парной задвижки
                    if (type==5){

                      var element = SVG.getElementsByClassName('Pzadvijka'+k);
                      var status = oll_mex_status[k][1];
                      if (element!=null){

                        if (status==7){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', 'yellow');
                          $(element2).css('fill', 'yellow');
                        }

                        if (status==1){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', 'red');
                          $(element2).css('fill', 'red');
                        }

                        if (status==2){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', '#008BE9');
                          $(element2).css('fill', '#008BE9');
                        }

                        if (status==3){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', '#00FFFF');
                          $(element2).css('fill', '#00FFFF');

                        }

                        if (status==5){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).removeAttr("style");//закрыто
                          $(element2).removeAttr("style");//закрыто
                          /*$(element1).css('fill', '#E5E5E6');//серый
                          $(element2).css('fill', '#E5E5E6');//серый*/
                        }

                        if (status==6){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', '#00FF00');//зеленый
                          $(element2).css('fill', '#00FF00');//зеленый
                        }
                        
                        if (status==8){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', '#00FF00');//зеленый
                          $(element2).removeAttr("style");//закрыто
                          //$(element2).css('fill', '#E5E5E6');//серый
                        }
                        if (status==9){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', 'yellow');//желт
                          $(element2).css('fill', '#00FF00');//зеленый
                        }
                        if (status==10){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).removeAttr("style");//закрыто
                          //$(element1).css('fill', '#E5E5E6');//серый
                          $(element2).css('fill', '#00FF00');//зеленый
                        }
                        if (status==11){
                          var element1 = SVG.getElementsByClassName('Pzadvijka'+k+' left');
                          var element2 = SVG.getElementsByClassName('Pzadvijka'+k+' right');
                          $(element1).css('fill', '#00FF00');//
                          $(element2).css('fill', 'yellow');//
                        }
                      }
                    }
                  }
                
                //console.log('Звонок состояние= '+oll_mex_status.bell);
                if(oll_mex_status.bell >0){



                    if(oll_mex_status.bell ==1){
                        header_menu.hide_button(ring_grey);
                        header_menu.hide_button(ring_blue);
                        header_menu.hide_button(ring_flash);
                        header_menu.show_button(ring_green);
                        stopPlaySound();

                    }
                    if(oll_mex_status.bell ==2){
                        header_menu.hide_button(ring_grey);
                        header_menu.hide_button(ring_blue);
                        header_menu.hide_button(ring_green);
                        header_menu.show_button(ring_flash);
                        startPlaySound();

                    }

                    if(oll_mex_status.bell ==4){
                        header_menu.hide_button(ring_grey);
                        header_menu.hide_button(ring_flash);
                        header_menu.hide_button(ring_green);
                        header_menu.show_button(ring_blue);
                        stopPlaySound();
                    }


                }else{
                    if(oll_mex_status.bell==0){                            
                          header_menu.hide_button(ring_blue);
                          header_menu.hide_button(ring_flash);
                          header_menu.hide_button(ring_green);
                          header_menu.show_button(ring_grey);
                          stopPlaySound();
                      }
                }

                $("#Timer").text(oll_mex_status.timer);
                $("#Date").text(oll_mex_status.date);
                $("#Time").text(oll_mex_status.time);
                //$("#footer_help").text(oll_mex_status.help); 
                $("#footer_message").text(oll_mex_status.message);
                $("#footer_login").text(oll_mex_status.login);

                switch(oll_mex_status.control){
                    case 1:$("#footer_control").text('Наладка');
                        break;
                    case 2 :$("#footer_control").text('Управление');
                        break;
                    case 3 :$("#footer_control").text('Просмотр');
                        break;
                    default:
                        //console.log( 'Мы надеемся, что и в вашем браузере все ок!' );
                        break;
                }
                 switch(oll_mex_status.plc){
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
                            open_plc_alarm();
                        break;
                    default:
                        //$("#footer_plc_status").css('background-color','grey');
                        break;
                }

                //Окно текущих аварий
                if (oll_mex_status.alarm > 0 && globalObjectSatusOfUser.getUserStatus!=3){

                     let logotip_object = document.getElementById('logotip');
                     let logotip_object_content = logotip_object.contentDocument;
                     let logotip_object_content_line=logotip_object_content.getElementsByClassName('logotip');
                     $(logotip_object_content_line).css('fill', 'red');
                    alarm();
                }else{
                    if (oll_mex_status.alarm == 0){
                        let logotip_object = document.getElementById('logotip');
                        let logotip_object_content = logotip_object.contentDocument;
                        let logotip_object_content_line=logotip_object_content.getElementsByClassName('logotip');
                        $(logotip_object_content_line).css('fill', '#FFED00');

                    }
                }
                if(oll_mex_status.update > 0){
                  alert("Под вашим логином произведен вход!\n\r Страница будет перезагружена.");
                  location.reload(true);
                }

      }

//функция подсветки линий

    function linck(oll_linck_status) {


                 link_global_object.each(function(){

                    //Получить массив имен разделенных пробелом
                    var line_name = this.className.baseVal;

                    var lincks_split =line_name.split(' ');
                    var temp_arrey=[];

                    function checker1(item){return item==1;};
                    function checker2(item){return item==2;};
                    function checker3(item){return item==3;};
                    function checker4(item){return item==4;};
                    function checker5(item){return item==5;};
                    function checker6(item){return item==6;};
                    function checker7(item){return item==7;};

                    for (let i = 1; i < lincks_split.length; i++) {
                        if(lincks_split[i].match(/-*[a-z]+/)=='line'){//проверка что это линия
                            let indeks_link = parseInt(lincks_split[i].match(/-*[0-9]+/)); //выбрать из имени интовое значение
                            temp_arrey.push(oll_linck_status[indeks_link]);
                        }
                      }
                    if (temp_arrey.some(checker1)){
                         this.style.stroke='#00ffff';
                          return true;
                        }
                    if (temp_arrey.some(checker2)) {
                      this.style.stroke='#ffcc00';//желтый
                      return true;
                      }
                    if (temp_arrey.some(checker3)) {
                      //$(this).css('stroke','#00dc00');//зеленый
                      this.style.stroke='#00dc00';//зеленый
                      return true;
                      }
                    if (temp_arrey.some(checker4)) {
                      this.style.stroke='#ff00ff';//малиновый
                      return true;
                      }
                    if (temp_arrey.some(checker5)) {
                      this.style.stroke='#ff0000';//красный
                      return true;
                     }
                    if (temp_arrey.some(checker6)) {
                      //this.style.stroke='#000000';//черный
                      this.style.stroke='#ffffff';//белый
                      return true;
                      }
                    if (temp_arrey.some(checker7)) {
                      this.style.stroke='#0000ff';//синий
                      return true;
                      }
                    //this.style.stroke='#c0c0c0';//серый
                    this.style.stroke='#7b7b7b';//серый
                    //$(element).removeAttr("style");

                    //this.style.stroke='#000000';//черный
                })
    }

//Расстановка значений аналоговых датчиков тип окошка равен значению ключа
//current- токи
//analog_dat - аналоговые датчики
//encoder - энкодеры
function analog_status(analog){
    var SVG = document.getElementById("nor").getSVGDocument();
    
    for (let i in analog){          

          let tempElement=$(SVG.getElementsByClassName(''+i));
          if (analog[i].value=='0 А' || analog[i].value=='*'){
            $(tempElement).removeAttr("style");
          }else{
            $(tempElement).css('fill','black');
          }
          $(tempElement).text(''+analog[i].value);
         
          $(SVG.getElementsByClassName(''+i+'fon')).css('fill',''+analog[i].status);
    }

}
function kylt_status(kylt){
    var SVG = document.getElementById("nor").getSVGDocument();
    for (let i in kylt){
            $(SVG.getElementsByClassName(''+i)).text(''+kylt[i]);
        }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Функция подсветки начала конца маршрута
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function color_start_end_route(index,status){
    var mask_start=1048576;
    var mask_end=8388608;
    var mask_error=33554432;
    var SVG = document.getElementById("nor").getSVGDocument();
    var element = SVG.getElementsByClassName('textsourcereceiver'+k);
    if (element.length>0){
        if ((status & mask_start)>0 & (status & mask_error)>0){
            element[0].style.fill='#ff0000';//красный
        }else{
            if ((status & mask_start)>0 & (status & mask_end)==0){
                element[0].style.fill='#00FF00';//зеленый
            }else{
                if ((status & mask_start)==0 & (status & mask_end)>0){
                    element[0].style.fill='#FF80FF';//розовый
                }else{
                    if ((status & mask_start)>0 & (status & mask_end)>0){
                        element[0].style.fill='#FFFF00';//желтый
                    }else{
                        //element[0].style.fill='#dadada';//белый
                        //element[0].style.fill='none';//белый
                        element[0].removeAttribute("style");
                    }
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function color_tube_position(index,status){
    var mask_pos=[1,2,4,8,16,32,64,128,256,512];
    var SVG = document.getElementById("nor").getSVGDocument();
    var element;
    for(let i in mask_pos){
        let pos=parseInt(i)+1;
        let string1='tube'+index+'pos'+pos;
        element=SVG.getElementsByClassName(string1);
        if((status & mask_pos[i])>0){
            if (element.length>0){
                element[0].style.fill='#00FF00';//зеленый
            }
        }else{
            if (element.length>0){
                element[0].style.fill='#FFFFFF';//wight
            }
        }
    }
}
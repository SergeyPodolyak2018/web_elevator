// Получить сообщение из основного потока 
onmessage = function(event) {
get_status(event.data); //Передать в функцию получения статуса предыдущие результаты
}

//Получение статуса от сервера
  function get_status(privius) {
    var new_object={};
    var x = new XMLHttpRequest();
    x.open("GET", "/status_analog/", true);
    //Обработка статусов
    x.onload = function (){
        var a=x.responseText;
        var b=JSON.parse(a); //
        for(let i in b){
            if(i in privius){

               if(b[i].value!=privius[i].value | b[i].status!=privius[i].status){  //сравнение двух объектов
                        new_object[i]=b[i];
               }
            }else{
                new_object[i]=b[i]; //если нет свойства добавить его (это для перевого вызова)
               }
        }
        postMessage(new_object);
    }
        x.timeout = 3000;
        x.send(null);
    }
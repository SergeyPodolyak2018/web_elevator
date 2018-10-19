// Получить сообщение из основного потока 
onmessage = function(event) {
    get_status(event.data[0],event.data[1]); //Передать в функцию получения статуса предыдущие результаты
}

//Получение статуса от сервера
  function get_status(privius,newData) {
    var new_object={};
    var b=newData; //
    for(let i in b){
        if(i in privius){
           if(b[i].toString()!=privius[i].toString()){//сравнение двух массивов тупым методом
                    new_object[i]=b[i];
           }
        }else{
            new_object[i]=b[i]; //если нет свойства добавить его (это для перевого вызова)
        }
    }
    postMessage(new_object);
    
}
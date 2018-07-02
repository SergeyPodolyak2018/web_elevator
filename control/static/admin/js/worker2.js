// Получить сообщение из основного потока 
onmessage = function(event) {

var result=get_link();
//console.log(result);
//postMessage(result);
}


  function get_link() {
    
    var x = new XMLHttpRequest();
    x.open("GET", "/link/", true);
    x.onload = function (){
    var a=x.responseText;
    var b=JSON.parse(a);
    postMessage(b);
    //return b;
    }
    x.timeout = 3000;
    x.send(null);
    }
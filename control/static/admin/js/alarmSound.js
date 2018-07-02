
var global_variable_to_play_alarm_sound=0;


function playSound(){
	console.log("playSound start");
	var audio = new Audio(); // Создаём новый элемент Audio
  	audio.src = '/static/admin/audio/beep.mp3'; // Указываем путь к звуку "клика"
  	audio.autoplay = true; // Автоматически запускаем
  }

  function startPlaySound(){
  	global_variable_to_play_alarm_sound=setInterval(function() { playSound() }, 1000);
  }
  
  function stopPlaySound(){
  	//закончить циклический запрос
    clearInterval(global_variable_to_play_alarm_sound);
  }
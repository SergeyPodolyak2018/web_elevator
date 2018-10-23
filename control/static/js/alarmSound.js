
var global_variable_to_play_alarm_sound;
var global_variable_to_play_alarm_plc_sound;

function playSound(){
	var audio = new Audio(); // Создаём новый элемент Audio
  	audio.src = '/static/audio/beep.mp3'; // Указываем путь к звуку "клика"
  	audio.autoplay = true; // Автоматически запускаем
  }

  function startPlaySound(){
  	global_variable_to_play_alarm_sound=setInterval(function() {
      playSound() }, 1000);
  }
  
  function stopPlaySound(){
  	//закончить циклический запрос
    clearInterval(global_variable_to_play_alarm_sound);
  }


  function playSound_plc(){
  var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '/static/audio/beep.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  function startPlaySound_plc(){
    global_variable_to_play_alarm_plc_sound=setInterval(function() {
      playSound_plc() }, 1000);
  }
  
  function stopPlaySound_plc(){
    //закончить циклический запрос
    clearInterval(global_variable_to_play_alarm_plc_sound);
  }
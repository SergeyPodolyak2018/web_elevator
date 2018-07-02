
    /*  Constants: */
    var leftArrow   = 37;	// The numeric code for the left arrow key.
    var upArrow     = 38;
    var rightArrow	= 39;
    var downArrow   = 40;
    var panRate     = 500;	// Number of pixels to pan per key press.
    var zoomRate    = 1.05;	// Must be greater than 1. Increase this value for faster zooming (i.e., less granularity).
    var priviusMauseKoordinatX=0;
    var priviusMauseKoordinatY=0;
    var priviusTouchKoordinatX=0;
    var priviusTouchKoordinatY=0;
    var priviusDistanseX=0;
    var koef=100;
    /* Globals: */
    var theSvgElement;

    function processKeyPress(evt)
    {
      var viewBox = theSvgElement.getAttribute('viewBox');	// Grab the object representing the SVG element's viewBox attribute.
      var viewBoxValues = viewBox.split(' ');				// Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).

      viewBoxValues[0] = parseFloat(viewBoxValues[0]);		// Convert string "numeric" values to actual numeric values.
      viewBoxValues[1] = parseFloat(viewBoxValues[1]);

      switch (evt.keyCode)
      {
        case leftArrow:
          viewBoxValues[0] -= panRate;	// Decrease the x-coordinate value of the viewBox attribute to pan left.
          break;
        case rightArrow:
          viewBoxValues[0] += panRate;	// Increase the x-coordinate value of the viewBox attribute to pan right.
          break;
        case upArrow:
          viewBoxValues[1] -= panRate;	// Decrease the y-coordinate value of the viewBox attribute to pan up.
          break;
        case downArrow:

          viewBoxValues[1] += panRate;	// Increase the y-coordinate value of the viewBox attribute to pan down.
          break;
      } // switch

      theSvgElement.setAttribute('viewBox', viewBoxValues.join(' '));	// Convert the viewBoxValues array into a string with a white space character between the given values.
    }

    function zoom(zoomType)
    {
      var viewBox = theSvgElement.getAttribute('viewBox');	// Grab the object representing the SVG element's viewBox attribute.
      var viewBoxValues = viewBox.split(' ');				// Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).

      viewBoxValues[2] = parseFloat(viewBoxValues[2]);		// Convert string "numeric" values to actual numeric values.
      viewBoxValues[3] = parseFloat(viewBoxValues[3]);

      if (zoomType == 'zoomIn')
      {
        viewBoxValues[2] /= zoomRate;	// Decrease the width and height attributes of the viewBox attribute to zoom in.
        viewBoxValues[3] /= zoomRate;
        koef=koef*0.90;
      }
      else if (zoomType == 'zoomOut')
      {
        viewBoxValues[2] *= zoomRate;	// Increase the width and height attributes of the viewBox attribute to zoom out.
        viewBoxValues[3] *= zoomRate;
        koef=koef*1.1;
      }
      else
        alert("function zoom(zoomType) given invalid zoomType parameter.");

      theSvgElement.setAttribute('viewBox', viewBoxValues.join(' '));	// Convert the viewBoxValues array into a string with a white space character between the given values.
    }

    function zoomViaMouseWheel(mouseWheelEvent)
    {
      console.log('her');
      if (mouseWheelEvent.wheelDelta > 0)
        zoom('zoomIn');
      else
        zoom('zoomOut');

      /* When the mouse is over the webpage, don't let the mouse wheel scroll the entire webpage: */
      mouseWheelEvent.cancelBubble = true;
      return false;
    }

    function initialize(){

      let theSvgDocument = document.getElementById('nor').getSVGDocument(); // Not all browsers current support the getSVGDocument() method (as described in the W3C SVG spec).
      theSvgElement = theSvgDocument.documentElement;

      if ('ontouchstart' in window) { 

        inicializePlazMinuz();

        theSvgElement.addEventListener("touchmove", function(e){
        if(e.changedTouches.length==2){
           if(priviusTouchKoordinatX==0 & priviusTouchKoordinatY==0){
              priviusTouchKoordinatX=e.changedTouches[0].clientX;
              priviusTouchKoordinatY=e.changedTouches[0].clientY;
            }
           let deltaX=e.changedTouches[0].clientX-priviusTouchKoordinatX;
           let deltaY=e.changedTouches[0].clientY-priviusTouchKoordinatY;        
                                  
           priviusTouchKoordinatX=e.changedTouches[0].clientX;
           priviusTouchKoordinatY=e.changedTouches[0].clientY;
           console.log('x='+deltaX+'  y='+deltaY);
           mouseMuvSvg(deltaX,deltaY);
        } }, false);

        theSvgElement.addEventListener('touchend', touchendF, false);
      }else{
        console.log('pesda');
        document.getElementById('zoomInOut').style.display='none';    
      }
      
      /* Add event listeners: */      
      function inicializePlazMinuz(){
        let SVGdokumentPlaz = document.getElementById("zoomIn_svg").getSVGDocument();
        let SVGdokumentMinuz = document.getElementById("zoomOut_svg").getSVGDocument();
        let  theSvgElementPlaz = SVGdokumentPlaz.documentElement;   
        let  theSvgElementMinuz = SVGdokumentMinuz.documentElement;   
        theSvgElementPlaz.addEventListener("touchstart", function(){console.log('her123'); zoom('zoomIn'); mouseMuvSvg(-7,-7);},false);
        theSvgElementMinuz.addEventListener("touchstart", function(){console.log('her124'); zoom('zoomOut');mouseMuvSvg(+7,+7);},false);
        
      }
      // Sets a global variable. Best to only access the SVG element after the page has fully loaded.

      theSvgElement.addEventListener('keydown', processKeyPress, true);			// This is required in case the user presses an arrow key inside of the object element's "window".
      theSvgElement.addEventListener('mousewheel', zoomViaMouseWheel, false);	// This is required in case the user rotates the mouse wheel inside of the object element's "window".
     
      //window.addEventListener('touchmove', HeroviyHer, false);
      theSvgElement.addEventListener('mousedown', mousedownF, false);
      theSvgElement.addEventListener('mouseup', mouseupF, false); 

        
    }

    //Скрол мыши
      function mousedownF(){
        this.addEventListener('mousemove', mousemuveF, false);
      }
      function mouseupF(){
        this.removeEventListener('mousemove', mousemuveF);
        this.style.cursor="default";//курсор мыши дэфолт
        priviusMauseKoordinatX=0;
        priviusMauseKoordinatY=0;
      }
      //Конец перемещения
      function touchendF(){
        console.log('asdasdfasdfasdfsdfasdfasdfas');
        priviusTouchKoordinatX=0;
        priviusTouchKoordinatY=0;
        priviusDistanseX=0;
      }
//Общая функция перемещения мыщью
      function mousemuveF(e){
        if(e.ctrlKey){
           theSvgElement.style.cursor="move";
          if(priviusMauseKoordinatX==0 & priviusMauseKoordinatY==0){
            priviusMauseKoordinatX=e.clientX;
            priviusMauseKoordinatY=e.clientY;
          }
              let deltaX=e.clientX-priviusMauseKoordinatX;
               let deltaY=e.clientY-priviusMauseKoordinatY;        
                
                priviusMauseKoordinatX=e.clientX;
                priviusMauseKoordinatY=e.clientY;

                mouseMuvSvg(deltaX,deltaY);
          }
      }

//Перемещение самого свгешника
      function mouseMuvSvg(deltaX,deltaY)
    {
      var viewBox = theSvgElement.getAttribute('viewBox');  // Grab the object representing the SVG element's viewBox attribute.
      var viewBoxValues = viewBox.split(' ');       // Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).
      
      viewBoxValues[0] = parseFloat(viewBoxValues[0]);    // Convert string "numeric" values to actual numeric values.
      viewBoxValues[1] = parseFloat(viewBoxValues[1]);
      //viewBoxValues[0] -= (deltaX*100);
      //viewBoxValues[1] -= (deltaY*100);  
      viewBoxValues[0] -= (deltaX*koef);
      viewBoxValues[1] -= (deltaY*koef);     
      

      theSvgElement.setAttribute('viewBox', viewBoxValues.join(' ')); // Convert the viewBoxValues array into a string with a white space character between the given values.
    }
    //$(window).scroll(function(){zoomViaMouseWheel()});


    function HeroviyHer(e){
      console.log(e);
    }

    /*  Constants: */
    var leftArrow   = 37;	// The numeric code for the left arrow key.
    var upArrow     = 38;
    var rightArrow	= 39;
    var downArrow   = 40;
    var panRate     = 500;	// Number of pixels to pan per key press.
    var zoomRate    = 1.1;	// Must be greater than 1. Increase this value for faster zooming (i.e., less granularity).

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
      }
      else if (zoomType == 'zoomOut')
      {
        viewBoxValues[2] *= zoomRate;	// Increase the width and height attributes of the viewBox attribute to zoom out.
        viewBoxValues[3] *= zoomRate;
      }
      else
        alert("function zoom(zoomType) given invalid zoomType parameter.");

      theSvgElement.setAttribute('viewBox', viewBoxValues.join(' '));	// Convert the viewBoxValues array into a string with a white space character between the given values.
    }

    function zoomViaMouseWheel(mouseWheelEvent)
    {
      if (mouseWheelEvent.wheelDelta > 0)
        zoom('zoomIn');
      else
        zoom('zoomOut');

      /* When the mouse is over the webpage, don't let the mouse wheel scroll the entire webpage: */
      mouseWheelEvent.cancelBubble = true;
      return false;
    }

    function initialize()
    {
      /* Add event listeners: */
      //window.addEventListener('keydown', processKeyPress, true);		// OK to let the keydown event bubble.
      //window.addEventListener('mousewheel', zoomViaMouseWheel, false);	// This is required in case the user rotates the mouse wheel outside of the object element's "window".

      var theSvgDocument = document.getElementById('nor').getSVGDocument();	// Not all browsers current support the getSVGDocument() method (as described in the W3C SVG spec).
      theSvgElement = theSvgDocument.documentElement;    								// Sets a global variable. Best to only access the SVG element after the page has fully loaded.

      theSvgElement.addEventListener('keydown', processKeyPress, true);			// This is required in case the user presses an arrow key inside of the object element's "window".
      theSvgElement.addEventListener('mousewheel', zoomViaMouseWheel, false);	// This is required in case the user rotates the mouse wheel inside of the object element's "window".


      theSvgElement.addEventListener('mousedown', mousedownF, false);
      theSvgElement.addEventListener('mouseup', mouseupF, false);


      /* If desired, one can set the initial size and position of the embedded SVG graphic here: */
      //Kutsovka
      theSvgElement.setAttribute('viewBox', 0 + " " + 0 + " " + 138718 + " " + 69359);	// The original width and height of this particular SVG graphic is 3816 and 612, respectively.

    }


      function mousedownF(){
        this.addEventListener('mousemove', mousemuveF, false);
      }
      function mouseupF(){
        this.removeEventListener('mousemove', mousemuveF);
      }

      function mousemuveF(e){
        if(e.ctrlKey){
                          
                console.log(e.clientX);
                console.log(e.clientY);
          }
      }
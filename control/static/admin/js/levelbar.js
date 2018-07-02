

function clic_on_level(){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;


	 var a=$((svgdom.getElementsByClassName("level1"))).attr('height');
	 //alert(a);
     $(svgdom.getElementsByClassName("level1")).attr('height',(parseInt(a)-100));


     a=$((svgdom.getElementsByClassName("level2"))).attr('height');
     //alert(a);
     $(svgdom.getElementsByClassName("level2")).attr('height',(parseInt(a)-100));

     //$(svgdom.getElementsByClassName("text")).text('Размер'+a);

}

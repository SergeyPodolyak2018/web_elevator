//Main parent class for all devices

class Mechanism{
	constructor(id,name,node){
    	this._nodSvg=node;
    	this._name = name;
		this._id=id;
    	this._select=node.getElementsByClassName('select')[0];
    	this._setName();
  	}
	// _setId(){
		
	// 	this._setName();
	// }
	_setName(){		
		this._nameShort=menu_header_text[this._id].shortName;
		this._nameLong=menu_header_text[this._id].longName;
		this._setHover();

	}
	_setSelect(){

	}
	_setSettings(){

	}
	_setHover(){
		console.log('расстановка событий');
		this._nodSvg.addEventListener("mouseover", function( event ) {
			console.log('мыш внутри');
			console.log(this);
	    	this._select.style.cssText='stroke-width: 100px; stroke:#f5ed00';
	    	title_svg.innerHTML=this._nameLong;
		    // setTimeout(function() {
		    //   event.target.style.color = "";
		    // }, 500);
	  	}.bind(this), false);

		this._nodSvg.addEventListener("mouseout", function( event ) {
			console.log('мыш вышла');
			this._select.removeAttribute("style");
			title_svg.innerHTML='';
			// setTimeout(function() {
			//   event.target.style.color = "";
			// }, 500);
		}.bind(this), false);


	}
	_setClick(){

	}

		



}
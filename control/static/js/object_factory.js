//Main parent class for all devices

class Mechanism{
	constructor(id,name,node){
    	this._nodSvg=node;
    	this._name = name;
		this._id=id;
    	this._select=node.getElementsByClassName('select');
    	this._setName();
  	}
	
	_setName(){		
		this._nameShort=menu_header_text[this._id].shortName;
		this._nameLong=menu_header_text[this._id].longName;
		this._setHover();
		this._setClick();
		this._setClickContext();

	}
	
	_setHover(){
		this._nodSvg.addEventListener("mouseover", function( event ) {
			[...this._select].forEach(function(item, i, arr) {
				item.style.cssText='stroke-width: 100px; stroke:#f5ed00';
			});
	    	title_svg.innerHTML=this._nameLong;
	  	}.bind(this), false);

		this._nodSvg.addEventListener("mouseout", function( event ) {
			[...this._select].forEach(function(item, i, arr) {
				item.removeAttribute("style");
			});
			title_svg.innerHTML='';
		}.bind(this), false);
	}
	_setClick(){
		this._nodSvg.addEventListener("click", function( event ) {
	    	nameDeviceFooter.innerText=this._nameLong;
	    	indexDeviceFooter.innerText=this._id;
	  	}.bind(this), false);
	}

	_setClickContext(){
		this._nodSvg.addEventListener("contextmenu", function( event ) {
			nameDeviceFooter.innerText=this._nameLong;
	    	indexDeviceFooter.innerText=this._id;
	    	menu_kreator(this._id,this._nameShort,event.clientX,event.clientY);
	  	}.bind(this), false);
	}
}
Mechanism.prototype.getsettings = settings_get;
Mechanism.prototype.open_settings  = settings_open;
Mechanism.prototype.close_settings = settings_close;
Mechanism.prototype.save_settings  = settings_save;


class Noriya extends Mechanism{
	constructor(id,name,node){
    	super(id,name,node);
    	this._setSettingsWindow();
  	}
  	_setSettingsWindow(){
  		this.settingsWindow=document.getElementById('settings_noriya').cloneNode(true);
  		prepareForm(this._settingsWindow);
  	}
}

// Noriya.prototype.getsettings = settings_get;
// Noriya.prototype.open_settings  = settings_open;
// Noriya.prototype.close_settings = settings_close;
// Noriya.prototype.save_settings  = settings_save;



// main_object_with_mechanisms[1]['getsettings']();
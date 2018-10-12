// function createDivForeManagmentDevices(){
//     var divManageElement;
//     var headerText;
//     var bodyWithButtons;

//     createElements();

//    this.show=function(left,top){
//         if (divManageElement.style.display!='block') {
//                 if(top>600){
//                     top=600;                    
//                 }                
//                 divManageElement.style.left=''+left+'px';
//                 divManageElement.style.top=''+top+'px';
//                 divManageElement.style.display='block';
//             }   
//     };

//     this.hide=function(){
//         if (divManageElement.style.display!='none') {
//                 divManageElement.style.display='none';
//         }        
//     };

//     this.insertButtons=function(inerText){
//         bodyWithButtons.innerHTML=inerText;
//     };

//     this.setHeader=function(inerText){
//         headerText.innerHTML=inerText;
//     };
//     this.setMainStyle=function(styletext){
//         //divManageElement.style.cssText=styletext;
//         divManageElement.classList.add(styletext);
//     };
//     this.setHeaderStyle=function(classText,styletext){
//         headerText.style.cssText=styletext;
//         headerText.classList.add(classText);
//     };


//     function createElements(){
//         divManageElement=document.createElement('div');
//         headerText=document.createElement('div');
//         headerText.classList.add('modal_box_header');
//         bodyWithButtons=document.createElement('div');
//         divManageElement.appendChild(headerText);
//         divManageElement.appendChild(bodyWithButtons);
//         divManageElement.classList.add('draggable');
//         divManageElement.classList.add('modal_box');
//         divManageElement.setAttribute('id','windowManageDevice');

//         document.getElementById("container").appendChild(divManageElement);
//     }
	      
// }

// var objectMenuManager= new createDivForeManagmentDevices();
// objectMenuManager.setMainStyle('modal_box');
// objectMenuManager.setHeaderStyle('modal_box_header','padding-top:10px;padding-bottom:10px;padding-left:15px!important;height:15px; width:auto;color:#ffa200;');

function createDivForeManagmentDevices(){
    var divManageElement;
    var header;
    let headerText;
    var bodyWithButtons;

    createElements();

   this.show=function(left,top){
    console.log('left',left);
    console.log('top',top);
    let topPos=top;
    top>600?topPos=600:topPos=top;


    
        
             
            divManageElement.style.left=''+left+'px';
            divManageElement.style.top=''+topPos+'px';
            
            document.getElementById('container').appendChild(divManageElement); 
            $( divManageElement).draggable({
                appendTo: "body"
            });
          
    };

    this.hide=function(){
        if(document.getElementById('windowManageDevice')){
            divManageElement.parentNode.removeChild(divManageElement);          
        } 
    };

    this.insertButtons=function(inerText){
        bodyWithButtons.innerHTML=inerText;
    };

    this.setHeader=function(inerText){
        headerText.innerHTML=inerText;
    };
    this.setMainStyle=function(styletext){
        //divManageElement.style.cssText=styletext;
        divManageElement.classList.add(styletext);
    };
    this.setHeaderStyle=function(classText,styletext){
        header.style.cssText=styletext;
        header.classList.add(classText);
    };


    function createElements(){
        divManageElement=document.createElement('div');
        divManageElement.style.display='block';
        header=document.createElement('div');
        headerText=document.createElement('p');
        headerText.classList.add('modal_box_header_text');
        header.classList.add('modal_box_header');
        header.appendChild(headerText);
        bodyWithButtons=document.createElement('div');
        divManageElement.appendChild(header);
        divManageElement.appendChild(bodyWithButtons);
        divManageElement.classList.add('draggable');
        divManageElement.classList.add('modal_box');
        divManageElement.setAttribute('id','windowManageDevice');
        
    }
          
}

var objectMenuManager= new createDivForeManagmentDevices();
// objectMenuManager.setMainStyle('modal_box');
// objectMenuManager.setHeaderStyle('modal_box_header','padding-top:10px;padding-bottom:10px;padding-left:15px!important;height:15px; width:auto;color:#ffa200;');



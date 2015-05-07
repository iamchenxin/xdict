/**
 * Created by z97 on 15-4-9.
 */


function testget(){

}

function outuser(txt){
    console.log(txt);
}

function init(){
    jQuery( "#menu" ).menu();
    console.log('( "#menu" ).menu()');
    jQuery('#menu').on( "menuselect", function( event, ui ) {
        switch(ui.item.text()){
            case "test":
                self.port.emit("test");
                break;
            case "getuser":
                self.port.emit("getuser");
                console.log("ctpanel.getuser");
                break;
            case "cook":
                self.port.emit("cook");
                break;
            case "sound":
                self.port.emit("sound");
                break;
        }
    } );
    self.port.on("revuser",outuser);
}

jQuery(init);
/**
 * Created by z97 on 15-4-9.
 */


function testget(){

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
                self.port.on("revuser",function(txt){
                    console.log(txt);
                });
                break;
            case "cook":
                self.port.emit("cook");
                break;
            case "sound":
                self.port.emit("sound");
                break;
        }
    } );
}

jQuery(init);
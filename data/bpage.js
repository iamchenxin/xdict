/**
 * Created by z97 on 15-5-5.
 */
function test1(){
    console.log("bpage~~~");
    var tmp = jQuery("div.no").html();
    console.log(tmp);
}
var DOKU_BASE="http://d.qituc.com/";


function rev_word(data){
    console.log(data);
    if(data.content.length<3){
        data.content="missing word";
    }
    console.log('bpage.rev_word');
    console.log(data);
    self.port.emit("revword",data.content);
}

//unsafeWindow.rev_word=rev_word;

function getword(word){

    var mdata=new Object();
    mdata['pageid']=word;
    mdata['call']="ajaxpeon";
    var url = DOKU_BASE + 'lib/exe/ajax.php';
    mdata['target']="page";
    mdata['reflect']="none";
    console.log("bpage.getword!,url = "+url);
    jQuery.ajax({url:url,data:mdata,success:rev_word,dataType:"json"});

}

function getuser(){

    var mdata=new Object();
    mdata['call']="ajaxpeon";
    var url = DOKU_BASE + 'lib/exe/ajax.php';
    mdata['target']="user";
    mdata['reflect']="none";
    console.log("getuser!,url = "+url);
    jQuery.ajax({url:url,data:mdata,dataType:"json",success:function(data){
        self.port.emit("revuser",data.content);
    }});

}

function voice_word(word){
    console.log("bpage.voice_word,"+word);
    unsafeWindow.voice_dict(word);
}

function init(){
    self.port.on("getword",getword);
    self.port.on("getuser",getuser);
    self.port.on("voiceword",voice_word);
}
console.log('bpage.js');
jQuery(init);
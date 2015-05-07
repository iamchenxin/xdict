/**
 * Created by z97 on 15-4-8.
 */

function addworkspace(){
    var spacetxt = '<div id="xxc_workspace">\
        <div id="xxc_top"></div>\
        <div id="xxc_main"><div id="xxc_mleft"></div><div id="xxc_mright"></div><div style="clear: both"></div></div>\
        <div id="xxc_footer"></div>\
        </div>';

    var myspace = jQuery(spacetxt);
    jQuery("body").append(myspace);
    jQuery(window).resize(function(){
        var client_w = jQuery( window ).width();
        var client_h = jQuery( window ).height();
        jQuery("#xxc_workspace").width(client_w);
        jQuery("#xxc_workspace").height(client_h);

    });
    jQuery(window).resize();
    return myspace;
}

function newui(){
    var myspace =addworkspace();

    var toolbartxt ='<div id="xxc_toolbar">\
    <button id="xxc_search_d">Search</button>\
    <div id="xxc_checkset">\
    <input type="checkbox" id="xxc_page_ck"><label for="xxc_page_ck">page</label>\
    <input type="checkbox" id="xxc_voice_ck"><label for="xxc_voice_ck">voice</label>\
    </div>\
    <input type="input" id="xxc_pageid_in">\
    </div>';
    var toolbar =jQuery(toolbartxt);
    jQuery("#xxc_footer").append(toolbar);
    jQuery('#xxc_checkset').buttonset();
    jQuery('#xxc_search_d').button();
    var righth = jQuery("#xxc_mright").height()-100;

    var diatxt ='<div id="xxc_dict_out" title="meaning of word"></div>';
    jQuery(diatxt).dialog({
        appendTo:'#xxc_mright',
        position: { my: "right bottom", at: "right bottom",of:'#xxc_mright'},
        height:righth
    });
    jQuery(".ui-dialog").css("pointer-events","auto");

    jQuery('#xxc_search_d').click(do_search);

}

function do_search(){
    var pageid ="en:";
    var word = jQuery("#xxc_pageid_in").val().trim();
    pageid+=word;
    jQuery('#xxc_checkset label.ui-state-active').each(function(){
        var dst=jQuery(this).text();
        console.log(dst);
        switch(dst){
            case 'page':
                wgetpage(pageid);
                break;
            case 'voice':
                self.port.emit("voiceword",word);
                break;
        }
    });

}

function wgetpage(pageid){

    self.port.emit("getpage",pageid);
    console.log("webui! xxc_search_d(),emit(getpage),pageid = "+pageid);

    self.port.on("revpage",function(txt){
        var logtxt = "webui! received txt,port.on(revpage)";

        if(txt.length<10){
            txt='<div>Missing word ...</div>';
            logtxt+=",Missing word!";
        }
        console.log(logtxt);
        jQuery("#xxc_dict_out").html(txt);
    });
}

/*
// voice ~~~~~
function init_mxyd_voice(){

    jx = jQuery('<audio/>', { id: 'adyd_vo', class: 'admxyd_vo'});

//    jx.attr('onerror',"voice_youdao_helper()");

    jogg=jQuery("<source id='adsrcogg'  type='audio/ogg'/>");
//    jogg.attr('onerror',"voice_youdao_helper()");
    jogg.appendTo(jx);

    jmp3 = jQuery("<source id='adsrcmp3' type='audio/mpeg'/>");
    jmp3.appendTo(jx);

    jQuery("body").append(jx);

}

function voice_you_word(word){
    var str="http://dict.youdao.com/dictvoice?audio=";
    str+=word;
    str+="&type=1";
    mvoice = jQuery("#adyd_vo")[0];
    mvoice.setAttribute('onerror',"");
    mvoice.setAttribute('src', str);
    mvoice.setAttribute('autoplay', 'autoplay');
}


var faildword="";


function voice_youdao_helper(){
    var str="http://dict.youdao.com/dictvoice?audio=";
    str += faildword;

    str+="&type=1";
    mvoice = jQuery("#adyd_vo")[0];
    mvoice.setAttribute('onerror',"");
    mvoice.setAttribute('src', str);
    mvoice.setAttribute('autoplay', 'autoplay');
    mvoice.play();
    // mvoice.play() ! this could lend ie  interupt!
//    mvoice.setAttribute('src', '');

}

function voice_dict(word){
    var str="http://dict.qituc.com/dv/";
    var xword =word;
    var sckey = jQuery.cookie("DWremoteinf");

    if(sckey==null){
        voice_you_word("please login.This function only available to users.");
        return;
    }

    str+=sckey;
    str+="|";
    str += xword;
    jx = jQuery("#adyd_vo");
    jx.removeAttr("src");

    jQuery("#adsrcogg").attr("src",str+".ogg");
    jQuery("#adsrcogg").attr('onerror',"voice_you_word('missing word,please record it to the missing words file.')");
    jQuery("#adsrcmp3").attr("src",str+".mp3");
    jx.attr('onerror',"voice_you_word('missing word,please record it to the missing words file.')");
    jx[0].pause();
    jx[0].load();
    jx[0].play();
}
*/

function init(){
    newui();
//    init_mxyd_voice();
}

init();
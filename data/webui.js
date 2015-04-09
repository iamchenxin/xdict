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
    <input type="checkbox" id="xxc_content_ck"><label for="xxc_content_ck">content</label>\
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

    jQuery('#xxc_search_d').click(function(){
        var pageid ="en:";
        var word = jQuery("#xxc_pageid_in").val().trim();
        pageid+=word;
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

    });
}



newui();
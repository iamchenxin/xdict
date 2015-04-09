/**
 * Created by z97 on 15-4-9.
 */
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var data = require('sdk/self').data;
var { attach, detach } = require('sdk/content/mod');
var { Style } = require('sdk/stylesheet/style');
var xnet =require('./xnet');

var tabcss =Style({uri:data.url('webui.css')});
var juicss = Style({uri:data.url('jquery/jquery-ui.css')});


var worker_map= new WeakMap();

tabs.on("ready", function(tab) {
    var tab_worker =tab.attach({
        contentScriptFile: [data.url('jquery/jquery-2.1.3.min.js'),data.url('jquery/jquery-ui.min.js'),
            data.url('webui.js')],
    });
    attach(tabcss, tab);
    attach(juicss, tab);

    worker_map.set(tab,tab_worker);


    tab_worker.port.on("getpage",function(pageid){
        console.log("webtab! port.on(getpage), pageid="+pageid);
        console.log("webtab! call,xnet.getpage");
        xnet.getPage(pageid,tab_worker);

    });
});
tabs.on("close",function(tab){
    worker_map.delete(tab);
});

function current_worker(){
    return worker_map.get(tabs.activeTab);
}

exports.worker_map=worker_map;
exports.current_worker=current_worker;


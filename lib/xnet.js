/**
 * Created by z97 on 15-4-9.
 */

var Request = require("sdk/request").Request;

var dicturl = 'http://wiki.qituc.com/' + 'lib/exe/ajax.php';

var webtab =require('./webtab');



function getPage(pageid,worker){
    var mdata=new Object();
    var url = dicturl;
    mdata['call']="ajaxpeon";

    mdata['target']="page";
    mdata['pageid']=pageid;

    var rq = Request({url:url,content:mdata,onComplete:function(rs){
        console.log("xnet! recived data,emit(revpage)");
        var content = rs.json.content;
        worker.port.emit("revpage",content);
    }});
    rq.get();
    console.log("xnet! Request : "+pageid);
}

function getUser(){
    var mdata=new Object();
    var url = dicturl;
    mdata['call']="ajaxpeon";

    mdata['target']="user";
    var rq = Request({url:url,content:mdata,onComplete:user_data});
    rq.get();
}

exports.getPage=getPage;
exports.getUser=getUser;
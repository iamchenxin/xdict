/**
 * Created by z97 on 15-4-8.
 */
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = require('sdk/self').data;

function init(){
    var button = ToggleButton({
        id: "mybutton",
        label: "show a panel",
        icon: {
            "16": "./images/icon-16.png",
            "32": "./images/icon-32.png",
            "64": "./images/icon-64.png"
        },
        onChange: handleChange
    });



    var panel = panels.Panel({
        contentURL: self.data.url("ctpanel.html"),
        contentScriptWhen: 'ready',
        onHide: handleHide
    });

    function handleChange(state) {
        if (state.checked) {
            panel.show({
                position: button
            });
        }
    }

    function handleHide() {
        button.state('window', {checked: false});
    }
}

var tv =10;
exports.init =init;
exports.ev =20;
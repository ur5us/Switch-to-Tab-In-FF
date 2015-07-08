var self = require('sdk/self');
var bitap = require('bitap');
var Hotkey = require("sdk/hotkeys").Hotkey;
var tabs = require("sdk/tabs");

function getAllTabDetails(hasTabs) {
  var arr = [];
  for (var i = 0 ; i < tabs.length; i++) {
    arr.push({title : tabs[i].title, url : tabs[i].url , tab : hasTabs? tabs[i] : undefined});
  };
  return arr;
}
function selectTabByIndex(ind) {
  tabs[ind].activate();
}
function selectTab(url) {
  for (var i = 0 ; i < tabs.length; i++) {
    if (tabs[i].url == url) {
      tabs[i].activate();
      break;
    }
  };
}

function handleClick(state) {
  tabs.open("https://developer.mozilla.org/");
}

// Returns sorted array as per name 
function getTab(search , arr) {
  return [];
}

var panel = require("sdk/panel").Panel({
  contentURL: "./index.html"
  // contentScriptFile : "./behavior.js",
  // contentStyleFile: ["./select2/dist/css/select2.min.css","./style.css"],
  // height: 180
});

panel.on('show', function() {
  console.log("Showing panel");
  panel.port.emit('show');
  panel.postMessage(JSON.stringify(getAllTabDetails(false)));
});
panel.port.on('selectTab',function(d) {
  // selectTab(d.url);
  selectTabByIndex(d.index);
  panel.hide();
});

panel.on('hide', function() {
  panel.port.emit('hide');
});

var showHotKey = Hotkey({
  combo: "alt-b",
  onPress: function() {
    console.log("Pressed1");
    panel.show();
    panel.port.emit('show',{a:1});
  }
});

exports.getTab = getTab;















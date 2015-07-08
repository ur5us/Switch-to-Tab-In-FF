var self = require('sdk/self');
var bitap = require('bitap');
var Hotkey = require("sdk/hotkeys").Hotkey;
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});


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
  contentURL: "./index.html",
  // contentScriptFile : "./behavior.js",
  // contentStyleFile: ["./select2/dist/css/select2.min.css","./style.css"],
  width: 300,
  height: 180
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
console.log(133131313113);
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


exports.dummy = dummy;
exports.getTab = getTab;















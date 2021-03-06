var Hotkey = require("sdk/hotkeys").Hotkey;
var tabs = require("sdk/tabs");

function getAllTabDetails() {
  var arr = [];
  for (let tab of tabs) {
    arr.push({ id: tab.id, title: tab.title, url: tab.url });
  };
  return arr;
}

function byTabId(id) {
  return function(tab) {
    return tab.id === id;
  }
}

function selectTabById(id) {
  tab = Array.prototype.find.call(tabs, byTabId(id));
  if (tab !== undefined) {
    tab.activate();
  }
}

var panel = require("sdk/panel").Panel({
  position: {
    top: 10
  },
  contentURL: "./index.html"
});

var suppressTrigger = false;
function togglePanel() {
  panel.isShowing ? panel.hide() : panel.show();
};

panel.on('show', function() {
  if (suppressTrigger)
    return;
  panel.port.emit('show');
  panel.postMessage(JSON.stringify(getAllTabDetails()));
});

panel.port.on('selectTab', function(tabID) {
  selectTabById(tabID);
  panel.hide();
});

panel.port.on('resize', function(e) {
  var wid = e.width;
  var hei = e.height;
  panel.resize(wid,hei);
});

panel.on('hide', function() {
  if (suppressTrigger)
    return;
  panel.port.emit('hide');
});

var showHotKey = Hotkey({
  combo: "alt-b",
  onPress: function() {
    togglePanel();
  }
});

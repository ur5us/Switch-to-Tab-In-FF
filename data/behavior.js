var self = this;
function getScreenSize() {
  return { width : self.screen.availWidth, height : self.screen.availHeight };
};

function init() {
  var selDom = $(".js-example-basic-single");
  selDom.select2({
    placeholder : "Type tab title or url to select it"
  });
  var s = selDom.data('select2');
  var c = s.$container;
  var r = s.$results;
  setTimeout(function() {
    // Send a resize event with the exact size
    var wid = c.outerWidth() + 30;
    s.open();
    var hei = r.outerHeight() + 100;
    console.log("Width Height " , wid , "-" , hei);
    var size = getScreenSize();
    addon.port.emit('resize',{width:wid,height: hei, left : (size.width-wid)/2 });
  },1);
}
function destroy() {
  var selDom = $(".js-example-basic-single");
  selDom.select2("destroy");
}
function createList(arr) {
  var strArr = arr.map(function(x) {
    var title = x.title || "";
    title = title.length > 100 ? title.substr(0,98) + ".." : title;
    return "<option value='"+x.url+"'>"+title+"</option>";
  });
  var selDom = $(".js-example-basic-single");
  selDom.html(strArr.join(""));  
}
function selectTab(ind, url,name) {
  if (typeof addon == "object") {
    addon.port.emit('selectTab',{index : ind, url : url ,name : name});
  }
};

function initEvents() {
  var selDom = $(".js-example-basic-single");
  selDom.on('select2:close',function(e) {
    var url = selDom.val();
    var html = selDom.find(":selected").html();
    var ind =  selDom.find(":selected").index();
    selDom.data('select2').close();
    selectTab(ind , url , html);
  });
}

if (typeof addon != "undefined") {
  addon.on('message',function(msg) {
    var arr = JSON.parse(msg);
    createList(arr);
    init();
    initEvents();
  });
};

console.log("in indexxxx ");

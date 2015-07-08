function init() {
  var selDom = $(".js-example-basic-single");
  selDom.select2({
    placeholder : "Type tab title or url to select it",
    "width": "resolve"
  });
}
function destroy() {
  var selDom = $(".js-example-basic-single");
  selDom.select2("destroy");
}
function createList(arr) {
  var strArr = arr.map(function(x) {
    return "<option value='"+x.url+"'>"+x.title+"</option>";
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
  var sel;
  addon.port.on('hide',function() {
    if (sel && sel.close)
      sel.close();
  });
  addon.on('message',function(msg) {
    var arr = JSON.parse(msg);
    createList(arr);
    init();
    initEvents();
    setTimeout(function() {
      var selDom = $(".js-example-basic-single");
      sel = selDom.data('select2');
      sel.open();
    },1);
  });
};

console.log("in indexxxx ");

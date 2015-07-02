var selDom;
function init() {
  selDom = $(".js-example-basic-single");
  selDom.select2();
}
function destroy() {
  selDom = $(".js-example-basic-single");
  selDom.select2("destroy");
}
function createList(arr) {
  var strArr = arr.map(function(x) {
    return "<option>"+x.title+"</option>";
  });
  selDom = $(".js-example-basic-single");
  selDom.html(strArr.join(""));  
}
if (typeof addon != "undefined") {
  var sel;
  console.log('232 -213333333333 really 3');;
  addon.port.on('hide',function() {
    if (sel && sel.close)
      sel.close();
  });  
  addon.on('message',function(msg) {
    var arr = JSON.parse(msg);
    createList(arr);
    console.log(msg);
    init();
    setTimeout(function() {
      sel = selDom.data('select2');
      sel.open();    
    },1);
  });
}



console.log("in indexxxx ");

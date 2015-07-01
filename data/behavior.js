console.log('2323');
function kk () {
  console.log('232 - really 3');
}
var sel,selDom;
if (typeof addon != "undefined") {
  console.log('232 -213333333333 really 3');;
  addon.port.on('show', function() {    
    sel = selDom.data('select2');
    sel.open();
  });
}

$(document).ready(function() {
  selDom = $(".js-example-basic-single").select2();  
});

console.log("in indexxxx ");

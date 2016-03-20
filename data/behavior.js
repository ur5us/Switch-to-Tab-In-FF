function getScreenSize() {
  return { width : self.screen.availWidth, height : self.screen.availHeight };
};

function init() {
  let $selectDom = $("#combo-box");
  let select2 = $selectDom.select2({
    placeholder: "Type tab title or URL to select it"
  });
  let s = $selectDom.data('select2');
  let c = s.$container;
  let r = s.$results;

  setTimeout(function() {
    resize(s, c, r);
  }, 1);
}

function resize($select2, $container, $results) {
  let width = $container.outerWidth() + 30;
  $select2.open();
  let height = $results.outerHeight() + 100;
  let screenSize = getScreenSize();
  let newSize = {
    width: width,
    height: height,
    left: (screenSize.width - width)/2
  }
  addon.port.emit('resize', newSize);
}

function destroy() {
  let $selectDom = $("#combo-box");
  $selectDom.select2("destroy");
}

function createList(arr) {
  let strArr = arr.map(function(x) {
    let title = x.title || '';
    title = title.length > 100 ? title.substr(0, 98) + ".." : title;
    return "<option value='" + x.id + "'>" + title + "</option>";
  });
  let $selectDom = $("#combo-box");
  $selectDom.html(strArr.join(''));
}

function selectTab(id) {
  if (typeof addon == "object") {
    addon.port.emit('selectTab', id);
  }
};

function initEvents() {
  let $selectDom = $("#combo-box");
  $selectDom.on('select2:close', function(e) {
    let id = $selectDom.find(":selected").val();
    $selectDom.data('select2').close();
    selectTab(id);
    destroy();
  });
}

if (typeof addon != "undefined") {
  addon.on('message', function(msg) {
    let arr = JSON.parse(msg);
    createList(arr);
    init();
    initEvents();
  });
};

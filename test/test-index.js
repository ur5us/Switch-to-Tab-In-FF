var main = require("../");

exports["test main"] = function(assert) {
  assert.pass("Unit test running!");
};

exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

exports["test dummy"] = function(assert, done) {
  main.dummy("foo", function(text) {
    assert.ok((text === "foo"), "Is the text actually 'foo'");
    done();
  });
};

exports["test getTab"] = function(assert, done) {
  var arr = main.getTab("foo",[]);  
  assert.pass("Got sorted tab",arr);
  done();
};


require("sdk/test").run(exports);

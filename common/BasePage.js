module.exports = function(browser) {
  this.inputText = function(selector, value){
    browser.setValue(selector, value);
    return browser;
  };
  return this;
}
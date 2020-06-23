var logger = require('../utils/logger');
var log = logger.logger();

module.exports = function(browser) {
  this.inputText = function(selector, value){
    try{
      browser.setValue(selector, value);
      log.info(`Setting Value: ${value} for locator: ${selector}`)
      return browser;
    } catch(e){
      log.error(`Exception occurred during inputText(): ${e}`)
      return browser;
    } 
  };
  return this;
}
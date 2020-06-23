var logger = require('../utils/logger');
var log = logger.logger();

module.exports = function(browser) {
  this.inputText = function(selector, value){
    try{
      browser
        .waitForElementVisible(selector, 5000)
        .setValue(selector, value);
      log.info(`Setting Value: ${value} for locator: ${selector}`)
      return browser;
    } catch(e){
      log.error(`Exception occurred during inputText(): ${e}`)
      return browser;
    } 
  };

  this.clickButton = function(selector) {
    try{
      log.info(`Clicking on locator: ${selector}`);
      browser
        .waitForElementVisible(selector, 5000)
        .click(selector)
      return browser;
    } catch(e){
        log.error(`Exception occurred during inputText(): ${e}`)
        return browser;
    }
  }
  return this;
}
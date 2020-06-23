var logger = require('../utils/logger');
var log = logger.logger();

module.exports = function(browser) {
    this.navigateToLoginPage = function(){
        const launchUrl = 'https://www.saucedemo.com/';
        const loginPage = browser.page.LoginPageObjects();
        log.info(`Navigating to URL: ${launchUrl}`);
        loginPage
            .navigate(launchUrl)
            .checkLoginPageLoaded()
        browser
            .saveScreenshot('screenshots/launchScreen.jpg')
        return browser;
    };
    this.doLogin = function(tc_username, tc_password){
        const loginPage = browser.page.LoginPageObjects();
        loginPage
            .inputUsername(tc_username)
            .inputPassword(tc_password)
            .clickLoginButton()
            .checkWelcomePageText()
        browser
            .saveScreenshot('screenshots/WelcomeScreen.jpg')
        browser
        return browser;
    };
    return this;
}
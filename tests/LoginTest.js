var logger = require('../utils/logger');
var log = logger.logger();
module.exports = {
    '@tags': ['SauceDemoLogin'],
    'Launch Test'(browser){
        const launchUrl = 'https://www.saucedemo.com/';
        const loginPage = browser.page.LoginPageObjects();
        loginPage
            .navigate(launchUrl)
            .checkLoginPageLoaded()
        browser
            .saveScreenshot('screenshots/launchScreen.jpg')
    },
        
    'Login Test'(browser){
        const loginPage = browser.page.LoginPageObjects();
        const tc_username = 'standard_user';
        const tc_password = 'secret_sauce'
        loginPage
            .inputUsername(tc_username)
            .inputPassword(tc_password)
            .clickLoginButton()
            .checkWelcomePageText()
        browser
            .saveScreenshot('screenshots/WelcomeScreen.jpg')
            .end()
    }

}
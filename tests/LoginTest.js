var logger = require('../utils/logger');
var login = require('../customTest/Login')

var log = logger.logger();
module.exports = {
    '@tags': ['SauceDemoLogin'],
    'Launch Test'(browser){
        login(browser)
            .navigateToLoginPage();
    },
        
    'Login Test'(browser){
        const tc_username = 'standard_user';
        const tc_password = 'secret_sauce'
        login(browser)
            .doLogin(tc_username, tc_password)
            .end();
    }

}
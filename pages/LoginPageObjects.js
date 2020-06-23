var basepage = require('../commonPage/BasePage');
var logger = require('../utils/logger');
var log = logger.logger();

module.exports = {

    url: 'https://www.saucedemo.com/',
    elements: {
        mainBody : '.main-body',
        userName : 'input[type=text]',  
        password : 'input[type=password]',
        loginButton : 'input[type=submit]',
        productTextWelcomePage : '.product_label'
    },
    commands: [{
        inputUsername(value){
            log.info(`Inputting Username: ${value}`);
            return user = basepage(this).inputText('@userName', value)
        },
        inputPassword(value){
            log.info(`Inputting Password: ${value}`);
            return basepage(this).inputText('@password', value)
        },
        clickLoginButton(){
            return basepage(this).clickButton('@loginButton')
        },
        checkLoginPageLoaded(){
            log.info(`Checking Login Page is Loaded`);
            return this.assert.attributeContains('@userName', 'placeholder','Username', 'Login page is loaded!')
        },
        checkWelcomePageText(){
            log.info(`Verifying Welcome Page loaded`);
            return this.assert.containsText('@productTextWelcomePage', 'Products', 'Login Successful!')
        }
        
    }]
}
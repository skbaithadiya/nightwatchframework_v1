var basepage = require('../common/BasePage');

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
            return basepage(this).inputText('@userName', value)
        },
        inputPassword(value){
            return basepage(this).inputText('@password', value)
        },
        clickLoginButton(){
            return this.click('@loginButton')
        },
        checkLoginPageLoaded(){
            return this.assert.attributeContains('@userName', 'placeholder','Username', 'Login page is loaded!')
        },
        checkWelcomePageText(){
            return this.assert.containsText('@productTextWelcomePage', 'Products', 'Login Successful!')
        }
        
    }]
}
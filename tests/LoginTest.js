module.exports = {
    'Login Test'(browser){
        browser
            // .useXpath()
            .url('https://www.saucedemo.com/')
            .waitForElementVisible('.main-body')
            .assert.attributeContains('input[type=text]', 'placeholder','Username');
        
    }
}
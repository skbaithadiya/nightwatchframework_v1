var login = require('../customTest/Login');
var logger = require('../utils/logger');
var excel = require('../utils/excelUtils')
var log = logger.logger();

var testDataPath = process.cwd() + '\\testData';
var excelFilePath = testDataPath + '\\loginData.xlsx';
var sheetName = 'loginTC';
// var loginData = {};
var tc_username;
var tc_password;
var tc_id;
var tc_result= 'Failed';

module.exports = {
    '@tags': ['SauceDemoBuyProduct'],
    before: function(browser){
    },
    after: function(browser){
        // excel(excelFilePath).excelWrite(sheetName, tc_id, 'test_result', tc_result);
        browser.end();
    },
    'Prepare Login Data': async function(){
        tc_id = 'tc1';
        tc_username = await excel(excelFilePath).excelRead(sheetName, tc_id, 'username');
        tc_password = await excel(excelFilePath).excelRead(sheetName, tc_id, 'password');
    },
    'Login Test': function(browser){
        login(browser).navigateToLoginPage();
        login(browser).doLogin(tc_username, tc_password);
    },
    'Add to cart - Test'(browser){
        const backpackName = 'Sauce Labs Fleece Jacket';
        const addCartButtonName = 'ADD TO CART';
        const RemoveCartButtonName = 'REMOVE';
        const cartPageHeaderName = 'Your Cart';
        const checkoutButtonName = 'CHECKOUT';
        const message1 = 'THANK YOU FOR YOUR ORDER';
        const message2 = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';
        // Personal Information
        const yourInformationTitle = 'Checkout: Your Information';
        const firstName = 'asddaads';
        const lastName = 'sdasdad';
        const postalCode = '847878';
        // Overview Page
        const overviewPageTitle = 'Checkout: Overview';
        const buyproduct = browser.page.BuyProductPageObjects();
        buyproduct
            .findAndClickProductByName(backpackName)
            .checkProductTitle(backpackName)
            .addProductToCart(addCartButtonName, RemoveCartButtonName)
            .GoToCart(cartPageHeaderName)
            .clickCheckout(checkoutButtonName)
            .fillPersonalDetailAndContinue(yourInformationTitle, firstName, lastName, postalCode)
            .checkoutOverviewAndFinish(overviewPageTitle)
            .verifySuccess(message1, message2)
            .saveScreenshot('screenshots/SuccessfulE2E.jpg')
            .pause(2000)
            .end()
        test_result = 'Passed'
    }
}
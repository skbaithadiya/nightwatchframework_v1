var login = require('../customTest/Login');
var logger = require('../utils/logger');
var log = logger.logger();

module.exports = {
    '@tags': ['SauceDemoBuyProduct'],
    before: function(browser){
        const tc_username = 'standard_user';
        const tc_password = 'secret_sauce'
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
            .pause(1000)
            .end()
            
    }
}
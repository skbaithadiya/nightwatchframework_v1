var login = require('../customTest/Login');
var logger = require('../utils/logger');
var excel = require('../utils/excelUtils')


var logfilename = 'buyProductTest.log';
var log = logger.logger(logfilename);
var testDataPath = process.cwd() + '\\testData';
var excelFilePath = testDataPath + '\\buyProductData.xlsx';
var sheetName;
// var loginData = {};
var productData;
var tc_username;
var tc_password;
var tc_id;
var backpackName;
var addCartButtonName;
var RemoveCartButtonName;
var cartPageHeaderName;
var checkoutButtonName;
var message1;
var message2;
// Personal Information
var yourInformationTitle;
var firstName;
var lastName;
var postalCode;
// Overview Page
var overviewPageTitle;
var tc_result= 'Failed';

module.exports = {
    '@tags': ['SauceDemoBuyProduct'],
    before: function(browser){
    },
    after: function(browser){
        excel(excelFilePath).excelWrite('loginTC', tc_id, 'test_result', tc_result);
        excel(excelFilePath).excelWrite('buyProductTC', tc_id, 'test_result', tc_result);
        excel(excelFilePath).excelWrite('personalnfoTC', tc_id, 'test_result', tc_result);
        browser.end();
    },
    'Prepare Testcase Data': async function(){
        tc_id = 'tc1';
        sheetName = 'loginTC';
        // login data
        tc_username = await excel(excelFilePath).excelRead(sheetName, tc_id, 'username');
        tc_password = await excel(excelFilePath).excelRead(sheetName, tc_id, 'password');

        // product data
        sheetName = 'buyProductTC';
        productData = await excel(excelFilePath).excelReadEntireRow(sheetName, tc_id);
        backpackName = productData['productName'];
        addCartButtonName = productData['addToCartButton'];
        RemoveCartButtonName = productData['removeCartButton'];
        cartPageHeaderName = productData['cartPageHeader'];
        checkoutButtonName = productData['checkoutButton'];
        message1 = productData['successMessage1'];
        message2 = productData['successMessage2'];

        // Personal Information
        sheetName = 'personalnfoTC';
        personalData = await excel(excelFilePath).excelReadEntireRow(sheetName, tc_id);
        yourInformationTitle = personalData['personalInfoPageTitle'];
        firstName = personalData['firstName'];
        lastName = personalData['lastName'];
        postalCode = personalData['postalCode'];

        // Overview Page
        overviewPageTitle = productData['overviewPageTitle'];
    },
    'Login Test': function(browser){
        login(browser).navigateToLoginPage();
        login(browser).doLogin(tc_username, tc_password);
    },
    'Add to cart - Test'(browser){
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
        tc_result = 'Passed'
    }
}
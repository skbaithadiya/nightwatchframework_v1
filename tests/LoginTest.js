var logger = require('../utils/logger');
var login = require('../customTest/Login')
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
    '@tags': ['SauceDemoLogin'],

    before: function(browser){
        
    },

    after: function(browser){
        excel(excelFilePath).excelWrite(sheetName, tc_id, 'test_result', tc_result);
        browser.end();
    },
    'Prepare Login Data': async function(){
        // using single username/password
        tc_id = 'tc1';
        tc_username = await excel(excelFilePath).excelRead(sheetName, tc_id, 'username');
        tc_password = await excel(excelFilePath).excelRead(sheetName, tc_id, 'password');

        // // example of data driven
        // loginData['username'] = await excel(excelFilePath).excelReadEntireColumn(sheetName, 'username');
        // loginData['password'] = await excel(excelFilePath).excelReadEntireColumn(sheetName, 'password');
        // console.log(loginData);
    },
    'Launch Test'(browser){
        login(browser)
            .navigateToLoginPage()
    },
    'Login Test': function(browser){
        login(browser)
            .doLogin(tc_username, tc_password)
        tc_result = 'Passed';
    },
    // 'Login Test - Data Driven': function(browser){
    //     dataLength = loginData.username.length;
    //     for(tc=0; tc<dataLength; tc++){
    //         try{
    //             user = loginData.username[tc];
    //             pass = loginData.password[tc];
    //             log.info(`username: ${user} and password: ${pass}`)
    //             login(browser)
    //                 .navigateToLoginPage();
    //             login(browser)
    //                 .doLoginDataDriven(user, pass);
    //         } catch(e){
    //             log.error(`exception occurred during running TC: Login Test - Data Driven: ${e}`)
    //         }
    //     }
    // }

}
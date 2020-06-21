module.exports = {
    url: 'https://www.saucedemo.com/inventory.html',
    elements: {
        title: '.inventory_details_name',
        addToCartButton: '#inventory_item_container > div > div > div > button',
        goToCartButton: '#shopping_cart_container > a',
        subPageHeader: '#contents_wrapper > div.subheader',
        checkoutButton: '#cart_contents_container > div > div.cart_footer > a.btn_action.checkout_button',
        // Personal Information
        firstName: '#first-name',
        lastName: '#last-name',
        postalCode: '#postal-code',
        continueButton: '#checkout_info_container > div > form > div.checkout_buttons > input',
        // Overview Page
        finishButton: '#checkout_summary_container > div > div.summary_info > div.cart_footer > a.btn_action.cart_button',
        // success page
        successMessage1: '#checkout_complete_container > h2',
        successMessage2: '#checkout_complete_container > div.complete-text',

    },
    commands: [{
        clickProductByName(productName){
            const element = "//div[@class='inventory_item_label']/a/div[text()='"+ productName+"']";
            return this
                .useXpath()
                .moveToElement(element, 1, 1)
                .click(element);
        },
        checkProductTitle(productName){
            return this.assert.containsText('@title', productName, "Product Title matched!")
        },
        addProductToCart(addCartButtonName, RemoveCartButtonName){
            return this
                .moveToElement('@addToCartButton', 1, 1)
                .assert.containsText('@addToCartButton', addCartButtonName, 'ADD TO CART button is available!')
                .click('@addToCartButton')
                .assert.containsText('@addToCartButton', RemoveCartButtonName, 'Product Added to the cart successfully!')
        },
        GoToCart(cartPageHeaderName){
            return this
                .moveToElement('@goToCartButton', 1, 1)
                .click('@goToCartButton')
                .assert.containsText('@subPageHeader', cartPageHeaderName, 'At Cart Page')
        },
        clickCheckout(checkoutButtonName){
            return this
                .assert.containsText('@checkoutButton', checkoutButtonName, 'Checkout button is present!')
                .moveToElement('@checkoutButton', 1, 1)
                .click('@checkoutButton')
        },
        fillPersonalDetailAndContinue(yourInformationTitle, firstName, lastName, postalCode){
            return this
                .assert.containsText('@subPageHeader', yourInformationTitle, 'At Your Information Page')
                .setValue('@firstName', firstName)
                .setValue('@lastName', lastName)
                .setValue('@postalCode', postalCode)
                .click('@continueButton')
        },
        checkoutOverviewAndFinish(overviewPageTitle){
            return this
                .assert.containsText('@subPageHeader', overviewPageTitle, 'At Overview Page')
                .click('@finishButton')
        },
        verifySuccess(message1, message2){
            return this
            .assert.containsText('@successMessage1', message1, 'Order is successful!')
            .assert.containsText('@successMessage2', message2, 'Order has been dispatched!')
        }
    }]
}


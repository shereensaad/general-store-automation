'use strict';

const { expect } = require('chai');
const { remote } = require('webdriverio');
const { capabilities, serverConfig } = require('../config/appium.config');
const RegistrationPage = require('../pages/RegistrationPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const testData = require('../data/testData.json');

// Test Suite 

describe('General Store – End-to-End Shopping Flow', function () {
  this.timeout(120_000);

  let driver;
  let registrationPage;
  let productsPage;
  let cartPage;


  before(async function () {
    driver = await remote({ ...serverConfig, capabilities });

    registrationPage = new RegistrationPage(driver);
    productsPage     = new ProductsPage(driver);
    cartPage         = new CartPage(driver);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const title     = this.currentTest.title.replace(/\s+/g, '_');
      await driver.saveScreenshot(`./screenshots/${title}_${timestamp}.png`);
    }
  });


  testData.users.forEach((user) => {
    describe(`User: ${user.name} | Country: ${user.country} | Gender: ${user.gender}`, function () {

      it('should display the Registration screen on launch', async function () {
        const spinner = await driver.$(
          'android=new UiSelector().resourceId("com.androidsample.generalstore:id/spinnerCountry")'
        );
        await spinner.waitForDisplayed({ timeout: 15_000 });
        expect(await spinner.isDisplayed()).to.be.true;
      });

      it(`should select "${user.country}" from the country dropdown`, async function () {
        await registrationPage.selectCountry(user.country);

        const spinner = await driver.$(
          'android=new UiSelector().resourceId("com.androidsample.generalstore:id/spinnerCountry")'
        );
        const selectedText = await spinner.getText();
        expect(selectedText).to.equal(user.country);
      });

      it(`should enter the name "${user.name}"`, async function () {
        await registrationPage.enterName(user.name);

        const nameField = await driver.$(
          'android=new UiSelector().resourceId("com.androidsample.generalstore:id/nameField")'
        );
        const enteredText = await nameField.getText();
        expect(enteredText).to.equal(user.name);
      });

      it(`should select the "${user.gender}" radio button`, async function () {
        await registrationPage.selectGender(user.gender);

        const radioId = user.gender === 'Male'
          ? 'com.androidsample.generalstore:id/radioMale'
          : 'com.androidsample.generalstore:id/radioFemale';

        const radio = await driver.$(
          `android=new UiSelector().resourceId("${radioId}")`
        );
        expect(await radio.isSelected()).to.be.true;
      });

      it("should navigate to the Products screen after clicking \"Let's Shop\"", async function () {
        await registrationPage.clickLetsShop();

        const productList = await driver.$(
          'android=new UiSelector().resourceId("com.androidsample.generalstore:id/recyclerViewProducts")'
        );
        await productList.waitForDisplayed({ timeout: 15_000 });
        expect(await productList.isDisplayed()).to.be.true;
      });

      it(`should add "${user.product}" to the cart`, async function () {
        await productsPage.addProductToCart(user.product);
      });

      it('should navigate to the Cart screen', async function () {
        await productsPage.goToCart();
        await driver.pause(1500);
      });

      it(`should display "${user.product}" in the cart`, async function () {
        const isInCart = await cartPage.isProductInCart(user.product);
        expect(
          isInCart,
          `Expected "${user.product}" to be present in the cart`
        ).to.be.true;
      });

    }); 
  }); 

});

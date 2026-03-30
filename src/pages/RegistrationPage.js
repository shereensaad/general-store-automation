'use strict';

const BasePage = require('./BasePage');

//  Locators 
const SELECTORS = {
  countrySpinner:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/spinnerCountry")',
  nameInput:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/nameField")',
  radioMale:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/radioMale")',
  radioFemale:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/radioFemale")',
  letsShopBtn:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/btnLetsShop")',
};


class RegistrationPage extends BasePage {
  
  async selectCountry(country) {
    const spinner = await this.waitForElement(SELECTORS.countrySpinner);
    await spinner.click();
    await this.pause(500); 

    const option = await this.scrollToText(country);
    await option.click();
  }

  
  async enterName(name) {
    const field = await this.waitForElement(SELECTORS.nameInput);
    await field.clearValue();
    await field.setValue(name);
    await this.driver.hideKeyboard();
  }

  
  async selectGender(gender) {
    const selector = gender === 'Male' ? SELECTORS.radioMale : SELECTORS.radioFemale;
    const radio = await this.waitForElement(selector);
    await radio.click();
  }

  
  async clickLetsShop() {
    const btn = await this.waitForElement(SELECTORS.letsShopBtn);
    await btn.click();
  }

  
  async completeRegistration(country, name, gender) {
    await this.selectCountry(country);
    await this.enterName(name);
    await this.selectGender(gender);
    await this.clickLetsShop();
  }
}

module.exports = RegistrationPage;

'use strict';

const BasePage = require('./BasePage');

//  Locators 
const SELECTORS = {
  productNames:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/productName")',
  emptyLabel:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/emptyText")',
};


class CartPage extends BasePage {
  
  async getCartProductNames() {
    const elements = await this.driver.$$(SELECTORS.productNames);
    const names = [];
    for (const el of elements) {
      names.push(await el.getText());
    }
    return names;
  }

 
  async isProductInCart(productName) {
    const names = await this.getCartProductNames();
    return names.some((n) => n.toLowerCase().includes(productName.toLowerCase()));
  }

  
  async isCartEmpty() {
    try {
      const el = await this.driver.$(SELECTORS.emptyLabel);
      return el.isDisplayed();
    } catch {
      return false;
    }
  }
}

module.exports = CartPage;

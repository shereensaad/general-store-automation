'use strict';

const BasePage = require('./BasePage');

// Locators 
const SELECTORS = {
  productList:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/recyclerViewProducts")',
  cartIcon:
    'android=new UiSelector().resourceId("com.androidsample.generalstore:id/appCartIcon")',
};


function addToCartSelector(productName) {
  return (
    `android=new UiScrollable(new UiSelector()` +
    `.resourceId("com.androidsample.generalstore:id/recyclerViewProducts"))` +
    `.scrollIntoView(new UiSelector()` +
    `.resourceId("com.androidsample.generalstore:id/productAddCart")` +
    `.fromParent(new UiSelector().text("${productName}")))`
  );
}


class ProductsPage extends BasePage {
  
  async addProductToCart(productName) {
    const productNameEl = await this.scrollToText(productName);
    await productNameEl.waitForDisplayed({ timeout: 10000 });

    const addBtn = await this.driver.$(addToCartSelector(productName));
    await addBtn.waitForDisplayed({ timeout: 10000 });
    await addBtn.click();
    await this.pause(500);
  }

  
  async goToCart() {
    const icon = await this.waitForElement(SELECTORS.cartIcon);
    await icon.click();
  }
}

module.exports = ProductsPage;

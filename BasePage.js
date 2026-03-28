'use strict';


class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  
  async waitForElement(selector, timeout = 10000) {
    const el = await this.driver.$(selector);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  
  async scrollToText(text) {
    const selector =
      `android=new UiScrollable(new UiSelector().scrollable(true))` +
      `.scrollIntoView(new UiSelector().text("${text}"))`;
    return this.driver.$(selector);
  }

 
  async pause(ms) {
    await this.driver.pause(ms);
  }
}

module.exports = BasePage;

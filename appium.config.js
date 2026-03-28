const path = require('path');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:app': path.resolve(__dirname, '../../apps/General-Store.apk'),
  'appium:appPackage': 'com.androidsample.generalstore',
  'appium:appActivity': 'com.androidsample.generalstore.SplashScreen',
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 60,
  'appium:autoGrantPermissions': true,
};

const serverConfig = {
  hostname: 'localhost',
  port: 4723,
  path: '/',
  logLevel: 'info',
};

module.exports = { capabilities, serverConfig };

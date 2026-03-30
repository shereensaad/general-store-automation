# General Store – Mobile Automation (JavaScript)

> **Appium 2 · WebdriverIO 8 · JavaScript · Mocha · Page Object Model · Data-Driven**

---

## 📁 Project Structure

```
general-store-automation/
├── apps/
│   └── General-Store.apk          ← Place the APK here
├── screenshots/                   ← Failure screenshots (auto-created)
├── src/
│   ├── config/
│   │   └── appium.config.js       ← Capabilities & server settings
│   ├── data/
│   │   └── testData.json          ← Data-driven test users
│   ├── pages/
│   │   ├── BasePage.js            ← Shared driver helpers
│   │   ├── RegistrationPage.js    ← Registration screen POM
│   │   ├── ProductsPage.js        ← Products listing POM
│   │   └── CartPage.js            ← Cart screen POM
│   └── tests/
│       └── generalStore.spec.js   ← Main test suite
├── .gitignore
├── .mocharc.yml
└── package.json
```

---

## ⚙️ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| Java JDK | ≥ 11 |
| Android SDK / `adb` | latest |
| Appium Server | 2.x (installed globally) |
| UiAutomator2 driver | installed via Appium |

```bash
npm install -g appium
appium driver install uiautomator2
```

---

## 🚀 Setup

```bash
# 1 – Clone
git clone https://github.com/shereensaad/general-store-automation.git
cd general-store-automation

# 2 – Install dependencies
npm install

# 3 – Place the APK
mkdir -p apps
cp /path/to/General-Store.apk apps/

# 4 – Start emulator or connect device
adb devices
```

---

## ▶️ Running Tests

```bash
# Terminal 1 – start Appium server
appium --port 4723

# Terminal 2 – run tests
npm test

# With HTML report
npm run test:report
# → mochawesome-report/mochawesome.html
```

---

## 🏗️ Architecture

### Test Flow

```
Launch App
  └─ Registration Screen
       ├─ Select Country  →  "Andorra"
       ├─ Enter Name
       ├─ Select Gender (Male / Female)
       └─ Click "Let's Shop"
              └─ Products Screen
                   ├─ Scroll to product
                   ├─ Add to Cart
                   └─ Tap Cart Icon
                            └─ Cart Screen
                                 └─ Assert product is displayed ✅
```

### Design Patterns

| Pattern | Where |
|---------|-------|
| **Page Object Model** | `src/pages/*.js` – one class per screen |
| **Data-Driven** | `testData.json` → `forEach` generates a full suite per user |
| **Base Page** | `BasePage.js` – shared `waitForElement`, `scrollToText` helpers |

---

## 🔧 Configuration

Edit `src/config/appium.config.js`:

```js
const capabilities = {
  'appium:deviceName': 'Pixel_6_API_33',  // ← your AVD name
  'appium:app': path.resolve(__dirname, '../../apps/General-Store.apk'),
  ...
};
```

---

## 📊 Add More Test Users

Edit `src/data/testData.json`:

```json
{
  "users": [
    { "name": "Ahmed Hassan", "country": "Andorra", "gender": "Male",   "product": "Jordan 6 Rings" },
    { "name": "Sara Ali",     "country": "Andorra", "gender": "Female", "product": "Jordan 6 Rings" }
  ]
}
```

Each entry generates a complete independent suite run.

---

## 📸 Failure Screenshots

Saved automatically to `./screenshots/<test-title>_<timestamp>.png` on any failure.

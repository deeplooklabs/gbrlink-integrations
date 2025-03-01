# Burp Suite - Gbrlink Integration

**[Leia isso em Português](README.pt.md) | [Lea esto en Español](README.es.md)**

This extension allows you to integrate **Gbrlink** directly into **Burp Suite**, facilitating the automated analysis of broken links during your security testing.

---

## 🚀 Installation

### 1️⃣ **Prerequisites**
Before installing the extension, make sure that **Burp Suite** supports **Python** extensions. You can check this by going to:

> **Extender** → **BApp Store** → Check if "Python Environment" is installed.

If it is not installed, follow the official Burp Suite documentation to set up the Python environment.

---

### 2️⃣ **Download the Extension**
Download the `BurpGBRLink.py` file or clone this repository to get the latest version.

---

### 3️⃣ **Edit the API Key**
Before adding the extension to Burp Suite, **you must edit the API key variable**.

1. Open the `BurpGBRLink.py` file in any text editor or IDE.
2. Locate the line where the `API_KEY` variable is defined.
3. **Replace** `""` with your **Gbrlink API key**, as shown below:

```python
API_KEY = "YOUR_GBRLINK_API_KEY"  # 🔴 Replace with your actual key
```

4. Save the file.

---

### 4️⃣ **Add to Burp Suite**
1. Open **Burp Suite**.
2. Navigate to **Extender** → **Extensions**.
3. Click **Add**.
4. Select **Python** as the extension type.
5. Choose the `BurpGBRLink.py` file that you edited.
6. Click **Next** and finalize the installation.

If everything is correct, the extension will be loaded and integrated into the Burp Suite workflow.

---

## ✅ How to Use
- The extension will run automatically within Burp Suite.
- **Gbrlink** will analyze the links captured by the proxy and identify potential vulnerabilities.
- You can view the results directly in the **Extender Output** panel or in the corresponding **Burp** tab.

---

## 🚨 Important
- **The API key is required!** The script **will not work** without a valid Gbrlink key.
- If you do not have a key, subscribe to a plan at [Gbrlink](../README.md#subscribe-to-a-plan-and-get-started).

---

## 📩 Support
If you need help with the installation or have any questions, contact us at [contact@deeplooklabs.com](mailto:contact@deeplooklabs.com).

🚀 **Happy hunting!**
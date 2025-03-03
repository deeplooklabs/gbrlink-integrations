# Tampermonkey - Gbrlink Integration

**[Leia isso em Portugues](README.pt.md) | [Leia esto en Español](README.es.md)**

This script enables **Gbrlink** integration directly into your browser via **Tampermonkey**, facilitating the automatic analysis of broken links on visited pages.

## 🚀 Installation

### 1️⃣ **Install the Tampermonkey Extension**
If you haven't installed Tampermonkey yet, download the extension for your browser:

- **[Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
- **[Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)**
- **[Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
- **[Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)**

### 2️⃣ **Add the Script to Tampermonkey**
1. Open Tampermonkey in your browser and click **"Create a new script"**.
2. Delete the existing content in the editor and paste the code below.
3. **Replace `"GBRLINK_API_KEY"` with your Gbrlink API key**.
4. Save the script by clicking **File → Save** or pressing `Ctrl + S`.

---

## 📜 Script Code

```javascript
// ==UserScript==
// @name         GBRLink
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  GBRLink Sender
// @author       phor3nsic
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const API_URL = 'https://gbrlink.deeplooklabs.com/receive_urls'; // 🔒 DONT CHANGE!!!
    const API_KEY = 'GBRLINK_API_KEY'; // 🔴 CHANGE TO YOUR KEY

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

    function extractUrls(text) {
        const matches = text.match(urlRegex) || [];
        return [...new Set(matches)]; 
    }

    function collectUrls() {
        const collectedUrls = new Set();

        const pageContent = document.documentElement.outerHTML;
        extractUrls(pageContent).forEach(url => collectedUrls.add(url));

        document.querySelectorAll('script[src]').forEach(script => {
            collectedUrls.add(script.src);
        });

        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            collectedUrls.add(link.href);
        });

        document.querySelectorAll('img[src]').forEach(img => {
            collectedUrls.add(img.src);
        });

        document.querySelectorAll('iframe[src]').forEach(iframe => {
            collectedUrls.add(iframe.src);
        });

        document.querySelectorAll('a[href]').forEach(a => {
            if (a.href.startsWith('http')) {
                collectedUrls.add(a.href);
            }
        });

        return Array.from(collectedUrls);
    }

    function sendUrlsToApi(urls) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: API_URL,
            headers: {
                'X-Api-Token': API_KEY,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(urls),
            onload: function(response) {
                console.log('Success to send urls:', response.status, response.responseText);
            },
            onerror: function(error) {
                console.error('Error to send urls:', error);
            }
        });
    }

    window.addEventListener('load', function() {
        setTimeout(() => {
            const urls = collectUrls();
            if (urls.length > 0) {
                console.log('URLs found:', urls);
                sendUrlsToApi(urls);
            } else {
                console.log('No URL found on the page.');
            }
        }, 1000); 
    });
})();
```

---

### ✅ How to Use
1. Visit any website after activating the script in Tampermonkey.
2. The script will automatically check the links on the page using the **Gbrlink** API.
3. **Suspicious links will be highlighted in red**, indicating potential vulnerabilities.

---

### 🚨 Attention
- You must replace `"GBRLINK_API_KEY"` with your actual Gbrlink API key. Otherwise, the script will not work.
- If you do not have a key, subscribe to a plan at [Gbrlink](../README.md#subscribe-to-a-plan-and-get-started).

---

### 📩 Support

If you need help with installation or have any questions, contact us at [contact@deeplooklabs.com](mailto:contact@deeplooklabs.com).

🚀 Enjoy and happy hunting!

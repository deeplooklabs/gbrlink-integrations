# Tampermonkey - Integração com Gbrlink

**[Read this in English](README.md) | [Lea esto en Español](README.es.md)**

Este script permite a integração do **Gbrlink** diretamente no seu navegador através do **Tampermonkey**, facilitando a análise automática de links quebrados em páginas visitadas.

## 🚀 Instalação

### 1️⃣ **Instalar a extensão Tampermonkey**
Se você ainda não tem o Tampermonkey instalado, baixe a extensão para o seu navegador:

- **[Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
- **[Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)**
- **[Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
- **[Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)**

### 2️⃣ **Adicionar o script ao Tampermonkey**
1. Abra o Tampermonkey no seu navegador e clique em **"Criar um novo script"**.
2. Apague o conteúdo do editor e cole o código abaixo.
3. **Substitua `"SUA_GBRLINK_API_KEY"` pela sua chave de API do Gbrlink**.
4. Salve o script clicando em **Arquivo → Salvar** ou pressionando `Ctrl + S`.

---

## 📜 Código do Script

```javascript
// ==UserScript==
// @name         URL Collector and Sender
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  URL Collector and Sender
// @author       phor3nsic
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const API_URL = 'https://gbrlink.deeplooklabs.com/receive_urls'; // 🔒 DONT CHANGE!!!
    const API_KEY = 'GBRLINK_API_KEY'; // 🔴 CHANGE TO YOU KEY

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
                console.log('URLs finded:', urls);
                sendUrlsToApi(urls);
            } else {
                console.log('No URL found on the page.');
            }
        }, 1000); 
    });
})();
```

---

### ✅ Como Usar
1.	Acesse qualquer site após ativar o script no Tampermonkey.
2.	O script verificará automaticamente os links da página com a API do Gbrlink.
3.	Links suspeitos serão destacados em vermelho, indicando possíveis vulnerabilidades.

---

### 🚨 Atenção
- Você deve substituir "GBRLINK_API_KEY" pela sua chave de API real do Gbrlink. Caso contrário, o script não funcionará.
- Se não possui uma chave, assine um plano no [Gbrlink](../README.md#subscribe-to-a-plan-and-get-started).

---

### 📩 Suporte

Se precisar de ajuda com a instalação ou tiver dúvidas, entre em contato via ;[contact@deeplooklabs.com](mailto:contact@deeplooklabs.com).


🚀 Aproveite e boas caçadas!
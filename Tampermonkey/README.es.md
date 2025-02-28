# Tampermonkey - Integración con Gbrlink

**[Leia isso em Português](README.pt.md) | [Read this in English](README.md)**

Este script permite la integración de **Gbrlink** directamente en tu navegador a través de **Tampermonkey**, facilitando el análisis automático de enlaces rotos en las páginas visitadas.

## 🚀 Instalación

### 1️⃣ **Instalar la extensión Tampermonkey**
Si aún no tienes Tampermonkey instalado, descarga la extensión para tu navegador:

- **[Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
- **[Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)**
- **[Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**
- **[Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)**

### 2️⃣ **Agregar el Script a Tampermonkey**
1. Abre Tampermonkey en tu navegador y haz clic en **"Crear un nuevo script"**.
2. Elimina el contenido existente en el editor y pega el código a continuación.
3. **Reemplaza `"GBRLINK_API_KEY"` con tu clave de API de Gbrlink**.
4. Guarda el script haciendo clic en **Archivo → Guardar** o presionando `Ctrl + S`.

---

## 📜 Código del Script

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

    const API_URL = 'https://gbrlink.deeplooklabs.com/receive_urls'; // 🔒 ¡NO CAMBIAR!
    const API_KEY = 'GBRLINK_API_KEY'; // 🔴 ¡CAMBIA POR TU CLAVE!

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
                console.log('Envío de URLs exitoso:', response.status, response.responseText);
            },
            onerror: function(error) {
                console.error('Error al enviar URLs:', error);
            }
        });
    }

    window.addEventListener('load', function() {
        setTimeout(() => {
            const urls = collectUrls();
            if (urls.length > 0) {
                console.log('URLs encontradas:', urls);
                sendUrlsToApi(urls);
            } else {
                console.log('No se encontraron URLs en la página.');
            }
        }, 1000); 
    });
})();
```

---

### ✅ Cómo Usar
1. Visita cualquier sitio web después de activar el script en Tampermonkey.
2. El script verificará automáticamente los enlaces en la página utilizando la API de **Gbrlink**.
3. **Los enlaces sospechosos serán resaltados en rojo**, indicando posibles vulnerabilidades.

---

### 🚨 Atención
- Debes reemplazar `"GBRLINK_API_KEY"` con tu clave de API real de Gbrlink. De lo contrario, el script no funcionará.
- Si no tienes una clave, suscríbete a un plan en [Gbrlink](../README.md#suscribete-y-comienza-ahora).

---

### 📩 Soporte

Si necesitas ayuda con la instalación o tienes preguntas, contáctanos en [contact@deeplooklabs.com](mailto:contact@deeplooklabs.com).

🚀 ¡Disfruta y feliz caza!
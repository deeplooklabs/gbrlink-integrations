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
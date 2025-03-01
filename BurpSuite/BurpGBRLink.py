from burp import IBurpExtender
from burp import IHttpListener
import re
import socket
import json

API_KEY = "" # CHANGE TO YOUR KEY

class BurpExtender(IBurpExtender, IHttpListener):

    def registerExtenderCallbacks(self, callbacks):
        self.callbacks = callbacks
        self.helpers = callbacks.getHelpers()
        callbacks.setExtensionName("GBRLink - BurpSuite")
        callbacks.registerHttpListener(self)

    def processHttpMessage(self, toolFlag, messageIsRequest, messageInfo):
        if not messageIsRequest:
            response = messageInfo.getResponse()
            if response:
                # Capture URLs from header
                headers = self.helpers.analyzeResponse(response).getHeaders()
                for header in headers:
                    self.captureUrls(header)

                # Capture URLs from body
                responseBody = response[self.helpers.analyzeResponse(response).getBodyOffset():]
                # Convert the response in bytes to a string
                responseBodyString = self.helpers.bytesToString(responseBody)
                self.captureUrls(responseBodyString)

    def send_url_to_server(self, url):
        
        url = url.replace(',','#')
        url = url.replace('"','#')
        url = url.replace('\'','#')
        url = url.replace(')','#')
        
        try:
            # Make a socket
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.connect(('gbrlink.deeplooklabs.com', 80))  # Connect to the server
            
            # Make HTTP Request
            json_data = json.dumps([url])
            message = "POST /receive_urls HTTP/1.1\r\n" \
                      "Host: gbrlink.deeplooklabs.com\r\n" \
                      "Content-Type: application/json\r\n" \
                      "X-Api-Key: {}\r\n" \
                      "Content-Length: {}\r\n" \
                      "\r\n" \
                      "{}".format(API_KEY ,len(json_data), json_data)
            
            sock.sendall(message.encode('utf-8'))
            sock.close()
            print("URL sent successfully:", url)
        except Exception as e:
            print("Error sending URL:", e)

    def captureUrls(self, text):
        regex = r'(https?://[^\s/$.?#].[^\s]*|wss://[^\s/$.?#].[^\s]*)'
        urls = re.findall(regex, text)
        for url in urls:
            self.send_url_to_server(url)  
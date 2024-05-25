## Summary
This is a **very simple** angular chat application, that uses simple session based users.
Opening another tab is enough to become another user, and once you close a tab, you can never be that user again.
Even if you use the same username, you'll see your previous messages as sent by a different user with the same name.

Similarily, changing your name mid session won't distort your existing green bubbles(which in this context is bubbles that display messages written by you).
Other users will see the messages as written by A and then B, but you will see all of your messages as your own, as long as you don't close the tab.

## Requirements
You can run this project using my server, or your own.

To run it my way you'll need 4 things
<ol>
    <li>This repo cloned</li>
    <li><a href="https://github.com/ALONUCLEAR/c-sharp-web-socket-server" target="_blank" style="text-decoration: none;">The server's repo</a> cloned</li>
    <li>A compatible node version(preferably 18.16.0 onwards since I used this version)</li>
    <li>
        A way to run c# 6 .Net Api's (like Visual Studio)
        <br> Note: if port 1234 is occupied, the server Readme has a guide on switching to another port.
    </li>
</ol>

To run it using your own server you'll need
<ol>
    <li>This repo cloned</li>
    <li>A compatible node version(preferably 18.16.0 onwards since I used this version)</li>
    <li>
        To change the <code>route</code> variable in <code>web-socket.service.ts</code> to whatever route you expose.
        <br> Note: the <code>s</code> in the beginning singnifies that the server exposes wss and https, so if it doesn't, your route should start with <code>://</code> without the <code>s</code>.
        <br> Also make sure that you use the right port.
    </li>
</ol>
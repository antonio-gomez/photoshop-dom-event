## Photoshop-DOM-Event

[![npm-image](https://img.shields.io/badge/npm-v1.1.0-ff69b4.svg)](https://www.npmjs.com/package/photoshop-dom-event)
![version-image](https://img.shields.io/badge/license-MIT-ff69b4.svg)


#### Install
--------

```
npm install photoshop-dom-event --save
```


#### Requirements
--------

[CSInterface][0] v5.x or higher


#### Description
-----------

Node.js module for listening to Adobe Photoshop DOM events from a CEP HTML/JavaScript Extension (Custom Panel).

For registering a Photoshop event callback is necessary to specify the charID or stringID that is expected to listen.

Various charIDs that can be used are documented in [Photoshop Javascript reference][1], **Appendix A: Event ID Codes** or by usign Adobe Photoshop [Scripting Listener Plug-in][2] to identify the corresponding eventID. 

To mantain Photoshop stability, event listeners can be started or stopped during extension execusion by using the corresponding methods described below.


#### Usage
--------

```
var csInterface  = new CSInterface();
var photoshopDOM = require('photoshop-dom-event');

// Start listening for an event passing the corresponding charID or stringID
photoshopDOM.onEvent('placedLayerEditContents', function(eventData) {
  console.log('Editing Photoshop Smart Layer', eventData);
});

// Later in your code
photoshopDOM.stopListeningEvent('placedLayerEditContents');
```


#### Example
--------

[Example Photoshop extension][4] demostrating module basic functionality.

The extension listens for the Layer Selection (slct) eventID and logs the eventData retrived to the console, the 'Remove Listener' button fires the method that unregisters the 'slct' event from the extension.


#### Scope
--------

Tested in Adobe Photoshop CC2014 (v15.x), Adobe Photoshop CC2015 (v16.x) and Adobe Photoshop CC2015.5 (v17.x)


#### Changelog
--------

**v1.1.0 (Jul 24 2016)**
*    Including extension example demostrating module basic functionality for registering and unregistering event listeners.

**v1.0.0 (Jul 24 2016)**
*    Listening to Photoshop DOM events by passsing the corresponding charID or stringID of the event to register.
*    Stop listening to events based on the provided charID or stringID.
*    Handling unique event callbacks for Adobe Photoshop CC2014.

**v0.0.0 (Jul 23 2016)**
*    Initial development.


--------
## License
MIT © [Antonio Gomez][2]

[0]: https://github.com/Adobe-CEP/CEP-Resources
[1]: http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref-2015.pdf
[2]: http://www.adobe.com/devnet/photoshop/scripting.html
[3]: http://antoniogomez.me/
[4]: https://github.com/antonio-gomez/photoshop-dom-event/tree/master/example
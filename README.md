## Photoshop-DOM-Event

[![npm-image](https://img.shields.io/badge/npm-v1.0.0-ff69b4.svg)](https://www.npmjs.com/package/photoshop-dom-event)
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

Various charIDs that can be used are documented in [Photoshop Javascript reference][1], Appendix A: Event ID Codes or by usign Adobe Photoshop [Scripting Listener Plug-in][2] to identify the corresponding eventID. 

To mantain Photoshop stability, event listeners can be started or stopped during extension execusion by using the corresponding methods described below.

#### Example
--------
```
var csInterface  = new CSInterface();
var photoshopDOM = require('photoshop-dom-event');

// Start listening for an event passing the corresponding stringID
photoshopDOM.onEvent('placedLayerEditContents', function(eventData) {
  console.log('Editing Photoshop Smart Layer', eventData);
});

// Later in your code
photoshopDOM.stopListeningEvent('placedLayerEditContents');
```


#### Changelog
--------

**0.0.0 (Jul 23 2016)**
*    Initial development.

--------
## License
MIT © [Antonio Gomez][2]

[0]: https://github.com/Adobe-CEP/CEP-Resources
[1]: http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref-2015.pdf
[2]: http://www.adobe.com/devnet/photoshop/scripting.html
[3]: http://antoniogomez.me/
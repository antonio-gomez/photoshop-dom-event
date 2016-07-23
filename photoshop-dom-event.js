/*
 *
 *  Photoshop-DOM-Event
 *  Node.js module for listening to Adobe Photoshop DOM events from a CEP HTML/JavaScript Extension (Custom Panel).
 *  Author: Antonio Gomez (https://github.com/antonio-gomez)
 *
 *  @@link https://github.com/antonio-gomez/photoshop-dom-event
 *  @version v1.0.0
 *  @license MIT
 *
 */

;(function() {
	
	'use strict';
	
	var package = require('package.json');
	
	function PhotoshopDOMEvent() {
		this._init();
	}
	
	// Private
	PhotoshopDOMEvent.prototype._init = function() {
		
	};
	
	// Public
	PhotoshopDOMEvent.prototype.startListeningEvent = function(event) {
		
	};
	
	// Public
	PhotoshopDOMEvent.prototype.onEvent = function(event, callback) {
		
	};
	
	// Public
	PhotoshopDOMEvent.prototype.stopListeningEvent = function(event) {
		
	};
	
	// Public
	PhotoshopDOMEvent.prototype.verson = package.version;
	
	module.exports = new PhotoshopDOMEvent;
	
})();
/*
 *
 *  Photoshop-DOM-Event
 *  Node.js module for listening to Adobe Photoshop DOM events from a CEP HTML/JavaScript Extension (Custom Panel).
 *  Author: Antonio Gomez (https://github.com/antonio-gomez)
 * 
 *  Inspired by Davide Barranca's HTML Panel Tips #18
 *  http://www.davidebarranca.com/2015/09/html-panel-tips-18-photoshop-json-callback/
 *
 *  @link https://github.com/antonio-gomez/photoshop-dom-event
 *  @version v1.0.0
 *  @license MIT
 *
 */


;(function() {
	
	'use strict';
	
	var Q   = require('q'),
		pkg = require('./package.json');
	
    /*
     * Module constructor
	 * @constructor
     */	
	function PhotoshopDOMEvent() {
		this._init();
	}
	
	// Private
	PhotoshopDOMEvent.prototype._init = function() {
		var self = this;
		
		if(CSInterface === undefined || typeof CSInterface !== 'function') {
			throw new Error('Include Adobe CSInterface v5.x library to your Adobe Photoshop extension.');
		} else {
			this._csInterface     = new CSInterface();
    		this._extensionId     = this._csInterface.getExtensionID();
			this._registredEvents = [];
			this._hostVersion     = this._getHostVersion();
			this.globalEventType  = this._hostVersion == 15 ? 'PhotoshopCallback' : 'com.adobe.PhotoshopJSONCallback' + self._extensionId;
			this._now             = new Date(Date.now());
			
			// Global event listener for PhotoshopJSONCallback event
			this._csInterface.addEventListener(this.globalEventType, function(csEvent) {
				var eventFiredDate;

				// Avoid multiple event call stack error on Adobe Photoshop CC2014
				if(self._hostVersion == 15) {
					eventFiredDate = new Date(Date.now());

					if(self._now.toString() !== eventFiredDate.toString()) {
						self._now = eventFiredDate;
						self._callbackManager(csEvent);
					}	
				} else {
					self._callbackManager(csEvent);
				}
			});
		}
	};
	
	// Public
	PhotoshopDOMEvent.prototype.version = pkg.version;
			
	// Public
	PhotoshopDOMEvent.prototype.onEvent = function(eventID, callback) {
		var self = this;
		
		this._eventRegistrator('register', eventID, callback)
			.then(function(typeID) {
				if(typeID) {
					return typeID;
				} else {
					callback.call(undefined, new Error("Can't register listener for the provided eventID."));
				}
			})
			.catch(function(err) {
				throw new Error("Can't register listener for the provided eventID: " + eventID);
			});
	};
	
	// Public
	PhotoshopDOMEvent.prototype.stopListeningEvent = function(eventID) {
		return this._eventRegistrator('unregister', eventID, undefined)
			.then(function(eventID) {
				return eventID;
			})
			.catch(function(eventID) {
				throw new Error("Can't unregister listener for the provided eventID: " + eventID);
			});
	};		
	
	// Helpers
	
	PhotoshopDOMEvent.prototype._eventRegistrator = function(status, eventID, callback) {
		var self = this;
		var deferred = Q.defer();
		var type = status == 'register' ? 'com.adobe.PhotoshopRegisterEvent' : 'com.adobe.PhotoshopUnRegisterEvent';
		var event = new CSEvent(type, 'APPLICATION');
		
		this._getTypeID(eventID)
			.then(function(typeID) {
				try {
					event.data = typeID;
					event.extensionId = self._extensionId;
					self._csInterface.dispatchEvent(event);
				} catch(err) {
					deferred.reject(eventID);
				}
				
				// Adding current event to the array of registered events
				if(status == 'register') {
					self._registredEvents.push({ eventID : eventID, typeID : typeID, callback : callback });
					deferred.resolve(typeID);
				} else if(status == 'unregister') {
					var eventsCount = self._registredEvents.length;
					
					for(var unRegistredEvent in self._registredEvents) {
						if(self._registredEvents[unRegistredEvent].eventID == eventID) {
							self._registredEvents.splice(unRegistredEvent, 1);
						}
					}
					// Item was removed from the registered events array
					if(eventsCount !== self._registredEvents.length) {
						deferred.resolve(eventID);
					} else {
						deferred.reject(eventID);
					}
				}
			})
			.catch(function(err) {
				deferred.reject(err);
			});
		
		return deferred.promise;
	};
	
	PhotoshopDOMEvent.prototype._callbackManager = function(rawCSEventData) {
		var self = this;
		
		this._cleanRetrievedData(rawCSEventData)
			.then(function(data) {
				for(var registredEvent in self._registredEvents) {
					if(self._registredEvents[registredEvent].typeID == data.eventID) {
						self._registredEvents[registredEvent].callback.call(undefined, data);
					}
				}
			})
			.catch(function(err) {
				throw new Error('Callback manager: ' + err);
			})
	};
	
    PhotoshopDOMEvent.prototype._getHostVersion = function() {
        // Adobe Photoshop CC2014   -> 15.x.x  (15)
        // Adobe Photoshop CC2015   -> 16.x.x  (16)
        // Adobe Photoshop CC2015.5 -> 17.x.x  (17)
        
        return Number(this._csInterface.getHostEnvironment().appVersion.split('.')[0]);
    };	
	
	PhotoshopDOMEvent.prototype._getTypeID = function(eventId) {
		var self = this;
        var deferred = Q.defer();
		
		this._csInterface.evalScript('app.charIDToTypeID("' + eventId + '");', function(typeID) {
			if(typeID.toString() === 'EvalScript error.') {
				self._csInterface.evalScript('app.stringIDToTypeID("' + eventId + '");', function(typeID) {
					deferred.resolve(typeID);
				});
			} else {
				deferred.resolve(typeID);
			}
		});
		
        return deferred.promise;		
	};
	
	PhotoshopDOMEvent.prototype._cleanRetrievedData = function(rawCSEventData) {
		var self = this;
        var deferred = Q.defer();
		var dataToSend = {};
		
		// Adobe Photoshop CC2014
		if(this._getHostVersion() === 15) {
			dataToSend.extensionId = self._extensionId;
			dataToSend.eventID     = rawCSEventData.data.split(',')[0];
			dataToSend.appId       = rawCSEventData.appId;
			dataToSend.type        = rawCSEventData.type;
			dataToSend.scope       = rawCSEventData.scope
			dataToSend.eventData   = {};
			
			deferred.resolve(dataToSend);
			
		// Adobe Photoshop CC2015 && // Adobe Photoshop CC2015.5
		} else {
			if(typeof rawCSEventData.data === 'string') {
				dataToSend.extensionId = self._extensionId;
				dataToSend.eventData   = JSON.parse(rawCSEventData.data.replace('ver1,{', '{')).eventData;
				dataToSend.eventID     = JSON.parse(rawCSEventData.data.replace('ver1,{', '{')).eventID;
				dataToSend.appId       = rawCSEventData.appId;
				dataToSend.type        = rawCSEventData.type;
				dataToSend.scope       = rawCSEventData.scope
				
				deferred.resolve(dataToSend);
			} else {
				deferred.reject('Unknown data type retrieved from the CS Event. Expected a string for csEvent.data');
			}
		}
		
		return deferred.promise;
	};
	
	module.exports = new PhotoshopDOMEvent;
	
})();
/**
 * Picture model events
 */

'use strict';

import {EventEmitter} from 'events';
var Picture = require('../../sqldb').Picture;
var PictureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PictureEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Picture) {
  for(var e in events) {
    let event = events[e];
    Picture.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    PictureEvents.emit(event + ':' + doc._id, doc);
    PictureEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Picture);
export default PictureEvents;

let EventEmitter = require('events');

class EventTrack extends EventEmitter{
    constructor(){
        super();
    }
}

let eventTrack = new EventTrack();

eventTrack.on('newListener', (eventName, listner) => {
    console.log("Event name added: ", eventName, '\nlistner toString: ', listner.toString());
});

eventTrack.on('listenerA', () => {
    // this will cause 'newListener' to fire
});

eventTrack.on('listenerB', () => {
    // this will cause 'newListener' to fire
});
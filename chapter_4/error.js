const EventEmitter = require('events');

class MusicPlayer extends EventEmitter {

}

let musicPlayer = new MusicPlayer();

musicPlayer.on('play', function () {
    this.emit('error', 'unable to play');
});

musicPlayer.on('error', function (err) {
    console.log('Error:',err);
});

setTimeout(function () {
    musicPlayer.emit('play');
},1000);
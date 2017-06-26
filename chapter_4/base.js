const EventEmitter = require('events');

let AudioDevice = {
    play: function (track) {
        console.log('play', track);
    },
    stop: function () {
        console.log('stop')
    }
};

class MusicPlayer extends EventEmitter {
    constructor() {
        super();
        this.playing = false;
    }
}

let musicPlayer = new MusicPlayer();

musicPlayer.on('play', function (track) {
    this.playing = true;
    AudioDevice.play(track);
});

musicPlayer.on('stop', function () {
    this.playing = false;
    AudioDevice.stop();
});

let secondPlay = function () {
    console.log('second play event');

};

musicPlayer.on('play', secondPlay);

// musicPlayer.removeAllListeners();
// musicPlayer.removeAllListeners('play');
// musicPlayer.removeListener('play', secondPlay);

musicPlayer.emit('play', '演员');

setTimeout(() => {
    musicPlayer.emit('stop')
}, 1000);

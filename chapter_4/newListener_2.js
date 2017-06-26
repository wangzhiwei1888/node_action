// 在新建监听器事件中自动触发事件

let EventEmitter = require('events');

class Pulsar extends EventEmitter {
    constructor(speed, times) {
        super();
        this._speed = speed;
        this._times = times;
        this.on('newListener', (eventName, listener) => {
            if (eventName == 'pulse') {
                this.start();
            }
        })
    }

    start() {
        let timer = setInterval(() => {
            this.emit('pulse');
            this._times--;
            if (this._times <= 0) {
                clearInterval(timer);
            }
        }, this._speed);
    }

    stop() {
        if(this.listenerCount('pulse') == 0){
            throw new Error('No listeners have been added ! ')
        }
    }
}

let pulsar = new Pulsar(1000, 5);

pulsar.on('pulse', () => {
    console.log('.');
});

pulsar.on('pulse', () => {
    console.log('-');
});

console.log(pulsar.listeners('pulse'));


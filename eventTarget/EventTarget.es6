/*
* 发布/订阅模式：EventTarget 的简单实现
* */
class EventTarget {

    constructor() {
        this.listeners = {};
    };

    addEventListener(type, callback) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    };

    removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
            return;
        }
        let stack = this.listeners[type];
        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return this.removeEventListener(type, callback);
            }
        }
    };

    dispatchEvent(event) {
        if (!(event.type in this.listeners)) {
            return;
        }
        let stack = this.listeners[event.type];
        event.target = this;
        for (let i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }

    }
}
(function (root) {

    /*
     * 发布/订阅模式：EventEmitter的简单实现
     * */
    class EventEmitter {
        constructor() {
            this.listeners = {};
        };

        on(type, callback) {
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
        };

        off(type, callback) {
            if (!(type in this.listeners)) {
                return;
            }
            if (!callback) {
                this.listeners[type] = [];
            }
            let stack = this.listeners[type];
            for (let i = 0, l = stack.length; i < l; i++) {
                if (stack[i] === callback) {
                    stack.splice(i, 1);
                    return this.off(type, callback);
                }
            }
        };

        emit(type, ...rest) {
            if (!(type in this.listeners)) {
                return;
            }
            let stack = this.listeners[type];
            for (let i = 0, l = stack.length; i < l; i++) {
                stack[i](...rest)
            }
        }
    }

    class Deferred {
        constructor(onFulfilled, onRejected, resolve, reject) {
            this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
            this.onRejected = typeof onRejected === 'function' ? onRejected : null;
            this.resolve = resolve;
            this.reject = reject;
        }
    }

    /*
     * Promise的简单实现
     * */
    class MyPromise extends EventEmitter {
        constructor(fn) {
            super();
            if (typeof fn !== 'function') {
                throw new TypeError('not a function');
            }
            this.id = ++MyPromise.id;
            this._state = null;
            this._value = null;
            this._deferreds = [];
            this.on('resolve', this._resolveListener.bind(this));
            this.on('reject', this._rejectListener.bind(this));
            this._doFn(fn);
        }

        _doFn(fn) {
            MyPromise.log && console.log(`${this.id}：_doFn`);
            let done = false;
            try {
                fn(value => {
                    if (done) return;
                    done = true;
                    this.emit("resolve", value);
                }, reason => {
                    if (done) return;
                    done = true;
                    this.emit("reject", reason);
                })
            }
            catch (e) {
                if (done) return;
                done = true;
                this.emit("reject", e);
            }
        }

        _resolveListener(value) {
            MyPromise.log && console.log(`${this.id}：_resolveListener`);
            try {
                if (value && (typeof value === 'object' || typeof value === 'function')) {
                    let then = value.then;
                    if (typeof then === 'function') {
                        this._doFn(then.bind(value));
                        return;
                    }
                }
                this._state = true;
                this._value = value;
                this._finale();
            }
            catch (e) {
                this.emit("reject", e)
            }
        }

        _rejectListener(value) {
            this._state = false;
            this._value = value;
            this._finale();
        }

        _finale() {
            MyPromise.log && console.log(`${this.id}：_finale`);
            for (let i = 0, len = this._deferreds.length; i < len; i++) {
                this._handle(this._deferreds[i])
            }
            this._deferreds = null;
        }

        _handle(deferred) {
            MyPromise.log && console.log(`${this.id}：_handle`);
            if (this._state === null) {
                this._deferreds.push(deferred);
                return;
            }

            // 立即resolve的Promise，原生ES6的实现：是在本轮事件循环结束时，不是在下一轮事件循环的开始时。
            //TODO: MyPromise的实现是在下一轮事件循环的开始时，后续研究如何实现MicroTask,

            this._setImmediate(() => {
                let cb = this._state ? deferred.onFulfilled : deferred.onRejected;
                if (cb === null ) { // typeof cb !== "function"
                    (this._state ? deferred.resolve : deferred.reject)(this._value);
                    return;
                }
                let ret;
                try {
                    ret = cb(this._value);
                }
                catch (e) {
                    deferred.reject(e);
                    return;
                }
                deferred.resolve(ret);
            });
        }

        _setImmediate(fn) {
            //TODO 定时器到底是什么 研究定时器、process.nextTick的底层实现
            return (typeof setImmediate === 'function' && setImmediate(fn)) || setTimeout(fn, 0);
        }

        then(onFulfilled, onRejected) {
            MyPromise.log && console.log(`${this.id}：then`);
            return new MyPromise((resolve, reject) => {
                this._handle(new Deferred(onFulfilled, onRejected, resolve, reject));
            });
        }

        catch(onRejected) {
            return this.then(null, onRejected);
        }

        finally(callback) {
            return this.then(
                value => MyPromise.resolve(callback()).then(() => value),
                reason => MyPromise.resolve(callback()).then(() => {
                    throw reason
                })
            )
        };

        static resolve(value) {
            if (value && typeof value === 'object' && value instanceof MyPromise) {
                return value;
            }
            return new MyPromise(resolve => {
                resolve(value);
            });
        };

        static reject(value) {
            return new MyPromise((resolve, reject) => {
                reject(value);
            });
        };

        static race() {
            let args = Array.from(arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments);
            return new MyPromise((resolve, reject) => {
                for (let i = 0, len = args.length; i < len; i++) {
                    if (args[i] instanceof MyPromise) {
                        args[i].then(resolve, reject);
                    }
                    else {
                        MyPromise.resolve(args[i]).then(resolve, reject);
                    }
                }
            });
        };

        static all() {
            let args = Array.from(arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments);
            return new MyPromise((resolve, reject) => {
                if (args.length === 0) return resolve([]);
                let remaining = args.length;

                function res(index, value) {
                    try {
                        if (value instanceof MyPromise) {
                            value.then(v => res(index, v), reject);
                            return;
                        }
                        args[index] = value;
                        if (--remaining === 0) {
                            resolve(args);
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                }

                for (let i = 0; i < args.length; i++) {
                    res(i, args[i]);
                }
            });
        };

    }

    MyPromise.id = 0;
    MyPromise.log = false;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = MyPromise;
    }
    else {
        root.MyPromise = MyPromise;
    }

})(this);
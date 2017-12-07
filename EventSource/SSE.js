function noop() {

}

class SSE {
    constructor(req, res, opts = {}) {
        this.esId = ++SSE.eventId;
        this.lastEventId = req.headers['last-event-id'] || null;
        this._res = res;
        this._onClose = opts.onClose || noop;
        req.on("aborted", this._onClose).on("error", this._onClose).on("close", this._onClose);
        res.on("aborted", this._onClose).on("error", this._onClose).on("close", this._onClose).on("end", this._onClose);
        res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            "Cache-Control": "no-cache",
            'Connection': 'keep-alive'
        });
        if (opts.keepAlive) {
            this._keepAlive();
            this.interval = setInterval(this._keepAlive.bind(this), 15000)
        }
    }

    _keepAlive() {
        this.sendComment('Keep-Alive');
    }

    _send(opts = {}) {
        opts.value = opts.value || '';
        opts.field = (typeof opts.field === 'string') ? opts.field : 'data';
        opts.value = (typeof opts.encode === 'function') ? opts.encode(opts.value) : this._encode(opts.value);
        this._res.write(opts.field + ': ' + opts.value + '\n');
        if (!opts.field || opts.field == 'data') {
            this._res.write('\n');
        }
    }

    _sendData(data) {
        this._send({
            field: 'data',
            value: data
        });
    }

    _sendEvent(event) {
        this._send({
            field: "event",
            value: event,
            encode: String
        });
    }

    _sendId(id) {
        this.lastEventId = String(id);
        this._send({
            field: 'id',
            value: id,
            encode: String
        });
    }

    _sendRetry(ms) {
        ms = parseInt(ms);
        if (isNaN(ms)) {
            throw new TypeError("not a number");
        }
        this._send({
            field: 'retry',
            value: ms,
            encode: String
        });
    }

    _encode(value) {
        return JSON.stringify(value);
    }

    sendComment(text) {
        return this._send({
            field: '',
            value: text,
            encode: String
        });
    }

    sendMessage(opts) {
        if (opts.event) {
            this._sendEvent(opts.event);
        }
        if (opts.id) {
            this._sendId(opts.id);
        }
        if (opts.retry) {
            this._sendRetry(opts.retry);
        }
        this._sendData(opts.data);
    }

    close() {
        this.interval && clearInterval(this.interval);
        this._res.end();
    }
}

SSE.eventId = 0;

module.exports = SSE;
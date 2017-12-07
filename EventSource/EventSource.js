function noop() {
}

class EventSource {
    constructor(req, res, options) {
        this.res = res;
        this._onClose = options.onClose || noop;
        let onClose = this.onClose.bind(this);
        req.on("aborted", onClose).on("error", onClose);
        res.on("aborted", onClose).on("error", onClose).on("close", onClose).on("end", onClose);
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            'Connection': 'keep-alive'
        });
        if (options._keepAlive) {
            this.alive();
            this.interval = setInterval(this.alive.bind(this), 15000)
        }
    }

    onClose() {
        this.interval && clearInterval(this.interval);
        this._onClose && this._onClose();
        this.interval = this._onClose = null
    }

    end() {
        this.res.end();
        this.onClose();
    }

    // 发送一条消息注释行,以保持连接不断
    comment(text) {
        this.res.write(":" + text + "\n\n");
    }

    alive() {
        this.comment("keepalive");
    }

    emit(type, data) {
        this.res.write("event: " + type + "\n"
            + "data: " + JSON.stringify(data)
            + "\n\n");
    }
}

module.exports = EventSource;
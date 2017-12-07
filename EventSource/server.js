const SSE = require('./SSE.js');
const http = require("http");

let sseServer = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let sse = new SSE(req, res, {keepAlive: true});

    sse.sendMessage({
        data: 'This is a message',
        id: sse.esId,
    });

    sse.sendMessage({
        event: 'message',
        id: sse.esId,
        data: "This is another message"
    });

    let times = 0;
    let interval = setInterval(() => {

        sse.sendMessage({
            event: "time",
            id: sse.esId,
            data: {time:  Date.now()},
        });

        if (++times >= 5) {
            sse.close();
            clearInterval(interval)
        }
    }, 3000);

});

sseServer.listen(9876);
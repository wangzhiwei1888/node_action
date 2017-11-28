const ws = require("nodejs-websocket");

let connectCount = 0;

let server = ws.createServer((conn) => {
    connectCount++;
    let msg = {
        type: 'enter',
        data: `user${connectCount} come in`
    };
    broadcast(JSON.stringify(msg));
    conn.on("text", function (str) {
        let msg = {
            type: 'message',
            data: `[user${connectCount}]: ${str}`
        };
        broadcast(JSON.stringify(msg));
    });
    conn.on("close", function (code, reason) {
        let msg = {
            type: 'left',
            data: `user${connectCount} left`
        };
        broadcast(JSON.stringify(msg));
    });
    conn.on("error", function (err) {
        console.error(`error: ${err}`);
    })
}).listen(8800);

function broadcast(str) {
    server.connections.forEach(conn => {
        conn.sendText(str);
    });
}
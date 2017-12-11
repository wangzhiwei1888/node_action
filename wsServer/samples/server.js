
const ws = require('../wsServer/index.js');

ws.createServer(conn => {
    conn.on("text", function (str) {
        console.log('receive msg form client: ',str);
        conn.sendText(str.toUpperCase() + "!")
    });
    conn.on("error", function (e) {
        console.log(e)
    })
}).listen(8001, "127.0.0.1");
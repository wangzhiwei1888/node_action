
const ws = require('../wsServer/index.js');

let connectionCount = 0;


let server = ws.createServer(conn => {
    connectionCount++;
    broadcast(`hello,  connection ${connectionCount}. -- from ws server`);

    conn.on("text",  (str) => {
        console.log('receive msg form client: ',str);
        conn.sendText(str.toUpperCase() + "!")
    });

    conn.on("close", function (code, reason) {
        let msg = {
            type: 'left',
            data: `user${connectionCount} left`
        };
        broadcast(JSON.stringify(msg));
    });

    conn.on("error",  (err) => {

    });

});

let port = 8001;

server.listen(port, "127.0.0.1",() => {
    console.log(`Server is listening in port: ${port}`);
});

function broadcast(str) {
    server.connections.forEach(conn => {
        conn.sendText(str);
    });
}
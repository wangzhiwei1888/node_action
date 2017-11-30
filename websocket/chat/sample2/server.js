const http = require("http");
const fs = require("fs");
const ws = require("nodejs-websocket");

http.createServer((req, res) => {
    fs.createReadStream("client.html").pipe(res)
}).listen(8080);

const server = ws.createServer((connection) => {
    connection.nickname = null;
    connection.on("text", (str) => {
        if (connection.nickname === null) {
            connection.nickname = str;
            broadcast(str + " entered")
        }
        else
            broadcast("[" + connection.nickname + "] " + str)
    });
    connection.on("close", function () {
        broadcast(connection.nickname + " left")
    })
});
server.listen(8081);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}
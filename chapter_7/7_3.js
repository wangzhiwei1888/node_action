const net = require('net');

let server = net.createServer(client => {
    client.setNoDelay(true);
    client.write("377375042377373001\n", "binary");
    console.log('server connected');

    client.on('end', () => {
        console.log("server disconnected");
        server.unref();
    });

    client.on("data", data => {
        process.stdout.write("you receive from client :" + data.toString());
        client.write("you send to server :" + data.toString());
    })
});

server.listen(8000, () => {
    console.log("Server stared on port 8000");
});
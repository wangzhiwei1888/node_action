const assert = require("assert");
const net = require("net");

let clients = 0;
let expectedAssertions = 2;
let server = net.createServer(client => {
    clients++;
    let clientId = clients;
    console.log('Client connected:', clientId);

    client.on('end', () => {
        console.log("Client disconnected:", clientId);
    });

    client.write("Welcome client: " + clientId + '\r\n');
    client.pipe(client);
});

server.listen(8000, () => {
    console.log("Server stared on port 8000");
    runTest(1, () => {
        runTest(2, () => {
            console.log("Test finished");
            assert.equal(0, expectedAssertions);
            server.close();
        })
    })
});

function runTest(expectedId, done) {
    let client = net.connect(8000);

    client.on('data', data => {
        let expected = "Welcome client: " + expectedId + "\r\n";
        assert.equal(data.toString(), expected);
        expectedAssertions--;
        client.end();
    });

    client.on('end', done);
}
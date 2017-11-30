const http = require("http");
const socketIo = require("socket.io");

let app = http.createServer();
let io = socketIo(app);
app.listen(8001);
let connectCount = 0;

io.on('connection', function (socket) {
    connectCount++;

    let nickName = `user${connectCount}`;

    io.emit("enter", `${nickName} come in`);

    socket.on("message", data => {
        io.emit("message", `[${nickName}]: ${data}`);
    });

    socket.on("disconnect", () => {
        io.emit("left", `${nickName} left`);
    });
});


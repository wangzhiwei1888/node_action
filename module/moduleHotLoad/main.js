const Module = require("module");
const http = require("http");
const fs = require("fs");
const PORT = 8900;

let hotModule = require("./hotModule.js");

let httpServer = http.createServer((req, res) => {
    res.end(hotModule.greet());
});

httpServer.listen(PORT, () => {
    console.log(`server is listening in ${PORT}`)
});

function resolvePath(module) {
    return require.resolve(module);
}

function cleanCache(module) {
    let path = resolvePath(module);
    delete Module._cache[path];
}

fs.watchFile(resolvePath("./hotModule.js"), () => {
    cleanCache("./hotModule.js");
    try {
        console.log("update hotModule ...");
        hotModule = require("./hotModule.js");
    } catch (e) {
        console.error(e);
    }
});

const http = require('http');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {
    let testFile = path.join(__dirname, 'index.html');
    // FS.readFile(testFile, function (err, data) {
    //     if(err){
    //         res.statusCode = 500;
    //         res.end(err.toString())
    //     }else {
    //         res.end(data);
    //     }
    // });
    res.writeHead(200, {'content-encoding': 'gzip'});
    fs.createReadStream(testFile)
        .pipe(zlib.createGzip())
        .pipe(res);
}).listen(2017);
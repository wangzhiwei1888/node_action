const assert = require("assert");
const http = require("http");
const Q = require('q');

// let server = http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.write("Hello world. \r\n");
//     res.end();
// });
//
// server.listen(8000, () => {
//     console.log("Listening on port 8000");
// });

let s = 0;
for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        let start = +new Date;
        let req = http.request({
            port: 9099,
            path: `/pages/video/list.jsx?_${+new Date}`,
        }, res => {
            // console.log("HTTP headers:", res.headers);
            res.on('data', data => {
                 // console.log("Body:", data.toString());
                // assert.equal("Hello world. \r\n", data.toString());
                // assert.equal(200, res.statusCode);

            });

            res.on('end', () => {
                let d = +new Date - start;
                console.log(`第${i}次请求响应耗时:`, d, 'ms');
                s += d;
                console.log('已响应请求的总耗时:', s, 'ms')
            })
        });
        req.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        req.end();
    }, 1000);
}


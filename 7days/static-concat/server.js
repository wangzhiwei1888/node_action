const http = require("http");
const fs = require("fs");
const path = require("path");

let MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function combineFiles(pathnames, callback) {
    let output = [];
    (function next(i, len) {
        if (i < len){
            fs.readFile(pathnames[i], function (err, data) {
                if(err){
                    callback(err);
                }else {
                    output.push(data);
                    next(i+1, len);
                }
            })
        }else{
            callback(null, Buffer.concat(output))
        }
    })(0, pathnames.length)
}

function main(argv) {
    let config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));
    let root = config.root || '.';
    let port = config.port || 80;

    http.createServer((req, res) => {
        let urlInfo = parseURL(root, req.url);
        combineFiles(urlInfo.pathnames, (err, data) => {
            if(err){
                res.writeHead(404);
                res.end(err.message);
            }else {
                res.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                res.end(data);
            }
        })
    }).listen(port);
}

function parseURL(root, url) {
    let base, pathnames, parts;
    if (url.indexOf('??') === -1){
        url = url.replace('/', '/??');
    }
    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].spilit(',').map(v => path.join(root, base, v));
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    }
}

main(process.argv.slice(2));
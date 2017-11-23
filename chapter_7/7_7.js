const http = require("http");
const https = require("https");
const url = require("url");

let request;

class Request {
    constructor() {
        this.maxRedirects = 10;
        this.redirects = 0;
    }

    get(href, callback) {
        let uri = url.parse(href);
        let options = {host: uri.host, path: uri.path};
        let httpGet = uri.protocol === 'http' ? http.get : https.get;
        console.log('GET', href);

        let processRes = res => {
            if (res.statusCode >= 300 && res.statusCode <= 400) {
                if (this.redirects >= this.maxRedirects) {
                    this.error = new Error("Too many redirects for:", href);
                }
                else {
                    this.redirects++;
                    href = url.resolve(options.host, res.headers.location);
                    return this.get(href, callback);
                }
            }
            res.url = href;
            res.redirects = this.redirects;
            console.log("Redirected", href);

            let end = () => {
                console.log("Connection ended");
                callback(this.error, res);
            };

            res.on("data", data => {
                console.log('Got data, length:', data.length);
            });
            res.on('end', end.bind(this))
        };

        httpGet(options, processRes.bind(this))
        .on('err', err => {
            callback(err);
        });
    };
}

request = new Request();
request.get('http://www.baidu.com/', (err, res) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Fetch URL:', res.url, 'with', res.redirects, 'redirects');
        process.exit(0);
    }
});

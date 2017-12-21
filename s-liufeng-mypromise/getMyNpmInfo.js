const http = require("http");
const MyPromise = require("./index.js");
const MY_NAME = "liufeng";
const URL = "http://npm.qutoutiao.net/-/verdaccio/packages";

function getMyNpmInfo() {
    return new MyPromise((resolve, reject) => {
        http.get(URL, res => {
            let {statusCode} = res;
            if (statusCode !== 200) {
                reject(`请求失败，statusCode：${statusCode}`);
                return;
            }
            res.setEncoding('utf8');
            let jsonData = '';
            res.on('data', chunk => jsonData += chunk);
            res.on('end', () => {
                try {
                    let parsedData = JSON.parse(jsonData);
                    let myNmpInfo = parsedData.filter(item => item.name.includes(MY_NAME));
                    resolve(myNmpInfo)
                } catch (e) {
                    reject(e.message);
                }
            });
        }).on('error', (e) => {
            reject(e.message);
        });
    });
}

// getMyNpmInfo().then(r => console.log(r));

module.exports = getMyNpmInfo;
const http = require("http");
const URL = "http://www.sina.com.cn/";
const fs = require('fs');
const MyPromise = require("./MyPromise.js");

function charStat(url = URL) {
    return new MyPromise(resolve => {
        http.get(url, res => {
            console.time('req');
            let ss = "abcdefghijklmnopqrstuvwxyz", arr = [], result = {}, resText = '';
            ss.replace(/[a-z]/g, s => result[s] = 0);
            while (arr.length < 123) arr.push(0);
            res.on('data', chunk => resText += chunk);
            res.on('end', () => {
                console.timeEnd('req');
                console.time('stat');
                // resText = resText.replace(/[a-z]/ig,s => result[s.toLowerCase()]++);
                for (let i = 0, l = resText.length; i < l; i++) {
                    let code = resText[i].charCodeAt();
                    if (code >= 97 && code <= 122) {
                        arr[code]++;
                    } else if (code >= 65 && code <= 90) {
                        arr[code]++;
                    }
                }
                for (let i = 97; i <= 122; i++) {
                    result[String.fromCharCode(i)] = arr[i] + arr[i - 32];
                }
                console.timeEnd('stat');
                resolve(result);
                // fs.appendFileSync('record.txt',+new Date - begin + ',');
            });
        });
    })
}

module.exports = charStat;



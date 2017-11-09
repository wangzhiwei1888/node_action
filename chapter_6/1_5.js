const fs = require('fs');
const http = require('http');

let file = fs.readFileSync('./output.dat');    //同步方法的良好实践 在应用的初始化时使用

http.createServer((req, res) => {
    fs.readFileSync('./output.dat');    //同步方法的错误使用 每一次请求中会阻塞服务器知道文件读取完
});
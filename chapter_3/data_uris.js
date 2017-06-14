const fs = require('fs');
// const opn = require('opn');

// 将图片文件转换为 data uri
let mime = 'image/png';
let encoding = 'base64';
let data = fs.readFileSync('./wechat.png').toString(encoding);
let uri = `data:${mime};${encoding},${data}`;
console.log(uri);

// let bd = 'http://www.baidu.com';
// opn(uri);

//将 data uri 转换为图片文件
let buf = Buffer.from(data, 'base64');
fs.writeFileSync('./wechat_copy.png', buf);
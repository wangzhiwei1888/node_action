const iconv = require("iconv-lite");
const fs = require("fs");

/*
GBK转UTF8
NodeJS支持在读取文本文件时，或者在Buffer转换为字符串时指定文本编码，但遗憾的是，GBK编码不在NodeJS自身支持范围内。
因此，一般我们借助iconv-lite这个三方包来转换编码。使用NPM下载该包后，我们可以按下边方式编写一个读取GBK文本文件的函数。
*/
function readGBKText(pathname) {
    let bin = fs.readFileSync(pathname);
    return iconv.decode(bin, 'gbk');
}
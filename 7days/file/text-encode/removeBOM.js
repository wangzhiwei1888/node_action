const fs = require("fs");


/*
BOM的移除
BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。
在不同的Unicode编码下，BOM字符对应的二进制字节如下：
Bytes      Encoding
----------------------------
FE FF       UTF16BE
FF FE       UTF16LE
EF BB BF    UTF8
*/
function readText(pathname) {
    let bin = fs.readFileSync(pathname);
    if(bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF){
        bin = bin.slice(3);
    }
    return bin.toString("utf-8");
}



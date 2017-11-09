const fs = require('fs');
const assert = require('assert');

let fd = fs.openSync('./1_1_file.txt', 'w+');
let writeBuf = new Buffer('some data to write');
fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0);

let readBuf = new Buffer(writeBuf.length);
fs.readSync(fd, readBuf, 0, writeBuf.length, 0);
assert.equal(writeBuf.toString(), readBuf.toString());

fs.closeSync(fd);
const fs = require('fs');

let readable = fs.createReadStream('./1_2_original.txt');
let writable = fs.createWriteStream('./1_2_copy.txt');
readable.pipe(writable);

const fs = require('fs');
fs.readFile('./name.txt', (err, buf) => {
    console.log(Buffer.isBuffer(buf));
    console.log(buf);
    console.log(buf.toString());
});

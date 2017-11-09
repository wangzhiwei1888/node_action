const fs = require('fs');

fs.readFile('./1_3_file.txt', function (err, buf) {
    console.log(buf.toString());
});
let EventEmitter = require('events').EventEmitter;
let fs = require('fs');
let content;

function readFileIfRequired(cb) {
    if (!content) {
        fs.readFile(__filename, 'utf8', (err, data) => {
            content = data;
            console.log('readFileIfReauired:readFile');
            cb(err, content);
        })
    } else {
        process.nextTick(() => {
            console.log('readFileIfRequired:cached');
            cb(null, content);
        })
    }
}

readFileIfRequired((err, data) => {
    console.log('1. Length:', data.length);
    readFileIfRequired((err, data2) => {
        console.log('2. Length:', data2.length)
    });
    console.log('Reading file again ...');
});

console.log('Reading file ...');
const c = require('./count.js');
setTimeout(function () {
    console.log('read count after 1000ms in commonjs is', c.count)
}, 1000);
let CountStream = require('./countstream.js');
let http = require('http');
let countStream = new CountStream('baidu');

http.get('http://www.baidu.com', (res) => {
   res.pipe(countStream);
});

countStream.on('total', (count) => {
    console.log('Total matches:' , count);
});
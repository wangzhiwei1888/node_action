const find = require('./find.js');

find(/.*.js/, '../', (err, results) => {
    if (err){
        return console.error(err);
    }
    console.log(results);
});

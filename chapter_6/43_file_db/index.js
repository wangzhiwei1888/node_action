const Database = require('./Database.js');

let client = new Database('./test.db');

client.on('load', () => {
    client.set('foo', 'foo value', (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("write foo success")
    });
    client.set('bar', 'bar value', (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("write bar success")
    });
    let foo = client.get('foo');
    console.log(foo);
    client.del('bar', (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("del bar success");
    })
});
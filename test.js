const fs = require("fs");

let start = +new Date;
for (let i = 0; i < 100; i++) {
    // fs.createReadStream("./node_modules/q/q.js").pipe(fs.createWriteStream("./cp11.js"));
    // fs.copyFileSync('./node_modules/q/q.js', './cp22.js');
    // fs.writeFileSync('./cp33.js',fs.readFileSync('./node_modules/q/q.js'));
}
let end = +new Date;
console.log(end - start);
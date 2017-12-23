const fs  = require("fs");

let start = +new Date;
fs.createReadStream("./node_modules/q/q.js").pipe(fs.createWriteStream("./cp.js"));
// fs.copyFileSync('./node_modules/q/q.js', './cp.js');
let end = +new Date;
console.log(end-start);
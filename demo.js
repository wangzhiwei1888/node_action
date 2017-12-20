const P = require("s-liufeng-mypromise");

console.log(P);

P.resolve(111).then(v => console.log(v));

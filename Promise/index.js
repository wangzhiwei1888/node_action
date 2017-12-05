const MyPromise = require("./MyPromise.js");

new MyPromise(resolve => {
    setTimeout(resolve,1000,666666)
}).then(v => console.log(v));
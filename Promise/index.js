const MyPromise = require("./MyPromise.js");

// MyPromise.log = true;

// new MyPromise(resolve => {
//     setTimeout(resolve,1000,666)
// })
// .then(v => {
//     console.log(v);
//     return new MyPromise(resolve => {
//         setTimeout(resolve,1000,2*v)
//     })
// })
// .then(v => {
//     console.log(v);
//     return new MyPromise(resolve => {
//         setTimeout(resolve,1000,2*v)
//     })
// })
// .then(v =>  console.log(v));


// MyPromise.resolve(666)
// .then(v => {
//     console.log(v);
//     return 2 * v;
// })
// .then(v => {
//     console.log(v);
//     return 2 * v;
// })
// .then(v =>  console.log(v));
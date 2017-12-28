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


// let p1 = new MyPromise(resolve => {
//     setTimeout(() => {
//         resolve(new MyPromise(resolve => {
//             setTimeout(resolve, 2000, 666)
//         }));
//     }, 2000)
// });
// let p2 = new MyPromise(resolve => {
//     setTimeout(resolve, 2000, 1666)
// });
// let p3 = new MyPromise(resolve => {
//     setTimeout(resolve, 3000, 2666)
// });
//
// let start = +new Date;
// MyPromise.all([p1, p2, p3, 1, 2, 4])
// .then(v => console.log(+new Date - start + 'ms later:\n', v));

MyPromise.resolve('foo').then(MyPromise.resolve('bar')).then(function (result) {
    console.log(result);
});
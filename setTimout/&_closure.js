// 场景：从1到5的五个数，每隔一秒依次打印。


// 错误示例
// for (var i = 1; i <= 5; i++) {
//     setTimeout(function (){
//         console.log(i);
//     }, i * 1000);
// }


// 方案一，利用IIFE创建闭包，将值传入闭包
// for (var i = 1; i <= 5; i++) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(i);
//         }, i * 1000);
//     })(i);
// }


// 方案二，利用setTimeout第三个参数
// for (var i = 1; i <= 5; i++) {
//     setTimeout(function timer(i) {
//         console.log(i);
//     }, i * 1000, i);
// }


// 方案三，利用bind方法
// for (var i = 1; i <= 5; i++) {
//     setTimeout(function timer(i) {
//         console.log(i);
//     }.bind(null, i), i * 1000);
// }


// 方案四，利用let拥有块级作用域
// for (let i = 1; i <= 5; i++) {
//     setTimeout(function timer() {
//         console.log(i);
//     }, i * 1000);
// }


// 方案五，利用Promise
// TODO Promise.each
// let taskList = [];
// let output = i => new Promise(resolve => setTimeout(resolve, i * 1000, i));
// for (var i = 1; i <= 5; i++) {
//     taskList.push(output(i));
// }
// taskList.forEach(p => {
//     p.then(v => console.log(v));
// });


// 方案六，利用async/await
// let sleep = time => new Promise(resolve => setTimeout(resolve, time));
// (async () => {
//     for (var i = 1; i <= 5; i++) {
//         await sleep(1000);
//         console.log(i);
//     }
// })();
// 错误
new Promise((resolve, reject) => {
    // 异步操作

}).then(r => {
        // success
    },
    e => {
        // error
        //仅处理promise运行时发生的错误。无法处理回调中的错误
        // console.log(e)
    });


// 正确
new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
    // 异步操作
}).then(r => {
        // success
    throw new Error("eee")
    })
.catch(e => {
    console.log(e);
});